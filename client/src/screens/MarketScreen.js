import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';

import theme from './../styles/theme.style';

const MarketScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>Market Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
  },
});

export default MarketScreen;
