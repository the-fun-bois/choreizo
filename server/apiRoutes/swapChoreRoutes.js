const express = require('express');
const router = express.Router();
const {
  AssignedChore,
  SwapChore,
  TransferChore,
  TradeChore,
} = require('./../database/index');

const createSwap = (
  user1Id,
  user2Id,
  assignedChore1Id,
  assignedChore2Id,
  res,
  next
) => {
  // check that user and assignedchore id are
  return AssignedChore.findOne({
    where: {
      userId,
      id: assignedChoreId,
    },
    include: [TransferChore, TradeChore, SwapChore],
  }).then(assignedChore => {
    if (!assignedChore) {
      return res.status(400).send({ error: 'No such assigned chore exists' });
    }

    const { swapChore, tradeChore, transferChore } = assignedChore;
    if (swapChore || tradeChore || transferChore) {
      return res.status(400).send({
        error:
          'Error creating trade. This chore is already in the marketplace.',
      });
    }
    SwapChore.create({
      assignedChoreId: assignedChore.id,
      tradeTerms,
      originalOwnerId: userId,
      status: 'pending',
    })
      .then(tradeChore => {
        res.status(201).send(tradeChore);
      })
      .catch(next);
  });
};

router.post('/create_swap', (req, res, next) => {
  res.send('swap chore');
});

module.exports = router;
