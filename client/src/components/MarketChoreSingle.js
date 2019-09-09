import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Row,
  Col,
  Button,
} from 'native-base';
import { FlatList, Text, View } from 'react-native';
import severApi from '../../src/api/serverApi';
import serverApi from '../../src/api/serverApi';
import AcceptButton from './marketChoreButtons/AcceptButton';
import CancelButton from './marketChoreButtons/CancelButton';
import DeclineButton from './marketChoreButtons/DeclineButton';

const MarketChoreSingle = props => {
  const { chore } = props;
  if (chore.transferChore !== null) {
    chore.type = 'Transfer';
    console.log('transfer');
    return (
      <View alignment='stretch'>
        <Card>
          <Row>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Type:{'\n'}
                {chore.type}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Name:{'\n'}
                {chore.chore.name}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Difficulty:{'\n'}
                {chore.chore.difficulty}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Time:{'\n'}
                {chore.chore.timeLimit} days
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Price:{'\n'}
                {chore.transferChore.price}
              </Text>
            </View>
            <AcceptButton
              type='transfer'
              body={{
                userId: chore.userId,
                transferChoreId: chore.transferChore.id,
              }}
            />
          </Row>
        </Card>
      </View>
    );
  } else if (chore.tradeChore !== null) {
    chore.type = 'Trade';
    return (
      <View alignment='stretch'>
        <Card>
          <Row>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Type:{'\n'}
                {chore.type}
              </Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Name:{'\n'}
                {chore.chore.name}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Difficulty:{'\n'}
                {chore.chore.difficulty}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Time:{'\n'}
                {chore.chore.timeLimit} days
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Terms:{'\n'}
                {chore.tradeChore.tradeTerms}
              </Text>
            </View>
            <AcceptButton
              type='trade'
              body={{
                userId: chore.tradeChore.originalOwnerId,
                tradeChoreId: chore.tradeChore.id,
              }}
            />
          </Row>
        </Card>
      </View>
    );
  } else if (chore.swapAssignedChore2 !== null) {
    chore.type = 'My Swap';
    return (
      <View alignment='stretch'>
        <Card>
          <Row>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Type:{'\n'}
                {chore.type}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Your Chore:{'\n'}
                {chore.swapAssignedChore2}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Their Chore:{'\n'}
                {chore.chore.name}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Their Difficulty:{'\n'}
                {chore.chore.difficulty}
              </Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Time:{'\n'}
                {chore.chore.timeLimit} days
              </Text>
            </View>

            <AcceptButton
              type='transfer'
              body={{ userId: chore.userId, choreId: chore.chore.id }}
            />
            <CancelButton
              type='swap'
              body={{ userId: chore.userId, choreId: chore.id }}
            />
          </Row>
        </Card>
      </View>
    );
  } else if (chore.swapAssignedChore1 !== null) {
    // we know that its someone else's chore to swap
    chore.type = 'Swap';
    console.log('swap1');
    return (
      <View alignment='stretch'>
        <Card>
          <Row>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Type:{'\n'}
                {chore.type}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Your Chore:{'\n'}
                {chore.swapAssignedChore2}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Their Chore:{'\n'}
                {chore.chore.name}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Their Difficulty:{'\n'}
                {chore.chore.difficulty}
              </Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>
                Time:{'\n'}
                {chore.chore.timeLimit} days
              </Text>
            </View>

            <AcceptButton
              type='swap'
              body={{ userId: chore.userId, choreId: chore.chore.id }}
            />
            <DeclineButton
              body={{
                userId: chore.swapAssignedChore1.user2.id,
                choreId: chore.id,
              }}
            />
          </Row>
        </Card>
      </View>
    );
  }
};

export default MarketChoreSingle;
