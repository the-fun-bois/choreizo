const {
  SwapChore,
  TradeChore,
  TransferChore,
  User,
  Chore,
  AssignedChore,
} = require('./../../database');

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

const choreIncludeParams = [
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

const createChoreIncludeParamsForMarket = userId => {
  const choreIncludeParamsForMarket = [
    {
      model: TransferChore,
      where: { status: 'pending' },
      required: false,
      include: [{ model: User, as: 'originalOwner' }],
    },
    {
      model: TradeChore,
      where: { status: 'pending' },
      required: false,
      include: [{ model: User, as: 'originalOwner' }],
    },
    {
      model: SwapChore,
      as: 'swapAssignedChore1',
      where: { status: 'pending', user1Id: userId },
      required: false,
      include: [
        { model: User, as: 'user2' },
        { model: AssignedChore, as: 'swapAssignedChore1', include: [Chore] },
        { model: AssignedChore, as: 'swapAssignedChore2', include: [Chore] },
      ],
    },
    {
      model: SwapChore,
      as: 'swapAssignedChore2',
      where: { status: 'pending', user2Id: userId },
      required: false,
      include: [
        { model: User, as: 'user1' },
        { model: AssignedChore, as: 'swapAssignedChore1', include: [Chore] },
        { model: AssignedChore, as: 'swapAssignedChore2', include: [Chore] },
      ],
    },
  ];
  return choreIncludeParamsForMarket;
};

const choreIncludeParamsAccepted = [
  { model: TransferChore, where: { status: 'accepted' }, required: false },
  { model: TradeChore, where: { status: 'accepted' }, required: false },
  {
    model: SwapChore,
    as: 'swapAssignedChore1',
    where: { status: 'accepted' },
    required: false,
  },
  {
    model: SwapChore,
    as: 'swapAssignedChore2',
    where: { status: 'accepted' },
    required: false,
  },
];

module.exports = {
  checkIfChoreIsAlreadyInMarketPlace,
  choreIncludeParams,
  choreIncludeParamsAccepted,
  createChoreIncludeParamsForMarket,
};
