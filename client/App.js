import React, { Component } from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  SafeAreaView,
} from 'react-navigation';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import store from './src/redux';
import { INITIAL_SCREEN } from 'react-native-dotenv';

import LoginScreen from './src/screens/LoginScreen';
import ThemeScreen from './src/screens/ThemesScreen';

// Drawer nav and Bottom tab nav
import MainNav from './src/nav/Main/MainNav';

import { setNavigator } from './src/nav/navJumpAsync';

const RootSwitch = createSwitchNavigator(
  {
    Login: LoginScreen,
    Theme: ThemeScreen,
    Main: MainNav,
    // Testing bc it's not navigating away
    // Home: HomeScreen,
  },
  {
    initialRouteName: INITIAL_SCREEN || 'Login',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const Navigation = createAppContainer(RootSwitch);

class App extends Component {
  constructor() {
    super();
    this.state = { isLoading: true };
  }
  // loading custom fonts here
  componentDidMount() {
    Font.loadAsync({
      'pacifico-regular': require('./src/assets/Pacifico-Regular.ttf'),
    }).then(() => {
      this.setState({ ...this.state, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.mainContainer}>
          <Navigation ref={navigator => setNavigator(navigator)} />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
  },
});

export default App;
