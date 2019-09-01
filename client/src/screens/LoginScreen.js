import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.loginText}>Login Screen</Text>
      <Button
        style={styles.buttonContainer}
        onPress={() => console.log(navigation.navigate('App'))}
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
  },
  buttonContainer: {
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
    fontSize: 16,
    alignSelf: 'center',
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    flexGrow: 1,
    textAlign: 'center',
  },
});

export default LoginScreen;
