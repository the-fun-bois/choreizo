import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { Button } from 'native-base';
import theme from './../styles/theme.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ThemeScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.smallText}>Small Font</Text>
      <Text style={styles.mediumText}>Medium Font</Text>
      <Text style={styles.largeText}>Large Font</Text>
      <Text style={styles.headingText}>Heading Font</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.colorBox, styles.primaryColor]}>
          <Text>Primary Color</Text>
        </View>
        <View style={[styles.colorBox, styles.secondaryColor]}>
          <Text>Secondary Color</Text>
        </View>
        <View style={[styles.colorBox, styles.tertiaryColor]}>
          <Text>Tertiary Color</Text>
        </View>
      </View>
      <View>
        <View style={styles.iconBox}>
          <Text>Large Icon</Text>
          <MaterialCommunityIcons
            name="star-face"
            size={theme.ICON_SIZE_LARGE}
          />
        </View>
        <View style={styles.iconBox}>
          <Text>Medium Icon</Text>
          <MaterialCommunityIcons
            name="star-face"
            size={theme.ICON_SIZE_MEDIUM}
          />
        </View>
        <View style={styles.iconBox}>
          <Text>Small Icon</Text>
          <MaterialCommunityIcons
            name="star-face"
            size={theme.ICON_SIZE_SMALL}
          />
        </View>
      </View>
      <Button onPress={() => navigation.navigate('Login')}>
        <Text>Back To Login</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  smallText: {
    fontSize: theme.FONT_SIZE_SMALL,
  },
  mediumText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  largeText: {
    fontSize: theme.FONT_SIZE_LARGE,
  },
  headingText: {
    fontSize: theme.FONT_SIZE_HEADING,
  },
  primaryColor: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  secondaryColor: {
    backgroundColor: theme.SECONDARY_COLOR,
  },
  tertiaryColor: {
    backgroundColor: theme.TERTIARY_COLOR,
  },
  colorBox: {
    width: 100,
    height: 100,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
  },
  iconBox: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeScreen;
