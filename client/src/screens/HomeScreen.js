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
import { getUserInfo } from './../redux/creators';
import GetAllInfoFromServer from './../components/GetAllInfoFromServer';
import marketChoresReducer from '../redux/reducers/marketChoresReducer';
import { Spinner } from 'native-base';

const HomeScreen = props => {
  const { userInfo, userChores, marketChores, navigation } = props;

  return (
    <View style={styles.mainContainer}>
      {/* GetALLInfoFromServer is an empty component that runs all the redux thunks */}
      <GetAllInfoFromServer />
      {userChores[0].id && marketChores[0].id ? (
        <View>
          <View>
            <Text>Home Screen</Text>
          </View>
          <View>
            <Button onPress={() => navigation.navigate('Chores')}>
              <Text>Chores</Text>
            </Button>
            <ScrollView>
              <Text>****** My goddam chores:</Text>
              <Text>{JSON.stringify(userChores)}</Text>
              <Text>****** Goddam market chores:</Text>
              <Text>{JSON.stringify(marketChores)}</Text>
            </ScrollView>
          </View>
        </View>
      ) : (
        <Spinner />
      )}
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
  };
};
export default connect(
  mapState,
  mapDispatch,
)(HomeScreen);
