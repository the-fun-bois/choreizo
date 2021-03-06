import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { getUserInfo, retrieveToken } from './../redux/creators';
import SellChoreCard from '../components/SellChoreCard';
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
import TradeChoreCard from '../components/TradeChoreCard';

const TradeScreen = props => {
  const { userInfo, navigation } = props;
  return (
    <Container>
      <Header style={styles.headerBack}>
        <Left />
        <Body>
          <Title style={{ color: 'white' }}>TRADE CHORE</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        {/* some form that will take a price and send it to back end */}
        <TradeChoreCard nav={navigation} />
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
)(TradeScreen);
