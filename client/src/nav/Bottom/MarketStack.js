import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MarketScreen from './../../screens/MarketScreen';

import Header from './../../components/Header';

const MarketStack = createStackNavigator(
  { Market: MarketScreen },
  {
    initialRouteName: 'Market',
    defaultNavigationOptions: { header: <Header /> },
  },
);

export default MarketStack;
