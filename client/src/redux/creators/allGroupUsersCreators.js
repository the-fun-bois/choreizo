import serverApi from './../../api/serverApi';
export const GOT_ALL_GROUP_USERS = 'GOT_ALL_GROUP_USERS';

export const gotAllGroupUsers = groupMembers => ({
  type: GOT_ALL_GROUP_USERS,
  groupMembers,
});

export const getAllGroupUsers = groupId => {
  return dispatch => {
    if (!groupId) {
      dispatch(gotAllGroupUsers([]));
    } else {
      return serverApi
        .post('/user/group_members', { groupId })
        .then(response => {
          let groupMembers = response.data;
          groupMembers = groupMembers.map(member => {
            const {
              id,
              firstName,
              surName,
              email,
              groups: {
                '0': {
                  userGroup: { userIsAdmin, userStatus, groupId },
                },
              },
            } = member;
            return {
              id,
              firstName,
              surName,
              email,
              userIsAdmin,
              userStatus,
              groupId,
            };
          });
          dispatch(gotAllGroupUsers(groupMembers));
        })
        .catch(e => console.error('error getting group members', e));
    }
  };
};
