import React from 'react';
import { View, Text } from 'react-native';
import DrawerNavItem from './DrawerNavItem';
import theme from './../styles/theme.style';

const AdminOptions = ({ userIsAdmin }) => {
  if (userIsAdmin) {
    console.log('admin stuff');
    return (
      <View style={{ alignSelf: 'stretch' }}>
        <Text
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            paddingLeft: 10,
            paddingVertical: 5,
          }}
        >
          Admin Options
        </Text>
        <View style={{ marginLeft: 10, paddingTop: 5 }}>
          <DrawerNavItem
            iconPack="FontAwesome"
            iconName="tasks"
            iconSize={theme.ICON_SIZE_SMALL}
            title="Edit Chores"
            navLink="EditChores"
          />
          <DrawerNavItem
            iconPack="FontAwesome"
            iconName="group"
            iconSize={theme.ICON_SIZE_SMALL}
            title="Edit Users"
            navLink="EditUsers"
          />
        </View>
      </View>
    );
  } else {
    console.log('not an admin');
    return null;
  }
};

export default AdminOptions;
