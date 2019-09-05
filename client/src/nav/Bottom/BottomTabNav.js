import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import theme from './../../styles/theme.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import MarketStack from './MarketStack';
import AccountStack from './AccountStack';

const BottomTabNav = createBottomTabNavigator(
  {
    Account: {
      screen: AccountStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="account"
            size={theme.ICON_SIZE_LARGE}
            color={tintColor}
          />
        ),
      },
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="home"
            size={theme.ICON_SIZE_LARGE}
            color={tintColor}
          />
        ),
      },
    },
    Market: {
      screen: MarketStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="scale-balance"
            size={theme.ICON_SIZE_LARGE}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: theme.PRIMARY_COLOR,
      },
    },
  }
);

export default BottomTabNav;
