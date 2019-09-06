import React from 'react';
import { REACT_ENV, SERVER_URL } from 'react-native-dotenv';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';
import { Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import theme from './../styles/theme.style';

import { connect } from 'react-redux';
import { fbLogin, retrieveToken, getBearerToken } from '../redux/creators';

const LoginScreen = ({
  navigation,
  fbLoginDisp,
  getToken,
  handleAuthRedirect,
}) => {
  /*
    Grab token from secure store, create an event listener
    for redirects back to the app.
  */
  getToken();
  Linking.addEventListener('url', handleAuthRedirect);
  return (
    <View>
      <Text style={styles.loginText}>Login Screen</Text>
      {REACT_ENV === 'development' ? (
        <Button
          style={styles.themeButtonContainer}
          onPress={() => navigation.navigate('Theme')}
        >
          <Text style={styles.buttonText}>Theme Guide</Text>
        </Button>
      ) : null}
      <Button
        style={styles.googleButtonContainer}
        onPress={() => {
          /*
          Send appUrl as query string to the server.
          */
          Linking.getInitialURL().then(url => {
            const [protocol, domain] = url.split('://');
            Linking.openURL(
              `${SERVER_URL}/api/auth/google?protocol=${protocol}&domain=${domain}`
            );
          });
        }}
      >
        <AntDesign name="google" style={styles.iconStyle} />
        <Text style={styles.buttonText}>Login With Google</Text>
      </Button>
      <Button
        style={styles.fbButtonContainer}
        onPress={() => {
          Linking.getInitialURL().then(url => {
            const [protocol, domain] = url.split('://');
            Linking.openURL(
              `${SERVER_URL}/api/auth/facebook?protocol=${protocol}&domain=${domain}`
            );
          });
        }}
      >
        <AntDesign name="facebook-square" style={styles.iconStyle} />
        <Text style={styles.buttonText}>Login With Facebook</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
    flex: 1,
  },
  themeButtonContainer: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.SECONDARY_COLOR,
    alignSelf: 'center',
  },
  googleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  fbButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconStyle: {
    fontSize: 30,
    color: 'white',
    marginRight: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: theme.FONT_SIZE_MEDIUM,
    alignSelf: 'center',
  },
  loginText: {
    fontSize: theme.FONT_SIZE_HEADING,
    color: 'white',
    fontWeight: 'bold',
    // flexGrow: 1,
    textAlign: 'center',
  },
});

const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatchToState = dispatch => {
  return {
    fbLoginDisp: () => dispatch(fbLogin()),
    getToken: () => dispatch(retrieveToken()),
    handleAuthRedirect: ({ url }) => {
      /*
      Dispatch getBearerToken after successful authentication
      */
      const bearerToken = url.split('?')[1];
      if (bearerToken) dispatch(getBearerToken(bearerToken));
    },
  };
};

export default connect(
  mapState,
  mapDispatchToState
)(LoginScreen);
