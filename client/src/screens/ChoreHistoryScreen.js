import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import theme from './../styles/theme.style';

const ChoreHistoryScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View>
          <Text>Chore History</Text>
          <ScrollView>
            <Text>Chore</Text>
            <Text>Chore</Text>
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

export default ChoreHistoryScreen;
