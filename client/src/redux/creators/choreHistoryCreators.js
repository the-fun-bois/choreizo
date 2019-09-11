import serverApi from './../../api/serverApi';

export const GOT_CHORE_HISTORY = 'GOT_CHORE_HISTORY';

export const gotChoreHistory = choreHistory => ({
  type: GOT_CHORE_HISTORY,
  choreHistory,
});

export const getChoreHistoryThunk = () => {
  return dispatch => {
    serverApi
      .post('/chores/chore_history', { userId: 1 })
      .then(response => {
        const choreHistory = response.data;
        dispatch(gotChoreHistory(choreHistory));
      })
      .catch(e => console.error('error getting chore history', e));
  };
};
