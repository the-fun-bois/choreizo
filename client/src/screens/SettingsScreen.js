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

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text>Settings:</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
});

SettingsScreen.navigationOptions = { title: 'Settings' };

export default SettingsScreen;
