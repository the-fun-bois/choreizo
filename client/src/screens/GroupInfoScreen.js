import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Button,
} from 'react-native';

import theme from './../styles/theme.style';

const GroupInfoScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        {/* display if a user belongs to a group */}
        <View>
          <Text>Group Name:</Text>
          <Text>Members:</Text>
        </View>

        {/* display if user does not belong to a group */}
      </View>
      <Button
        title="Create Group"
        onPress={() => {
          console.log('go to group creation page');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
});

GroupInfoScreen.navigationOptions = { title: 'Group Info' };

export default GroupInfoScreen;
