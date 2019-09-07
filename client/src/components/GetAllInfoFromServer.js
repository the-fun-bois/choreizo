import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getUserChoresThunk,
  getUserInfo,
  getMarketChoresThunk,
  getAllGroupUsers,
} from './../redux/creators';

const GetAllInfoFromServer = ({
  userInfo,
  getUserInfo,
  getMarketChores,
  getUserChores,
  getGroupUsers,
}) => {
  // to do:
  // get all users in the group
  // get all the other chores in the group for swaps
  // admin stuff

  // get user info on load
  useEffect(() => {
    console.log('getting user info');
    if (!userInfo.id) {
      getUserInfo();
    }
  }, []);
  // get user chores and market chores when group id changes
  useEffect(() => {
    const groupId = userInfo.groups[0].id;
    if (groupId) {
      console.log('getting your chores and market chores');
      getUserChores();
      getMarketChores();
      getGroupUsers();
    }
  }, [userInfo.groups[0].id]);

  // this component does not display anything
  return null;
};
const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatch = dispatch => ({
  getUserChores: () => dispatch(getUserChoresThunk()),
  getUserInfo: () => dispatch(getUserInfo()),
  getMarketChores: () => dispatch(getMarketChoresThunk()),
  getGroupUsers: () => dispatch(getAllGroupUsers()),
});

export default connect(
  mapState,
  mapDispatch,
)(GetAllInfoFromServer);
