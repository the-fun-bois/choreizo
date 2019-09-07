export const refreshAllChores = async () => {
  const chores = await serverApi.post('/chores/market_chores', {
    userId,
    groupId,
  });

  chores.forEach(chore => {
    if (chore.transferChore !== null) {
      state.transferChores.push(chore);
    }
    if (chore.tradeChore !== null) {
      state.tradeChores.push(chore);
    }
    if (chore.swapAssignedChore1 !== null) {
      //this is our chore
      state.mySwapChores.push(chore);
    }
    if (chore.swapAssignedChore2 !== null) {
      state.othersSwapChores.push(chore);
    }
  });
};
