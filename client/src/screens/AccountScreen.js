import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import theme from '../styles/theme.style';
import { connect } from 'react-redux';
import { getUserInfo } from './../redux/creators';

const AccountScreen = ({ getUser, userInfo }) => {
  if (!userInfo.email) getUser();
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>Account Screen</Text>
      </View>
    </View>
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
  },
});

// const mapState = ({ userInfo }) => ({ userInfo });
// const mapDispatchToState = dispatch => {
//   return {
//     getUser: () => dispatch(getUserInfo()),
//   };
// };
// export default connect(
//   mapState,
//   mapDispatchToState,
// )(AccountScreen);

export default AccountScreen;
