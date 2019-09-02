import React from 'react';
import { REACT_ENV } from 'react-native-dotenv';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import theme from './../styles/theme.style';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
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
        style={styles.fbButtonContainer}
        onPress={() => navigation.navigate('App')}
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
    justifyContent: 'space-between',
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

export default LoginScreen;
