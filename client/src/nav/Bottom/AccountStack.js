import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import AccountScreen from './../../screens/AccountScreen';
import Header from './../../components/Header';

const AccountStack = createStackNavigator(
  { Account: AccountScreen },
  {
    initialRouteName: 'Account',
    defaultNavigationOptions: { header: <Header /> },
  },
);

export default AccountStack;
