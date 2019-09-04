import React from 'react';
import { REACT_ENV, SERVER_URL } from 'react-native-dotenv';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';

const HomeScreen = props => {
  const { userInfo } = props;
  console.log('USER INFO: ',userInfo)
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Text>Home Screen</Text>
        <Text>Welcome {userInfo.name}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
  },
});

const mapState = ({ userInfo }) => ({ userInfo });
export default connect(mapState)(HomeScreen);
