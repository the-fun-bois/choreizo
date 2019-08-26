const express = require('express');
const router = express.Router();
const {
  AssignedChore,
  SwapChore,
  TransferChore,
  TradeChore,
} = require('./../database/index');

const createTrade = (userId, assignedChoreId, tradeTerms, res, next) => {
  return AssignedChore.findOne({
    where: {
      userId,
      id: assignedChoreId,
    },
    include: [
      TransferChore,
      TradeChore,
      { model: SwapChore, as: 'swapAssignedChore1' },
      { model: SwapChore, as: 'swapAssignedChore2' },
    ],
  }).then(assignedChore => {
    if (!assignedChore) {
      return res.status(400).send({ error: 'No such assigned chore exists' });
    }

    const {
      swapAssignedChore1,
      swapAssignedChore2,
      tradeChore,
      transferChore,
    } = assignedChore;
    if (
      swapAssignedChore1 ||
      swapAssignedChore2 ||
      tradeChore ||
      transferChore
    ) {
      return res.status(400).send({
        error:
          'Error creating trade. This chore is already in the marketplace.',
      });
    }
    TradeChore.create({
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

const acceptTrade = (userId, tradeChoreId, res, next) => {
  return TradeChore.findByPk(tradeChoreId, { include: [AssignedChore] })
    .then(tradeChore => {
      if (!tradeChore) {
        return res.status(400).send({ error: 'Could not find selected trade' });
      }
      if (tradeChore.status === 'accepted') {
        return res
          .status(400)
          .send({ error: 'Trade has already been accepted by another user' });
      }
      const { assignedChore } = tradeChore;
      Promise.all([
        tradeChore.update({ newOwnerId: userId, status: 'accepted' }),
        assignedChore.update({ userId }),
      ]).then(([tradeChore, assignedChore]) => {
        res.status(200).send({ tradeChore, assignedChore });
      });
    })
    .catch(next);
};

const cancelTrade = (userId, tradeChoreId, res, next) => {
  TradeChore.findOne({ where: { originalOwnerId: userId, id: tradeChoreId } })
    .then(tradeChore => {
      if (!tradeChore) {
        return res.status(400).json({ error: 'Could not find selected trade' });
      }
      if (tradeChore.status === 'accepted') {
        return res.status(400).send({
          error:
            'Error canceling trade. Trade has already been accepted by another user',
        });
      }
      tradeChore.destroy().then(destroyedTrade => {
        res
          .status(200)
          .json({ message: 'chore canceled successfully', destroyedTrade });
      });
    })
    .catch(next);
};

/*
 * @ROUTE: POST to /api/tradeChore/create_trade
 * @DESC: create a new trade
 * @ACCESS: private
 */
router.post('/create_trade', (req, res, next) => {
  const { userId, assignedChoreId, tradeTerms } = req.body;
  createTrade(userId, assignedChoreId, tradeTerms, res, next);
});

/*
 * @ROUTE: PUT to /api/tradeChore/accept_trade
 * @DESC: accept a trade
 * @ACCESS: private
 */
router.put('/accept_trade', (req, res, next) => {
  const { userId, tradeChoreId } = req.body;
  acceptTrade(userId, tradeChoreId, res, next);
});

/*
 * @ROUTE: DELETE to /api/tradeChore/cancel_trade
 * @DESC: cancel a trade and remove from db
 * @ACCESS: private
 */
router.delete('/cancel_trade', (req, res, next) => {
  const { userId, tradeChoreId } = req.body;
  cancelTrade(userId, tradeChoreId, res, next);
});
module.exports = router;
