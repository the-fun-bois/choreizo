import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Card, CardItem, Left, Body } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import theme from '../styles/theme.style';
import { connect } from 'react-redux';

const profileHeader = userInfo => (
  <View style={styles.headerContainer}>
    <ImageBackground
      blurRadius={10}
      style={styles.headerBackgroundImage}
      source={{
        uri: 'http://www.allwhitebackground.com/images/2/2281.jpg',
      }}
    >
      <View style={styles.headerColumn}>
        <Image 
          style={styles.userImage}
          source={{
            uri: userInfo.pictureUrl,
          }}/>
        <Text style={styles.userNameText}>{userInfo.firstName}</Text>
      </View>
    </ImageBackground>
  </View>
);

const AccountScreen = ({ userInfo }) => {
  return (  
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          {profileHeader(userInfo)}
        </Card>
      </View>
      <View>
        <Card>
          <CardItem>
            <AntDesign name="mail" style={{
              color: theme.PRIMARY_COLOR,
              fontSize: theme.ICON_SIZE_LARGE,
            }}/>
            <Text style={{
              fontSize: 20,
              marginLeft: 5,
            }}>{userInfo.email}</Text> 
          </CardItem>
          <CardItem>
            <AntDesign name="user" style={{
              color: theme.PRIMARY_COLOR,
              fontSize: theme.ICON_SIZE_LARGE,
            }} />
            <Text>{userInfo.firstName}</Text>
            <Text>{userInfo.surName}</Text>
          </CardItem>
          <CardItem>
            <AntDesign name="wallet" style={{
              color: theme.PRIMARY_COLOR,
              fontSize: theme.ICON_SIZE_LARGE,
            }}/>
            <Text style={{
              marginLeft: 5,
              fontSize: 20,
            }}>{userInfo.ethereumWallet.balance}</Text>
          </CardItem>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  userImage: {
    borderColor: '#01C89E',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  headerBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
  },
});

const mapStateToProps = ({ userInfo }) => ({
  userInfo,
});


export default connect(mapStateToProps)(AccountScreen);
