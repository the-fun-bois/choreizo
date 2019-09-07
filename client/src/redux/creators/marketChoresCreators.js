import serverApi from './../../api/serverApi';

export const GOT_MARKET_CHORES = 'GOT_MARKET_CHORES';

export const gotMarketChores = marketChores => ({
  type: GOT_MARKET_CHORES,
  marketChores,
});

export const getMarketChoresThunk = () => {
  return (dispatch, getState) => {
    if (!getState().userInfo.groups[0]) {
      return;
    }
    const groupId = getState().userInfo.groups[0].id;
    const userId = getState().userInfo.id;
    if (!groupId) {
      dispatch(gotMarketChores([]));
    } else {
      return serverApi
        .post('/chores/market_chores', { groupId })
        .then(response => {
          const marketChores = response.data;
          dispatch(gotMarketChores(marketChores));
        })
        .catch(e => {
          console.log('error fetching market chores', e);
        });
    }

    return serverApi
      .post('/chores/market_chores', { userId, groupId })
      .then(response => {
        const marketChores = response.data;
        dispatch(gotMarketChores(marketChores));
      })
      .catch(e => {
        console.log('error fetching market chores', e);
      });
  };
};
