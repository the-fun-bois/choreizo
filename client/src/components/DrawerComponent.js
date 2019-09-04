import React from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import theme from './../styles/theme.style';
import DrawerNavItem from './DrawerNavItem';
import Logout from './../components/Logout';
import { EvilIcons } from '@expo/vector-icons';

const DrawerComponent = props => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView
        forceInset={{ top: 'always', horizontal: 'never' }}
        style={[styles.safeView]}
      >
        {/* user name header */}
        <View style={styles.headingContainer}>
          <EvilIcons name="user" size={60} />
          <Text>user name goes here</Text>
        </View>

        {/* regular user options */}
        <View style={styles.userOptionsContainer}>
          <DrawerNavItem
            iconPack="MaterialCommunityIcons"
            iconName="account-group"
            iconSize={theme.ICON_SIZE_MEDIUM}
            title="Group Info"
            navLink="GroupInfo"
          />
          <DrawerNavItem
            iconPack="MaterialCommunityIcons"
            iconName="history"
            iconSize={theme.ICON_SIZE_MEDIUM}
            title="Your Chore History"
            navLink="ChoreHistory"
          />
          <DrawerNavItem
            iconPack="AntDesign"
            iconName="setting"
            iconSize={theme.ICON_SIZE_MEDIUM}
            title="Settings"
            navLink="Settings"
          />
        </View>

        {/* admin options */}
        {/****** only render if user is admin */}
        {/* <View style={styles.headingContainer}>
          <Text>Admin Options</Text>
        </View> */}

        {/* log out */}
        <View style={styles.logoutContainer}>
          <Logout />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const windowHeight = Dimensions.get('window').height;
const menuPaddingLeft = 10;
const menuGroupVerticalMargin = 2.5;
const styles = StyleSheet.create({
  safeView: {
    height: windowHeight,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: theme.SECONDARY_COLOR,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  headingContainer: {
    marginTop: 0,
    paddingBottom: 5,
    paddingLeft: menuPaddingLeft,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    marginVertical: menuGroupVerticalMargin,
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
  },

  userOptionsContainer: {
    paddingLeft: menuPaddingLeft,
    marginVertical: menuGroupVerticalMargin,
    flex: 1,
    maxHeight: 200,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  adminOptionsContainer: {
    paddingLeft: menuPaddingLeft,
  },
  logoutContainer: {
    position: 'absolute',
    borderTopColor: 'white',
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    right: 0,
    // alignSelf: 'stretch',
    alignItems: 'flex-start',
    paddingLeft: menuPaddingLeft,
    backgroundColor: theme.PRIMARY_COLOR,
  },
});
export default DrawerComponent;
