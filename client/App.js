import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import store from './src/redux';
import { INITIAL_SCREEN } from 'react-native-dotenv';

import LoginScreen from './src/screens/LoginScreen';
import ThemeScreen from './src/screens/ThemesScreen';

// Drawer nav and Bottom tab nav
import MainNav from './src/nav/Main/MainNav';

import { setNavigator } from './src/nav/navJumpAsync';
import { Linking } from 'expo';

const RootSwitch = createSwitchNavigator(
  {
    Login: LoginScreen,
    Theme: ThemeScreen,
    Main: MainNav,
  },
  {
    initialRouteName: 'Login',
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
    Linking.addEventListener('url', this.handleOpenUrl);
  };

  handleOpenURL = ({ url }) => {
    const [, authenticatedUser] = url.match(/user=([^#]+)/);

  };

  

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={store}>
        <Navigation ref={navigator => setNavigator(navigator)} />
      </Provider>
    );
  }
}

export default App;
