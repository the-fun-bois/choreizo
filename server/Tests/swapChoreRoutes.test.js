const request = require('supertest');
const app = require('../server');

const {
  db,
  User,
  Group,
  Chore,
  AssignedChore,
  SwapChore,
} = require('../database');

let user1;
let user2;
let group;
let chore1;
let chore2;
let assignedChore1;
let assignedChore2;

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

  chore1 = await Chore.create({
    name: 'clean kitchen',
    difficulty: 3,
    penalty: 0.5,
    timeLimit: 2,
    details: ['wash dishes', 'take out trash'],
  });
  await chore1.setGroup(group);

  chore2 = await Chore.create({
    name: 'take out trash',
    difficulty: 1,
    penalty: 0.3,
    timeLimit: 1,
    details: ['take out trash and recycle', 'replace bags'],
  });

  assignedChore1 = await AssignedChore.create({
    choreId: chore1.id,
    userId: user1.id,
  });
  assignedChore2 = await AssignedChore.create({
    choreId: chore2.id,
    userId: user2.id,
  });
  //
});
afterAll(() => db.close());

describe('/api/swap_chore/create_swap', () => {
  test('a user can create a swap with another users assigned chore', async done => {
    await request(app)
      .post('/api/swap_chore/create_swap')
      .send({
        user1Id: user1.id,
        user2Id: user2.id,
        assignedChore1Id: assignedChore1.id,
        assignedChore2Id: assignedChore2.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(res => {
        const swapChore = res.body;
        expect(swapChore).toEqual(
          expect.objectContaining({
            user1Id: user1.id,
            user2Id: user2.id,
            swapAssignedChore1Id: assignedChore1.id,
            swapAssignedChore2Id: assignedChore2.id,
            status: 'pending',
          }),
        );
      })
      .then(() => {
        done();
      });
  });

  test('a user can not create a swap if either chore is already in the market', async done => {
    let tradeChore1Id;
    // create a trade for assigned chore 1
    await request(app)
      .post('/api/trade_chore/create_trade')
      .send({
        userId: user1.id,
        assignedChoreId: assignedChore1.id,
        tradeTerms: 'dinner',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        tradeChore1Id = res.body.id;
      });

    // try to swap assigned  chore 1
    await request(app)
      .post('/api/swap_chore/create_swap')
      .send({
        user1Id: user1.id,
        user2Id: user2.id,
        assignedChore1Id: assignedChore1.id,
        assignedChore2Id: assignedChore2.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(res => {
        expect(res.body).toEqual({
          error: 'An assigned chore is already in the market',
        });
      });
    // cancel the trade
    await request(app)
      .delete('/api/trade_chore/cancel_trade')
      .send({
        userId: user1.id,
        tradeChoreId: tradeChore1Id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    // create a trade for assigned chore 2
    await request(app)
      .post('/api/trade_chore/create_trade')
      .send({
        userId: user2.id,
        assignedChoreId: assignedChore2.id,
        tradeTerms: 'dinner',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    // try to swap assigned  chore 2
    await request(app)
      .post('/api/swap_chore/create_swap')
      .send({
        user1Id: user1.id,
        user2Id: user2.id,
        assignedChore1Id: assignedChore1.id,
        assignedChore2Id: assignedChore2.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(res => {
        expect(res.body).toEqual({
          error: 'An assigned chore is already in the market',
        });
      })
      .then(() => {
        done();
      });
  });

  test('a user can not create a swap for a chore that is not assigned to them', async done => {
    await request(app)
      .post('/api/swap_chore/create_swap')
      .send({
        user1Id: user1.id,
        user2Id: user2.id,
        assignedChore1Id: assignedChore2.id, // belongs to user2
        assignedChore2Id: assignedChore2.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(res => {
        expect(res.body).toEqual({ error: 'Assigned chore not found' });
      })
      .then(() => {
        done();
      });
  });
});

xdescribe('/api/swap_chore/accept_swap', () => {
  test('a user can accept a swap and the assigned chores will be swapped', async done => {});

  test('a user can accept a swap then re-swap that same assigned chore', async done => {});
});

xdescribe('/api/swap_chore/cancel_swap', () => {
  test('a user can cancel their own swap', async done => {});

  test('a user can not cancel a swap that has already been accepted by another user', async done => {});
});
