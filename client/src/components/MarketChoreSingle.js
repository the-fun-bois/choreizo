import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Row,
  Col,
  Button,
  Right,
  Center,
  Left,
} from 'native-base';
import { FlatList, Text, View } from 'react-native';
import severApi from '../../src/api/serverApi';
import serverApi from '../../src/api/serverApi';
import AcceptButton from './marketChoreButtons/AcceptButton';
import CancelButton from './marketChoreButtons/CancelButton';
import DeclineButton from './marketChoreButtons/DeclineButton';
import theme from '../styles/theme.style';

const MarketChoreSingle = props => {
  const { chore } = props;

  if (chore.transferChore !== null) {
    chore.type = 'Transfer';
    console.log('transfer');
    return (
      <View alignment='stretch'>
        <Card>
          <Row>
            <View style={styles.view}>
              <Text style={styles.text}>
                Type:{'\n'}
                {chore.type}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Name:{'\n'}
                {chore.chore.name}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Difficulty:{'\n'}
                {chore.chore.difficulty}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Time:{'\n'}
                {chore.chore.timeLimit} days
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Price:
                {'\n'}
                {chore.transferChore.price}
              </Text>
            </View>
          </Row>
          <CardItem>
            <Left>
              <AcceptButton
                style={styles.circleTag}
                type='transfer'
                body={{
                  userId: chore.userId,
                  transferChoreId: chore.transferChore.id,
                }}
              />
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  } else if (chore.tradeChore !== null) {
    chore.type = 'Trade';
    return (
      <View alignment='stretch'>
        <Card>
          <Row>
            <View style={styles.view}>
              <Text style={styles.text}>
                Type:{'\n'}
                {chore.type}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Name:{'\n'}
                {chore.chore.name}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Difficulty:{'\n'}
                {chore.chore.difficulty}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Time:{'\n'}
                {chore.chore.timeLimit} days
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Terms:{'\n'}
                {chore.tradeChore.tradeTerms}
              </Text>
            </View>
          </Row>
          <CardItem>
            <Left>
              <AcceptButton
                type='trade'
                body={{
                  userId: chore.tradeChore.originalOwnerId,
                  tradeChoreId: chore.tradeChore.id,
                }}
              />
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  } else if (chore.swapAssignedChore2 != null) {
    chore.type = 'Swap';
    return (
      <View alignment='stretch'>
        <Card>
          <Row>
            <View style={styles.view}>
              <Text style={styles.text}>
                Type:{'\n'}
                {chore.type}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Their Chore:{'\n'}
                {chore.chore.name}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Their Difficulty:{'\n'}
                {chore.chore.difficulty}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Your Chore:{'\n'}
                {chore.swapAssignedChore2.swapAssignedChore1.chore.name}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Your Difficulty:{'\n'}
                {chore.swapAssignedChore2.swapAssignedChore1.chore.difficulty}
              </Text>
            </View>
          </Row>
          <CardItem>
            <Left>
              <AcceptButton
                type='swap'
                body={{
                  userId: chore.userId,
                  swapChoreId: chore.swapAssignedChore2.id,
                }}
              />
            </Left>
            <Right>
              <DeclineButton
                type='swap'
                body={{
                  userId: chore.userId,
                  swapChoreId: chore.swapAssignedChore2.id,
                }}
              />
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  } else if (chore.swapAssignedChore1 != null) {
    // we know that its someone else's chore to swap
    chore.type = 'My Swap';
    console.log('swap1');
    return (
      <View alignment='stretch'>
        <Card>
          <Row>
            <View style={styles.view}>
              <Text style={styles.text}>
                Type:{'\n'}
                {chore.type}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Their Chore:{'\n'}
                {chore.swapAssignedChore1.swapAssignedChore2.chore.name}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Their Chore Difficulty:{'\n'}
                {chore.swapAssignedChore1.swapAssignedChore2.chore.difficulty}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Your Chore:{'\n'}
                {chore.chore.name}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>
                Your Difficulty:{'\n'}
                {chore.chore.difficulty}
              </Text>
            </View>
          </Row>
          <CardItem>
            <CancelButton
              type='swap'
              body={{
                userId: chore.userId,
                swapChoreId: chore.swapAssignedChore1.id,
              }}
            />
          </CardItem>
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#3F51B5',
    fontWeight: 'bold',
  },
  view: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default MarketChoreSingle;
