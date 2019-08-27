const request = require('supertest');
const app = require('../server');

const {
  db,
  User,
  Group,
  Chore,
  AssignedChore,
  TradeChore,
} = require('../database');

let user1;
let user2;
let group;
let chore;
let assignedChore;

beforeEach(async () => {
  await db.sync({ force: true });

  group = await Group.create({
    name: 'choresTest',
    description: 'testing chore api routes',
  });

  user1 = await User.create({
    firstName: 'John',
    surName: 'Kim',
    email: 'johnkim@gmail.com',
  });
  await user1.addGroup(group);
  user2 = await User.create({
    firstName: 'Jane',
    surName: 'Smith',
    email: 'janesmith@gmail.com',
  });
  await user2.addGroup(group);

  chore = await Chore.create({
    name: 'clean kitchen',
    difficulty: 3,
    penalty: 0.5,
    timeLimit: 2,
    details: ['wash dishes', 'take out trash'],
  });
  await chore.setGroup(group);

  assignedChore = await AssignedChore.create({
    choreId: chore.id,
    userId: user1.id,
  });
  //
});
afterAll(() => {
  return db.close();
});
describe('/api/trade_chore/create_trade', () => {
  test('a user can create a trade for their assigned chore', done => {
    const tradeTerms = 'dinner';
    request(app)
      .post('/api/trade_chore/create_trade')
      .send({
        userId: user1.id,
        assignedChoreId: assignedChore.id,
        tradeTerms,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(res => {
        const tradeChore = res.body;
        expect(tradeChore.tradeTerms).toEqual(tradeTerms);
        expect(tradeChore.status).toEqual('pending');
        expect(tradeChore.originalOwnerId).toEqual(user1.id);
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  test('a user can not create a trade for an assigned chore that is already in the market', async done => {
    const tradeChore = await TradeChore.create({
      originalOwnerId: user1.id,
      assignedChoreId: assignedChore.id,
      tradeTerms: 'dinner',
    });

    request(app)
      .post('/api/trade_chore/create_trade')
      .send({
        userId: user1.id,
        assignedChoreId: assignedChore.id,
        tradeTerms: 'movie tickets',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  test('a user can not create a trade for a chore that is not assigned to them', async done => {
    const anotherUsersAC = await AssignedChore.create({
      choreId: chore.id,
      userId: user2.id,
    });

    request(app)
      .post('/api/trade_chore/create_trade')
      .send({
        userId: user1.id,
        assignedChoreId: anotherUsersAC.id,
        tradeTerms: 'movie tickets',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('/api/trade_chore/accept_trade', () => {
  test('a user can accept a trade and that chore will be assigned to them', async done => {
    const user1TradeChore = await TradeChore.create({
      originalOwnerId: user1.id,
      assignedChoreId: assignedChore.id,
      tradeTerms: 'dinner',
    });

    await request(app)
      .put('/api/trade_chore/accept_trade')
      .send({
        userId: user2.id,
        tradeChoreId: user1TradeChore.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        const { tradeChore, assignedChore } = res.body;
        expect(tradeChore.originalOwnerId).toEqual(user1.id);
        expect(tradeChore.status).toEqual('accepted');
        expect(tradeChore.newOwnerId).toEqual(user2.id);
        expect(assignedChore.userId).toEqual(user2.id);
      })
      .then(() => done());
  });

  test('a user can accept a trade then re-trade that same assigned chore', async done => {
    const tradeChore = await TradeChore.create({
      originalOwnerId: user1.id,
      assignedChoreId: assignedChore.id,
      tradeTerms: 'dinner',
    });

    await request(app)
      .put('/api/trade_chore/accept_trade')
      .send({
        userId: user2.id,
        tradeChoreId: tradeChore.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    await request(app)
      .post('/api/trade_chore/create_trade')
      .send({
        userId: user2.id,
        assignedChoreId: assignedChore.id,
        tradeTerms: 'massage',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(() => done());
  });
});

describe('/api/trade_chore/cancel_trade', () => {
  test('a user can cancel their own trade', async done => {
    let tradeChoreId;
    const tradeTerms = 'dinner';

    await request(app)
      .post('/api/trade_chore/create_trade')
      .send({
        userId: user1.id,
        assignedChoreId: assignedChore.id,
        tradeTerms,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        tradeChoreId = res.body.id;
      });

    await request(app)
      .delete('/api/trade_chore/cancel_trade')
      .send({ userId: user1.id, tradeChoreId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(() => done());
  });

  test('a user can not cancel a trade that has already been accepted by another user', async done => {
    let tradeChoreId;
    const tradeTerms = 'dinner';

    await request(app)
      .post('/api/trade_chore/create_trade')
      .send({
        userId: user1.id,
        assignedChoreId: assignedChore.id,
        tradeTerms,
      })
      .set('Accept', 'application/json')
      .expect(201)
      .then(res => {
        tradeChoreId = res.body.id;
      });

    await request(app)
      .put('/api/trade_chore/accept_trade')
      .send({ userId: user2.id, tradeChoreId })
      .set('Accept', 'application/json')
      .expect(200);

    await request(app)
      .delete('/api/trade_chore/cancel_trade')
      .send({ userId: user1.id, tradeChoreId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(() => done());
  });
});
