const { SwapChore, TradeChore, TransferChore } = require('./../../database');

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

choreIncludeParams = [
  { model: TransferChore, where: { status: 'pending' }, required: false },
  { model: TradeChore, where: { status: 'pending' }, required: false },
  {
    model: SwapChore,
    as: 'swapAssignedChore1',
    where: { status: 'pending' },
    required: false,
  },
  {
    model: SwapChore,
    as: 'swapAssignedChore2',
    where: { status: 'pending' },
    required: false,
  },
];

module.exports = { checkIfChoreIsAlreadyInMarketPlace, choreIncludeParams };
