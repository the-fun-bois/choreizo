import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { getUserInfo, retrieveToken } from './../redux/creators';
import GetAllInfoFromServer from './../components/GetAllInfoFromServer';
import { submitChore } from '../redux/creators';
import ChoreCard from '../components/ChoreCard';
import theme from './../styles/theme.style';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
} from 'native-base';

const HomeScreen = props => {
  const { userInfo, userChores, marketChores, navigation, submitChore } = props;
  // if there's a token in state, then do nothing, otherwise set it again via getToken
  // if (!userInfo.token) getToken();
  // console.log('TOKEN', userInfo.token);
  return (
    <Container>
      <GetAllInfoFromServer />
      <Header style={styles.headerBack}>
        <Left />
        <Body>
          <Title style={{ color: 'white' }}>My Chores</Title>
        </Body>
        <Right />
      </Header>
      <ScrollView>
        <FlatList
          data={userChores}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ChoreCard
              name={item.chore.name}
              diff={item.chore.difficulty}
              currChoreIdComp={item.id}
              currUserInfo={userInfo}
              submitChore={submitChore}
              details={() =>
                navigation.navigate('Chores', {
                  choreName: item.chore.name,
                  details: item.chore.details[0],
                  userName: userInfo.firstName,
                  lastName: userInfo.surName,
                  timeLimit: item.chore.timeLimit,
                  currChoreId: item.id,
                  currUserId: userInfo.id,
                })
              }
            />
          )}
        />
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flexDirection: 'column',
  },
  headerBack: {
    backgroundColor: theme.SECONDARY_COLOR,
  },
});

const mapState = ({ userInfo, userChores, marketChores }) => ({
  userInfo,
  userChores,
  marketChores,
});
const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(getUserInfo()),
    getToken: () => dispatch(retrieveToken()),
    submitChore: (choreId, groupId) => dispatch(submitChore(choreId, groupId)),
  };
};
export default connect(
  mapState,
  mapDispatch
)(HomeScreen);
