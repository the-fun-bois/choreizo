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

class SellChore extends Component {
  constructor() {
    super();
    this.state = {
      price: '',
    };
    this.handlePrice = this.handlePrice.bind(this);
  }
  handlePrice(chorePrice) {
    this.setState({ price: chorePrice });
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
            <Left>
              <Text>{name}</Text>
            </Left>
            <Right style={{ flexDirection: 'row' }}>
              <Text>$ </Text>
              <TextInput
                placeholder="Asking price $$"
                keyboardType="decimal-pad"
                onChangeText={price => {
                  this.setState({ price });
                }}
                value={this.state.price}
              />
            </Right>
          </CardItem>
          <CardItem
            button
            style={styles.confirmButton}
            onPress={() => {
              const price = parseFloat(this.state.price);
              price
                ? sellChore(currUserId, currChoreId, price)
                : Alert.alert('No price inputted');
            }}
          >
            <Left />
            <Body>
              <Text
                style={{ marginLeft: 10, color: 'white', fontWeight: 'bold' }}
              >
                Confirm Sell
              </Text>
            </Body>
            <Right />
          </CardItem>
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const sellChore = (userId, assignedChoreId, price) => {
  serverApi
    .post('/transfer_chore/create_transfer', {
      userId,
      assignedChoreId,
      price,
    })
    .then(resp => {
      console.log(resp);
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

export default SellChore;
