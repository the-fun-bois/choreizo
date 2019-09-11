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

const EditChoresScreen = ({ allGroupChores }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text>Extend time on active chores</Text>
        <Text>Deactivate/delete chores</Text>
        <Text>Create new chores</Text>
      </View>
    </SafeAreaView>
  );
};

EditChoresScreen.navigationOptions = { title: 'Edit Chores' };

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

export default connect(mapState)(EditChoresScreen);
