import serverApi from './../../api/serverApi';
export const GOT_SWAPPABLE_CHORES = 'GOT_SWAPPABLE_CHORES';

export const gotSwappableChores = swappableChores => ({
  type: GOT_SWAPPABLE_CHORES,
  swappableChores,
});

export const getSwappableChoresThunk = groupId => {
  //'/chores/swappable_chores
  return dispatch => {
    if (!groupId) {
      dispatch(gotSwappableChores([]));
    } else {
      return serverApi
        .post('/chores/swappable_chores', { groupId })
        .then(response => {
          const swappableChores = response.data;
          dispatch(gotSwappableChores(swappableChores));
        });
    }
  };
};
