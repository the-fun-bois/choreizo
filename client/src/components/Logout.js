import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from './../styles/theme.style';
import DrawerNavItem from './DrawerNavItem';
const Logout = () => {
  return (
    <DrawerNavItem
      iconPack="MaterialCommunityIcons"
      iconName="logout"
      title="Log Out"
      iconSize={theme.ICON_SIZE_MEDIUM}
      custonOnPress={() => {
        console.log('custom on press logout');
      }}
    />
  );
};

export default Logout;
