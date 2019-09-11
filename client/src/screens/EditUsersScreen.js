import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import theme from './../styles/theme.style';
import moment from 'moment';

const EditUsersScreen = ({ allGroupChores }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text>Add/Remove a user from group</Text>
        <Text>Activate/Deactivate a user</Text>
      </View>
    </SafeAreaView>
  );
};

EditUsersScreen.navigationOptions = { title: 'Edit Chores' };

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginLeft: 5,
  },
  choreContainer: {
    flexDirection: 'row',
  },
  header: {
    fontSize: theme.FONT_SIZE_LARGE,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  column: { fontSize: theme.FONT_SIZE_MEDIUM, flex: 1, alignSelf: 'center' },
});

const mapState = ({ choreHistory }) => ({ choreHistory });

export default connect(mapState)(EditUsersScreen);
