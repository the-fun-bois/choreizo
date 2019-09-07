import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getUserChoresThunk,
  getUserInfo,
  getMarketChoresThunk,
  getAllGroupUsers,
  getSwappableChoresThunk,
} from './../redux/creators';

const GetAllInfoFromServer = ({
  userInfo,
  getUserInfo,
  getMarketChores,
  getUserChores,
  getGroupUsers,
  getSwappableChores,
}) => {
  // to do:
  // get all the other chores in the group for swaps
  // admin stuff

  // get user info on load
  useEffect(() => {
    console.log('getting user info');
    if (userInfo.token) {
      getUserInfo();
    }
  }, [userInfo.id]);

  // get user chores and market chores when group id changes
  useEffect(() => {
    if (userInfo.token && userInfo.id) {
      let groupId = null;
      if (userInfo.groups[0] && userInfo.groups[0].id) {
        groupId = userInfo.groups[0].id;
        console.log('group id', groupId);
      }
      console.log('getting your chores and market chores');
      getUserChores(groupId);
      getMarketChores(groupId);
      getGroupUsers(groupId);
      getSwappableChores(groupId);
    }
  }, [userInfo.groups[0]]);

  // this component does not display anything
  return null;
};
const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatch = dispatch => ({
  getUserChores: groupId => dispatch(getUserChoresThunk(groupId)),
  getUserInfo: () => dispatch(getUserInfo()),
  getMarketChores: groupId => dispatch(getMarketChoresThunk(groupId)),
  getGroupUsers: groupId => dispatch(getAllGroupUsers(groupId)),
  getSwappableChores: groupId => dispatch(getSwappableChoresThunk(groupId)),
});

export default connect(
  mapState,
  mapDispatch,
)(GetAllInfoFromServer);
