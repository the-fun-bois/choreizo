import serverApi from '../../api/serverApi';

export const GOT_USER_CHORES = 'GOT_USER_CHORES';

export const gotUserChores = userChores => ({
  type: GOT_USER_CHORES,
  userChores,
});

export const getUserChoresThunk = () => {
  return dispatch => {
    return serverApi
      .post('/chores/all_personal_chores')
      .then(allChores => {
        // grab chores from 1st group b/c we are limiting user to 1 group at the moment
        return dispatch(gotUserChores(allChores[0]));
      })
      .catch(e => {
        console.log('error getching users chores', e);
      });
  };
};
