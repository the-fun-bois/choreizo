import { createStackNavigator } from 'react-navigation-stack';
import HamburgerNav from './../Hamburger/HamburgerNav';
import GroupInfoScreen from './../../screens/GroupInfoScreen';
import ChoreHistoryScreen from './../../screens/ChoreHistoryScreen';
import SettingsScreen from './../../screens/SettingsScreen';

const MainStack = createStackNavigator({
  Drawer: { screen: HamburgerNav, navigationOptions: { header: null } },
  // *** add hamburger nav links here:
  GroupInfo: GroupInfoScreen,
  ChoreHistory: ChoreHistoryScreen,
  Settings: SettingsScreen,
  // signout
  // *** admin only
  // add user
  // view group chores
  // -- extend time
  // -- assign chores
});

export default MainStack;
