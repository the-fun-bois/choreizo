import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './../../screens/HomeScreen';
import Header from './../../components/Header';
import UserChoresScreen from '../../screens/UserChoresScreen';
import SwapScreen from '../../screens/SwapScreen';
import TransferScreen from '../../screens/TransferScreen';
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Chores: UserChoresScreen,
    Swap: SwapScreen,
    Sell: TransferScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: { header: <Header /> },
  }
);

export default HomeStack;
