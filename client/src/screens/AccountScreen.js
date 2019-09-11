import React , {useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'
import { Button } from 'native-base';
import { Card, CardItem, Right } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { displayUserEdit, updateName } from '../redux/creators';
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

const updateUserInfo = (firstName, lastName, updateDetails) => {
  const [currentFirstName, updateFirstName] = useState(firstName);
  const [currentSurName, updateSurName] = useState(lastName);

  return (
    <View style={styles.editContainer}>
    <CardItem>
      <View>      
        <AntDesign name="user" style={{
        color: theme.PRIMARY_COLOR,
        fontSize: theme.ICON_SIZE_LARGE,
      }}/>
      </View>
    </CardItem>

    <CardItem style={styles.container}>
      <View>
      <Text>Update First Name</Text>
      <TextInput
        editable
        placeholder={firstName}
        style={styles.editField}
        maxLength={50}
        value={currentFirstName}
        onChangeText={(value) => {
          updateFirstName(value);
        }}
      />
      </View>
      </CardItem>
    <CardItem style={styles.container}>
      <View>
      <Text>Update Last Name</Text>
      <TextInput
        editable
        placeholder={lastName}
        style={styles.editField}
        maxLength={50}
        value={currentSurName}
        onChangeText={(value) => {
          updateSurName(value);
        }}
      />
    </View>
    </CardItem>
    <CardItem style={styles.container}>
      <View>
      <Button onPress={() => updateDetails(currentFirstName, currentSurName)}>
        <AntDesign name="check"
        style={{
          color: theme.PRIMARY_COLOR,
          backgroundColor: '#FFF',
          fontSize: theme.ICON_SIZE_LARGE,
        }}/>
      </Button>
    </View>
  </CardItem>
  </View>
  );
};

const AccountScreen = ({ userInfo, editDetails, updateDetails }) => {

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
          {
            userInfo.display === true ? (
              updateUserInfo(userInfo.firstName, userInfo.surName, updateDetails)
            ) : (
              <CardItem>
              <AntDesign name="user" style={{
                color: theme.PRIMARY_COLOR,
                fontSize: theme.ICON_SIZE_LARGE,
              }}/>
              <Text>{userInfo.firstName} </Text>
              <Text>{userInfo.surName}</Text>
              <Right>
                <AntDesign name="edit" style={{
                color: theme.PRIMARY_COLOR,
                fontSize: theme.ICON_SIZE_LARGE,
                }} onPress={() => editDetails()}/>
              </Right>
            </CardItem>
            )
          }
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
  editContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
    borderRadius: 50,
    borderWidth: 1,
    height: 100,
    width: 100,
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
  editField: {
    borderBottomWidth: 1,
    flex: 1,
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

const mapDispatchToProps = dispatch => ({
  editDetails: () => {
    dispatch(displayUserEdit());
  },
  updateDetails: (firstName, surName) => {
    dispatch(updateName(firstName, surName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
