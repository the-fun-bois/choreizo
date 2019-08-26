const express = require('express');
const router = express.Router();
const {
  AssignedChore,
  SwapChore,
  TransferChore,
  TradeChore,
} = require('./../database/index');

const checkIfChoreIsAlreadyInMarketPlace = assignedChore => {
  const {
    swapAssignedChore1,
    swapAssignedChore2,
    tradeChore,
    transferChore,
  } = assignedChore;

  if (swapAssignedChore1 || swapAssignedChore2 || tradeChore || transferChore) {
    return true;
  }
  return false;
};

const createSwap = (
  user1Id,
  user2Id,
  assignedChore1Id,
  assignedChore2Id,
  res,
  next
) => {
  // check that both assigned chores exist
  return Promise.all([
    AssignedChore.findOne({
      where: {
        userId: user1Id,
        id: assignedChore1Id,
      },
      include: [
        { model: SwapChore, as: 'swapAssignedChore1' },
        { model: SwapChore, as: 'swapAssignedChore2' },
        TradeChore,
        TransferChore,
      ],
    }),
    AssignedChore.findOne({
      where: {
        userId: user2Id,
        id: assignedChore2Id,
      },
      include: [
        { model: SwapChore, as: 'swapAssignedChore1' },
        { model: SwapChore, as: 'swapAssignedChore2' },
        TradeChore,
        TransferChore,
      ],
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
        return res
          .status(400)
          .send({ error: 'An assigned chore is already in the market' });
      }
      SwapChore.create({
        user1Id,
        user2Id,
        swapAssignedChore1Id: assignedChore1Id,
        swapAssignedChore2Id: assignedChore2Id,
        status: 'pending',
      }).then(swapChore => {
        res.status(200).send(swapChore);
      });
    })
    .catch(next);
};

router.post('/create_swap', (req, res, next) => {
  const { user1Id, user2Id, assignedChore1Id, assignedChore2Id } = req.body;
  createSwap(user1Id, user2Id, assignedChore1Id, assignedChore2Id, res, next);
});

module.exports = router;
