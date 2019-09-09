const express = require('express');

const router = express.Router();
const {
  AssignedChore,
  SwapChore,
  TransferChore,
  TradeChore,
} = require('./../database/index');

const {
  checkIfChoreIsAlreadyInMarketPlace,
  choreIncludeParams,
} = require('./utils/choreUtils');

const createSwap = (
  user1Id,
  user2Id,
  assignedChore1Id,
  assignedChore2Id,
  res,
  next,
) =>
  Promise.all([
    // check that both assigned chores exist
    AssignedChore.findOne({
      where: {
        userId: user1Id,
        id: assignedChore1Id,
      },
      include: choreIncludeParams,
    }),
    AssignedChore.findOne({
      where: {
        userId: user2Id,
        id: assignedChore2Id,
      },
      include: choreIncludeParams,
    }),
  ])
    .then(([aC1, aC2]) => {
      if (!aC1 || !aC2) {
        return res.status(400).send({ error: 'Assigned chore not found' });
      }
      // check joins
      const ac1IsInMp = checkIfChoreIsAlreadyInMarketPlace(aC1);
      const ac2IsInMp = checkIfChoreIsAlreadyInMarketPlace(aC2);
      if (ac1IsInMp || ac2IsInMp) {
        return res.status(400).send({
          error: 'An assigned chore is already in the market',
        });
      }
      SwapChore.create({
        user1Id,
        user2Id,
        swapAssignedChore1Id: assignedChore1Id,
        swapAssignedChore2Id: assignedChore2Id,
        status: 'pending',
      }).then(swapChore => {
        res.status(201).send(swapChore);
      });
    })
    .catch(next);
const acceptSwap = (userId, swapChoreId, res, next) =>
  // check whether the swap exists and wheter it was been accepted
  SwapChore.findOne({
    where: { user2Id: userId, id: swapChoreId },
    include: [
      { model: AssignedChore, as: 'swapAssignedChore1' },
      { model: AssignedChore, as: 'swapAssignedChore2' },
    ],
  })
    .then(swapChore => {
      if (!swapChore) {
        return res.status(400).send({ error: 'Could not find selected swap' });
      }
      if (swapChore.status === 'accepted') {
        return res
          .status(400)
          .send({ error: 'Trade has already been accepted.' });
      }
      // swap assigned chores and change swapChore status to 'accepted;
      const {
        swapAssignedChore1,
        swapAssignedChore2,
        user1Id,
        user2Id,
      } = swapChore;
      Promise.all([
        swapAssignedChore1.update({ userId: user2Id }),
        swapAssignedChore2.update({ userId: user1Id }),
        swapChore.update({ status: 'accepted' }),
      ]).then(([assignedChore1, assignedChore2, swapChore]) => {
        res.status(200).send({ assignedChore1, assignedChore2, swapChore });
      });
    })
    .catch(next);
const cancelSwap = (userId, swapChoreId, res, next) =>
  SwapChore.findOne({
    where: {
      user1Id: userId,
      id: swapChoreId,
    },
  })
    .then(swapChore => {
      if (!swapChore) {
        return res.status(400).send({ error: 'Could not find selected swap' });
      }
      if (swapChore.status === 'accepted') {
        return res.status(400).send({
          error:
            'Error canceling swap. Swap has already been accepted by another user',
        });
      }
      swapChore
        .destroy()
        .then(() =>
          res.status(200).send({ message: 'Swap cancelled successfully' }),
        );
    })
    .catch(next);

const declineSwap = (userId, swapChoreId, res, next) =>
  SwapChore.findOne({
    where: {
      user2Id: userId,
      id: swapChoreId,
    },
  })
    .then(swapChore => {
      if (!swapChore) {
        return res.status(400).send({ error: 'Could not find selected swap' });
      }
      if (swapChore.status === 'accepted') {
        return res.status(400).send({
          error: 'Error canceling swap. Swap has already been accepted',
        });
      }
      swapChore
        .update({ status: 'declined' })
        .then(() =>
          res.status(200).send({ message: 'Swap declined successfully' }),
        );
    })
    .catch(next);

/*
 * @ROUTE: POST to /api/swap_chore/create_swap
 * @DESC: create a swap
 * @ACCESS: private
 */

router.post('/create_swap', (req, res, next) => {
  const { user1Id, user2Id, assignedChore1Id, assignedChore2Id } = req.body;
  createSwap(user1Id, user2Id, assignedChore1Id, assignedChore2Id, res, next);
});
/*
 * @ROUTE: PUT to /api/swap_chore/accept_swap
 * @DESC: accept a swap
 * @ACCESS: private
 */
router.put('/accept_swap', (req, res, next) => {
  const { userId, swapChoreId } = req.body;
  acceptSwap(userId, swapChoreId, res, next);
});

/*
 * @ROUTE: DELETE to /api/swap_chore/cancel_swap
 * @DESC: remove a swap from db
 * @ACCESS: private
 */

router.delete('/cancel_swap', (req, res, next) => {
  const { userId, swapChoreId } = req.body;
  cancelSwap(userId, swapChoreId, res, next);
});

/*
 * @ROUTE: PUT to /api/swap_chore/decline_swap
 * @DESC: decline a swap offer
 * @ACCESS: private
 */

router.put('/decline_swap', (req, res, next) => {
  const { userId, swapChoreId } = req.body;
  declineSwap(userId, swapChoreId, res, next);
});

module.exports = router;
