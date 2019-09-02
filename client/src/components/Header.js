import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Platform, StatusBar } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from './../styles/theme.style';

const Header = ({ title }) => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   Font.loadAsync({
  //     'pacifico-regular': require('./../assets/Pacifico-Regular.ttf'),
  //   }).then(() => {
  //     setIsLoading(false);
  //   });
  // }, []);
  // if (isLoading) {
  //   return null;
  // }
  return (
    <View style={styles.headerContainer}>
      <MaterialCommunityIcons
        name="broom"
        size={theme.ICON_SIZE_MEDIUM}
        color="white"
        style={styles.iconStyle}
      />
      <Text style={styles.headerText}>Choreizo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: theme.PRIMARY_COLOR,
  },
  headerText: {
    fontSize: theme.FONT_SIZE_HEADING,
    fontFamily: 'pacifico-regular',
    color: 'white',
  },
  iconStyle: {
    paddingLeft: 5,
  },
});

export default Header;
