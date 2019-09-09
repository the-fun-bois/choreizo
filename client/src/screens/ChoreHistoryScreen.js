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

const ChoreHistoryScreen = ({ choreHistory }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View>
          <Text>Chore History</Text>
          <ScrollView>
            <FlatList
              data={choreHistory}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <Text>item.chore.name</Text>}
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
  },
});

const mapState = ({ choreHistory }) => ({ choreHistory });

export default connect(mapState)(ChoreHistoryScreen);
