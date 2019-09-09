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
  Image,
} from 'react-native';
import theme from './../styles/theme.style';
import DrawerNavItem from './DrawerNavItem';
import Logout from './../components/Logout';
import { EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
const defaultAvatarUri = require('./../assets/default_avatar.png');

const DrawerComponent = props => {
  const { userInfo } = props;
  const { email, pictureUrl } = userInfo;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        forceInset={{ top: 'always', horizontal: 'never' }}
        style={styles.mainContainer}
      >
        {/* user name header */}
        <View style={styles.headingContainer}>
          <Image
            source={pictureUrl ? { uri: pictureUrl } : defaultAvatarUri}
            style={{ height: 50, width: 50, marginVertical: 5 }}
          />
          <Text>{email}</Text>
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
      </View>
    </ScrollView>
  );
};
const windowHeight = Dimensions.get('window').height;
const menuPaddingLeft = 10;
const menuGroupVerticalMargin = 2.5;
const styles = StyleSheet.create({
  mainContainer: {
    // should subtract 44 if iphone X lol otherwise 20 is known height for iphone stat bar
    height:
      Platform.OS === 'ios'
        ? windowHeight - 20
        : windowHeight - StatusBar.currentHeight,
    // paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: theme.SECONDARY_COLOR,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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

const mapState = ({ userInfo }) => ({ userInfo });
export default connect(mapState)(DrawerComponent);
