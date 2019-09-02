import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './../../screens/HomeScreen';
import Header from './../../components/Header';
const HomeStack = createStackNavigator(
  { Home: HomeScreen },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: { header: <Header /> },
  },
);

export default HomeStack;
