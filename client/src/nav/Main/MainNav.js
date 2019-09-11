import { createStackNavigator } from 'react-navigation-stack';
import HamburgerNav from './../Hamburger/HamburgerNav';
import GroupInfoScreen from './../../screens/GroupInfoScreen';
import ChoreHistoryScreen from './../../screens/ChoreHistoryScreen';
import SettingsScreen from './../../screens/SettingsScreen';
import EditChoresScreen from './../../screens/EditChoresScreen';
import EditUsersScreen from '../../screens/EditUsersScreen';
import { Platform, StatusBar } from 'react-native';
const marginTop = Platform.OS === 'ios' ? 0 : -StatusBar.currentHeight;
import theme from './../../styles/theme.style';

const MainStack = createStackNavigator(
  {
    Drawer: { screen: HamburgerNav, navigationOptions: { header: null } },
    // *** add hamburger nav links here:
    GroupInfo: GroupInfoScreen,
    ChoreHistory: ChoreHistoryScreen,
    Settings: SettingsScreen,
    EditChores: EditChoresScreen,
    EditUsers: EditUsersScreen,
    // signout
    // *** admin only
    // add user
    // view group chores
    // -- extend time
    // -- assign chores
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        marginTop,
        backgroundColor: theme.PRIMARY_COLOR,
      },
      headerTintColor: 'white',
    },
  },
);

export default MainStack;
