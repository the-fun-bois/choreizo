import React from 'react';
import {
  ScrollView,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const DrawerComponent = props => {
  return (
    <ScrollView
      style={{
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      }}
    >
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <Text
          onPress={() => {
            props.navigation.closeDrawer();
          }}
        >
          Test 1 Screen
        </Text>
        <Text
          onPress={() => {
            props.navigation.closeDrawer();
          }}
        >
          Test 2 Screen
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DrawerComponent;
