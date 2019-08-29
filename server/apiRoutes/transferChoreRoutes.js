const express = require('express');

const router = express.Router();
const {
  AssignedChore,
  SwapChore,
  TransferChore,
  TradeChore,
  EthereumWallet,
} = require('./../database/index');

const {
  checkIfChoreIsAlreadyInMarketPlace,
  choreIncludeParams,
} = require('./utils/choreUtils');

const createTransfer = async (userId, assignedChoreId, price, res, next) => AssignedChore.findOne({
  where: {
    userId,
    id: assignedChoreId,
  },
  include: choreIncludeParams,
}).then(async (assignedChore) => {
  if (!assignedChore) {
    return res.status(400).send({ error: 'No such assigned chore exists' });
  }

  const acIsInMp = checkIfChoreIsAlreadyInMarketPlace(assignedChore);
  if (acIsInMp) {
    return res.status(400).send({
      error:
          'Error creating trade. This chore is already in the marketplace.',
    });
  }

  const userEthWallet = await EthereumWallet.findOne({ where: { userId } });
  const userTransfers = await TransferChore.findAll({
    where: { originalOwnerId: userId, status: 'pending' },
  });

  // sum up the cost of all of the user's pending transfers
  const pendingTransferTotalCost = userTransfers.reduce(
    (totalSum, currTransfer) => totalSum + parseFloat(currTransfer.price),
    0,
  );

  // check if user has enough eth to create the transfer request
  if (
    parseFloat(price) + pendingTransferTotalCost
      > parseFloat(userEthWallet.balance)
  ) {
    return res.status(400).send({ error: 'Not enough eth in wallet' });
  }

  TransferChore.create({
    assignedChoreId: assignedChore.id,
    price,
    originalOwnerId: userId,
    status: 'pending',
  })
    .then((transferChore) => {
      res.status(201).send(transferChore);
    })
    .catch(next);
});

const acceptTransfer = (userId, transferChoreId, res, next) => TransferChore.findByPk(transferChoreId, { include: [AssignedChore] })
  .then(async (transferChore) => {
    if (!transferChore) {
      return res
        .status(400)
        .send({ error: 'Could not find selected transfer' });
    }
    if (transferChore.status === 'accepted') {
      return res.status(400).send({
        error: 'Transfer has already been accepted by another user',
      });
    }

    // all checks pass, initiate transfer
    const { price, originalOwnerId, assignedChore } = transferChore;
    const numericPrice = parseFloat(price);
    const newOwnerId = userId;

    const [originalOwnerWallet, newOwnerWallet] = await Promise.all([
      EthereumWallet.findOne({
        where: { userId: originalOwnerId },
      }),
      EthereumWallet.findOne({
        where: { userId: newOwnerId },
      }),
    ]);
    const originalOwnerBalance = parseFloat(originalOwnerWallet.balance);
    const newOwnerBalance = parseFloat(newOwnerWallet.balance);

    Promise.all([
      transferChore.update({ newOwnerId: userId, status: 'accepted' }),
      assignedChore.update({ userId }),
      originalOwnerWallet.update({
        balance: originalOwnerBalance - numericPrice,
      }),
      newOwnerWallet.update({ balance: newOwnerBalance + numericPrice }),
    ]).then(([tradeChore, assignedChore, ...wallets]) => {
      res.status(200).send({ tradeChore, assignedChore, wallets });
    });
  })
  .catch(next);

const cancelTransfer = (userId, transferChoreId, res, next) => {
  TransferChore.findOne({
    where: { originalOwnerId: userId, id: transferChoreId },
  })
    .then((transferChore) => {
      if (!transferChore) {
        return res.status(400).json({ error: 'Could not find selected trade' });
      }
      if (transferChore.status === 'accepted') {
        return res.status(400).send({
          error:
            'Error canceling trade. Trade has already been accepted by another user',
        });
      }
      transferChore.destroy().then((destroyedTransfer) => {
        res.status(200).json({ message: 'chore canceled successfully' });
      });
    })
    .catch(next);
};

/*
 * @ROUTE: POST to /api/transfer_chore/create_transfer
 * @DESC: create a new transfer
 * @ACCESS: private
 */
router.post('/create_transfer', (req, res, next) => {
  const { userId, assignedChoreId, price } = req.body;
  createTransfer(userId, assignedChoreId, price, res, next);
});

/*
 * @ROUTE: PUT to /api/transfer_chore/accept_transfer
 * @DESC: accept a transfer
 * @ACCESS: private
 */
router.put('/accept_transfer', (req, res, next) => {
  const { userId, transferChoreId } = req.body;
  acceptTransfer(userId, transferChoreId, res, next);
});

/*
 * @ROUTE: DELETE to /api/transfer_chore/cancel_transfer
 * @DESC: cancel a transfer and remove from db
 * @ACCESS: private
 */
router.delete('/cancel_transfer', (req, res, next) => {
  const { userId, transferChoreId } = req.body;
  cancelTransfer(userId, transferChoreId, res, next);
});

module.exports = router;
