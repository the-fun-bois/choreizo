import React from 'react';
import theme from './../styles/theme.style';
import DrawerNavItem from './DrawerNavItem';
import { logoutCreator } from './../redux/creators';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { navigate } from './../nav/navJumpAsync';
const Logout = ({ logout }) => {
  return (
    <DrawerNavItem
      iconPack="MaterialCommunityIcons"
      iconName="logout"
      title="Log Out"
      iconSize={theme.ICON_SIZE_MEDIUM}
      custonOnPress={navigation => {
        logout(navigation);
      }}
    />
  );
};

const mapDispatch = dispatch => ({
  logout: async () => {
    await SecureStore.deleteItemAsync('Bearer');
    dispatch(logoutCreator());
    navigate('Login');
  },
});

export default connect(
  null,
  mapDispatch,
)(Logout);
