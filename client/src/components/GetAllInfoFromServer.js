import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getUserChoresThunk,
  getUserInfo,
  getMarketChoresThunk,
} from './../redux/creators';

const GetAllInfoFromServer = ({
  userInfo,
  getUserInfo,
  getMarketChores,
  getUserChores,
}) => {
  // get user info
  // then get user chores
  // then get market chores

  // get user info on load
  useEffect(() => {
    // console.log('getting user info');
    getUserInfo();
  }, []);
  // get user chores and market chores when group id changes
  useEffect(() => {
    const groupId = userInfo.groups[0].id;
    if (groupId) {
      // console.log('getting your chores and market chores');
      getUserChores();
      getMarketChores();
    }
  }, [userInfo.groups[0].id]);

  return null;
};
const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatch = dispatch => ({
  getUserChores: () => dispatch(getUserChoresThunk()),
  getUserInfo: () => dispatch(getUserInfo()),
  getMarketChores: () => dispatch(getMarketChoresThunk()),
});

export default connect(
  mapState,
  mapDispatch
)(GetAllInfoFromServer);
