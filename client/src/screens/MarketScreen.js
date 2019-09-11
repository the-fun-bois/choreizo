import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import MarketComponent from '../components/MarketComponent';
import theme from './../styles/theme.style';

import AcceptButton from '../components/marketChoreButtons/AcceptButton';
import CancelButton from '../components/marketChoreButtons/CancelButton';
import DeclineButton from '../components/marketChoreButtons/DeclineButton';
const MarketScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <MarketComponent />
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
