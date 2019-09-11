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
import { Entypo } from '@expo/vector-icons';

const Complete = () => {
  return (
    <Entypo
      style={styles.column}
      name="check"
      size={theme.ICON_SIZE_SMALL}
      color="green"
    />
  );
};
const Incomplete = () => {
  return (
    <Entypo
      style={styles.column}
      name="cross"
      size={theme.ICON_SIZE_SMALL}
      color="red"
    />
  );
};

const ChoreHistoryCard = ({ choreInfo }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        marginVertical: 5,
        paddingBottom: 5,
        alignItems: 'center',
      }}
    >
      <View style={styles.choreContainer}>
        <Text style={[styles.column]}>{choreInfo.chore.name}</Text>
        <Text style={styles.column}>
          {moment(choreInfo.expiresOn).format('ll')}
        </Text>
        {/* <Text style={styles.column}>{choreInfo.status}</Text> */}
        {choreInfo.status === 'completed' ? <Complete /> : <Incomplete />}
      </View>
    </View>
  );
};

const ChoreHistoryScreen = ({ choreHistory }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View>
          <View style={[{ flexDirection: 'row' }, styles.header]}>
            <Text style={[styles.column, { fontSize: theme.FONT_SIZE_LARGE }]}>
              Chore
            </Text>
            <Text style={[styles.column, { fontSize: theme.FONT_SIZE_LARGE }]}>
              Date
            </Text>
            <Text style={[styles.column, { fontSize: theme.FONT_SIZE_LARGE }]}>
              Status
            </Text>
          </View>
          <ScrollView>
            <FlatList
              data={choreHistory}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <ChoreHistoryCard choreInfo={item} />}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

ChoreHistoryScreen.navigationOptions = { title: 'Your Chore History' };

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

export default connect(mapState)(ChoreHistoryScreen);
