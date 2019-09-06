import serverApi from './../../api/serverApi';

export const GOT_MARKET_CHORES = 'GOT_MARKET_CHORES';

export const gotMarketChores = marketChores => ({
  type: GOT_MARKET_CHORES,
  marketChores,
});

export const getMarketChoresThunk = () => {
  return (dispatch, getState) => {
    const groupId = getState.userInfo.groups[0].id;
    if (!groupId) {
      return;
    }
    return serverApi
      .post('/chores/market_chores', { groupId })
      .then(marketChores => {
        return dispatch(gotMarketChores(marketChores));
      })
      .catch(e => {
        console.log('error fetching market chores', e);
      });
  };
};
