import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { getUserInfo, retrieveToken } from './../redux/creators';
import GetAllInfoFromServer from './../components/GetAllInfoFromServer';
import marketChoresReducer from '../redux/reducers/marketChoresReducer';
import ChoreCard from '../components/ChoreCard';
import { Spinner } from 'native-base';

const HomeScreen = props => {
  const { userInfo, userChores, marketChores, navigation } = props;
  // if there's a token in state, then do nothing, otherwise set it again via getToken
  // if (!userInfo.token) getToken();
  // console.log('TOKEN', userInfo.token);

  return (
    <View style={styles.mainContainer}>
      {/* GetALLInfoFromServer is an empty component that runs all the redux thunks */}
      <GetAllInfoFromServer />
      <View>
        <ScrollView>
          <Text>****** My goddam chores:</Text>
          <ChoreCard
            name={userChores[0].chore.name}
            diff={userChores[0].chore.difficulty}
          />
          <Text>{JSON.stringify(userChores)}</Text>
          <Text>****** Goddam market chores:</Text>
          <Text>{JSON.stringify(marketChores)}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
  },
});

const mapState = ({ userInfo, userChores, marketChores }) => ({
  userInfo,
  userChores,
  marketChores,
});
const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(getUserInfo()),
    getToken: () => dispatch(retrieveToken()),
  };
};
export default connect(
  mapState,
  mapDispatch
)(HomeScreen);
