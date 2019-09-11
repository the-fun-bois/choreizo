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
    penalty: 20,
    timeLimit: 2,
    details: ['wash dishes', 'take out trash'],
  });
  await chore1.setGroup(group);

  chore2 = await Chore.create({
    name: 'take out trash',
    difficulty: 1,
    penalty: 10,
    timeLimit: 1,
    details: ['take out trash and recycle', 'replace bags'],
  });
  await chore2.setGroup(group);

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

describe('/api/swap_chore/accept_swap', () => {
  test('a user can accept a swap and the assigned chores will be swapped', async done => {
    // user 1 creates a swap
    let swapChoreId;
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
      .then(res => {
        swapChoreId = res.body.id;
      });
    // user 2 accepts the swap
    await request(app)
      .put('/api/swap_chore/accept_swap')
      .send({ userId: user2.id, swapChoreId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        const { assignedChore1, assignedChore2, swapChore } = res.body;
        // check that the assigned chores got swapped
        expect(assignedChore1.userId).toEqual(user2.id);
        expect(assignedChore2.userId).toEqual(user1.id);
        // check that everything is correct in the swapChore entry
        expect(swapChore).toEqual(
          expect.objectContaining({
            user1Id: user1.id,
            user2Id: user2.id,
            swapAssignedChore1Id: assignedChore1.id,
            swapAssignedChore2Id: assignedChore2.id,
            status: 'accepted',
          }),
        );
        done();
      });
  });

  test('a user can accept a swap then re-swap that assigned chore', async done => {
    // initialize user 3 and his assigned chore
    const user3 = await User.create({
      firstName: 'Randy',
      surName: 'Johnson',
      email: 'randyj@gmail.com',
    });
    await user3.addGroup(group);
    const chore3 = await Chore.create({
      name: 'clean bathroom',
      difficulty: 3,
      penalty: 20,
      timeLimit: 2,
      details: ['scrub toilet', 'wipe down sink'],
    });
    await chore3.setGroup(group);
    const assignedChore3 = await AssignedChore.create({
      choreId: chore3.id,
      userId: user3.id,
    });
    // create and accept a swap between user 1 and user 2
    let swapChore1Id;
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
      .then(res => {
        swapChore1Id = res.body.id;
      });
    // user 2 accepts the swap
    await request(app)
      .put('/api/swap_chore/accept_swap')
      .send({ userId: user2.id, swapChoreId: swapChore1Id })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    // create and accept a swap between user 2 and user 3
    await request(app)
      .post('/api/swap_chore/create_swap')
      .send({
        user1Id: user2.id,
        user2Id: user3.id,
        assignedChore1Id: assignedChore1.id,
        assignedChore2Id: assignedChore3.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    done();
  });
});

describe('/api/swap_chore/cancel_swap', () => {
  test('a user can cancel their own swap', async done => {
    // create a swap
    let swapChoreId;
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
      .then(res => {
        swapChoreId = res.body.id;
      });
    // cancel the swap
    await request(app)
      .delete('/api/swap_chore/cancel_swap')
      .send({ userId: user1.id, swapChoreId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    done();
  });

  test('a user can not cancel a swap that has already been accepted by another user', async done => {
    // create a swap
    let swapChoreId;
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
      .then(res => {
        swapChoreId = res.body.id;
      });

    // accept the swap
    await request(app)
      .put('/api/swap_chore/accept_swap')
      .send({ userId: user2.id, swapChoreId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    // cancel the swap
    await request(app)
      .delete('/api/swap_chore/cancel_swap')
      .send({ userId: user1.id, swapChoreId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });
});
