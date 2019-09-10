import React, { useEffect } from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { getUserInfo, retrieveToken } from './../redux/creators';
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
  Button,
  Text,
} from 'native-base';

const SwapScreen = props => {
  const { userInfo, navigation, swappableChores } = props;
  const currChoreId = navigation.getParam('currChoreId');
  return (
    <Container>
      <Header style={styles.headerBack}>
        <Left />
        <Body>
          <Title style={{ color: 'white' }}>SWAP CHORES</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <ChoreCard
          name={swappableChores[0].chore.name}
          swapUserInfo={swappableChores[0].user}
          swapCurrId={userInfo.id}
          currChoreId={currChoreId}
          swapChoreId={swappableChores[0].id}
          // add button to make swap in here as well
        />
      </Content>
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

const mapState = ({ userInfo, swappableChores }) => ({
  userInfo,
  swappableChores,
});
const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(getUserInfo()),
    getToken: () => dispatch(retrieveToken()),
  };
};
export default connect(
  mapState,
  mapDispatch
)(SwapScreen);
