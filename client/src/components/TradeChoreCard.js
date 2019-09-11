import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Button,
  Body,
  Title,
} from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import serverApi from '../api/serverApi';
import theme from '../styles/theme.style';
import navigate from '../nav/navJumpAsync';

class TradeChoreCard extends Component {
  constructor() {
    super();
    this.state = {
      tradeTerms: '',
    };
  }
  render() {
    const { nav } = this.props;
    const name = nav.getParam('name', 'No Name');
    const currUserId = nav.getParam('choreId', 'No Name');
    const currChoreId = nav.getParam('userId', 'No Name');
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Card>
          <CardItem header bordered>
            <Title>
              <Text>{name}</Text>
            </Title>
          </CardItem>
          <CardItem>
            <TextInput
              placeholder="Trade terms (ie. bottle of beer, a donkey, etc.)"
              onChangeText={tradeTerms => {
                this.setState({ tradeTerms });
              }}
              value={this.state.tradeTerms}
            />
          </CardItem>
          <CardItem
            button
            style={styles.confirmButton}
            onPress={() => {
              const tradeTerms = this.state.tradeTerms;
              tradeTerms
                ? tradeChore(currUserId, currChoreId, tradeTerms)
                : Alert.alert('No trade found');
            }}
          >
            <Left />
            <Body>
              <Text
                style={{ marginLeft: 10, color: 'white', fontWeight: 'bold' }}
              >
                Confirm Trade
              </Text>
            </Body>
            <Right />
          </CardItem>
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const tradeChore = (userId, assignedChoreId, tradeTerms) => {
  serverApi
    .post('/trade_chore/create_trade', {
      userId,
      assignedChoreId,
      tradeTerms,
    })
    .then(resp => {
      console.log(resp);
      navigate('Home');
    })
    .catch(err => {
      err ? Alert.alert('Chore already in the marketplace') : '';
    });
};

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: theme.SECONDARY_COLOR,
  },
});

export default TradeChoreCard;
