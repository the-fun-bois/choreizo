import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ChoreCard from '../components/ChoreCard';
import { fetchChores } from '../redux/creators/userInfoCreators';

const UserChoresScreen = props => {
  const { userInfo, allChores } = props;
  allChores();
  return <ChoreCard />;
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
  },
});

const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatchToState = dispatch => {
  return {
    allChores: () => {
      dispatch(fetchChores());
    },
  };
};
export default connect(
  mapState,
  mapDispatchToState
)(UserChoresScreen);
