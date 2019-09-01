import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';

const HomeScreen = props => {
  const { userInfo } = props;
  return (
    <View style={styles.mainContainer}>
      <Text>Home Screen</Text>
      <Text>Welcome {userInfo.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
});

const mapState = ({ userInfo }) => ({ userInfo });
export default connect(mapState)(HomeScreen);
