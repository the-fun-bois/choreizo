import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { getUserInfo } from '../redux/creators';
import theme from '../styles/theme.style';

const AccountScreen = ({ getUser, userInfo }) => {
  if (!userInfo.email) getUser();
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <Text>Account Screen</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50%',
    backgroundColor: theme.PRIMARY_COLOR,
  },
  infoContainer: {
    fontSize: theme.FONT_SIZE_HEADING,
    height: '50%',

  }
});

const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatchToState = dispatch => {
  return {
    getUser: () => dispatch(getUserInfo()),
  }
}
export default connect(mapState, mapDispatchToState)(AccountScreen);
