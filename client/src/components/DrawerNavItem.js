// reusable drawer nav item component

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  EvilIcons,
} from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const iconComponents = {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
};

const DrawerNavItem = ({
  navigation,
  iconPack,
  iconName,
  iconSize,
  title,
  navLink,
  custonOnPress,
}) => {
  const Icon = iconComponents[iconPack];
  return (
    <TouchableOpacity
      style={styles.navItemContainer}
      onPress={() => {
        if (custonOnPress) {
          custonOnPress(navigation);
        } else {
          console.log('clicked');
          navigation.navigate(navLink);
        }
        navigation.closeDrawer();
      }}
    >
      <Icon name={iconName} size={iconSize} />
      <Text style={styles.navItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  navItemText: {
    paddingLeft: 5,
  },
});
export default withNavigation(DrawerNavItem);
