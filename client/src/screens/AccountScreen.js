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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50%',
    backgroundColor: theme.PRIMARY_COLOR,
  },
  infoContainer: {
    fontSize: theme.FONT_SIZE_HEADING,
    height: '50%',
  },
});

export default AccountScreen;
