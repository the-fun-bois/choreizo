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

const MarketChoreSingle = props => {
  const { chore } = props;
  if (chore.transferChore !== null) {
    chore.type = 'Transfer';
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
            <Button>
              <Text>Accept</Text>
            </Button>
            <Button>
              <Text>Decline</Text>
            </Button>
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
            <Button>
              <Text>Accept</Text>
            </Button>
            <Button>
              <Text>Decline</Text>
            </Button>
          </Row>
        </Card>
      </View>
    );
  } else if (chore.swapAssignedChore1 !== null) {
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
            <Button>
              <Text>Accept</Text>
            </Button>
            <Button>
              <Text>Decline</Text>
            </Button>
          </Row>
        </Card>
      </View>
    );
  } else {
    // we know that its someone else's chore to swap
    chore.type = "Other's Swap";
  }
  return <Text>{chore.type}</Text>;
};

export default MarketChoreSingle;
