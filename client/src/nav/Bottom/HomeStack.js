import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './../../screens/HomeScreen';
import Header from './../../components/Header';
import UserChoresScreen from '../../screens/UserChoresScreen';
import SwapScreen from '../../screens/SwapScreen';
const HomeStack = createStackNavigator(
  { Home: HomeScreen, Chores: UserChoresScreen, Swap: SwapScreen },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: { header: <Header /> },
  }
);

export default HomeStack;
