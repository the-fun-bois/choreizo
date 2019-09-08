import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, Image } from 'react-native';
import theme from '../styles/theme.style';
import { connect } from 'react-redux';

const AccountScreen = ({ userInfo }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.profileImgContainer}>
        <Image style={styles.profileImg}></Image>
      </View>
      <View style={styles.infoContainer}>
        <Text></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    height: '50%',
  },
  infoContainer: {
    fontSize: theme.FONT_SIZE_HEADING,
    height: '50%',
  },
  profileImgContainer: {
    alignSelf: 'center',
    marginLeft: 8,
    height: 150,
    width: 150,
    borderRadius: 150/2,
    borderWidth: 1
  },
  // profileImg: {
  //   alignSelf: 'center',
  //   height: 150,
  //   width: 150,
  //   borderRadius: 150/2,
  // },
});

const mapStateToProps = ({ userInfo }) => ({
  userInfo,
});


export default connect(mapStateToProps)(AccountScreen);
