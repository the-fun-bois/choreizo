import serverApi from '../../api/serverApi';

export const GOT_USER_CHORES = 'GOT_USER_CHORES';
export const COMPLETED_USER_CHORE = 'COMPLETED_USER_CHORE';

export const gotUserChores = userChores => ({
  type: GOT_USER_CHORES,
  userChores,
});

export const completedUserChore = choreId => ({
  type: COMPLETED_USER_CHORE,
  choreId,
});

export const submitChore = (assignedChoreId, groupId) => {
  console.log(assignedChoreId, groupId);
  return dispatch => {
    serverApi
      .post('/chores/submit_chore', {
        assignedChoreId,
      })
      .then(resp => {
        dispatch(completedUserChore(assignedChoreId));
        dispatch(getUserChoresThunk(groupId));
      })
      .catch(err => {
        err ? Alert.alert('Chore already complete') : '';
      });
  };
};

export const getUserChoresThunk = groupId => {
  return (dispatch, getState) => {
    if (!groupId) {
      dispatch(gotUserChores([]));
    } else {
      const userInfo = getState().userInfo;
      if (!userInfo.id) {
        return;
      }
      const userId = userInfo.id;
      return serverApi
        .post('/chores/all_personal_chores', { userId })
        .then(response => {
          const allChores = response.data;
          const groups = Object.keys(allChores);
          const userChores = allChores[groups[0]];
          // grab chores from 1st group b/c we are limiting user to 1 group at the moment

          dispatch(gotUserChores(userChores));
        })
        .catch(e => {
          console.log('error fetching users chores', e);
        });
    }
  };
};
