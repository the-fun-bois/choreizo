import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';

import theme from '../styles/theme.style';

const AccountScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>Account Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default AccountScreen;
