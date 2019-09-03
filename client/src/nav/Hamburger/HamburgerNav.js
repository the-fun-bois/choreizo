import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import BottomTabNav from './../Bottom/BottomTabNav';
import DrawerComponent from './../../components/DrawerComponent';

const HamburgerNav = createDrawerNavigator(
  {
    Tabs: BottomTabNav,
  },
  {
    initialRouteName: 'Tabs',
    contentComponent: DrawerComponent,
    drawerPosition: 'right',
  },
);

export default HamburgerNav;
