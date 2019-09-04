import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import store from './src/redux';

import LoginScreen from './src/screens/LoginScreen';
import ThemeScreen from './src/screens/ThemesScreen';

import BottomTabNav from './src/nav/Bottom/BottomTabNav';

import { setNavigator } from './src/nav/navJumpAsync';

const RootSwitch = createSwitchNavigator(
  {
    Login: LoginScreen,
    Theme: ThemeScreen,
    App: BottomTabNav,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: null,
    },
  }
);

const Navigation = createAppContainer(RootSwitch);

class App extends Component {
  constructor() {
    super();
    this.state = { isLoading: true };
  }
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   Font.loadAsync({
  //     'pacifico-regular': require('./../assets/Pacifico-Regular.ttf'),
  //   }).then(() => {
  //     setIsLoading(false);
  //   });
  // }, []);
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
        <Navigation ref={navigator => setNavigator(navigator)} />
      </Provider>
    );
  }
}

export default App;
