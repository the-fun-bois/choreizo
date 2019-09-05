import React, { useEffect, useState } from 'react';
import { withNavigation, SafeAreaView } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import theme from './../styles/theme.style';

const Header = ({ title, navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="broom"
          size={theme.ICON_SIZE_MEDIUM}
          color="white"
          style={styles.iconStyle}
        />
        <Text style={styles.headerText}>Choreizo</Text>
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Octicons
            name="three-bars"
            size={theme.ICON_SIZE_MEDIUM}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.PRIMARY_COLOR,
  },
  headerText: {
    fontSize: theme.FONT_SIZE_HEADING,
    fontFamily: 'pacifico-regular',
    color: 'white',
    marginRight: 200,
  },
  iconStyle: {
    paddingLeft: 5,
  },
  drawerButton: {
    marginRight: 5,
  },
});

export default withNavigation(Header);
