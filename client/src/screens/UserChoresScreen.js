import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ChoreDetail from '../components/ChoreDetail';

// Chore detailed screen

const UserChoresScreen = ({ navigation }) => {
  return <ChoreDetail nav={navigation} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
  },
});

const mapState = ({ userInfo }) => ({ userInfo });
// const mapDispatchToState = dispatch => {};
export default connect(mapState)(UserChoresScreen);
