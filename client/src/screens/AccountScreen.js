import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import theme from '../styles/theme.style';

const AccountScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View>
          <Text>Account Screen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default AccountScreen;
