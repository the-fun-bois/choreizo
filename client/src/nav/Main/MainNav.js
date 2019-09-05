import { createStackNavigator } from 'react-navigation-stack';
import HamburgerNav from './../Hamburger/HamburgerNav';
import HomeStack from './../Bottom/HomeStack';

const MainStack = createStackNavigator({
  Drawer: { screen: HamburgerNav, navigationOptions: { header: null } },
  //  add hamburger nav links here:
});

export default MainStack;
