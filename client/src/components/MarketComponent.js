import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Title,
  List,
  ListItem,
  Grid,
  Header,
} from 'native-base';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MarketChoreSingle from './MarketChoreSingle';
import refreshAllChores from './utils/marketUtils';
import { getMarketChoresThunk } from '../redux/creators/marketChoresCreators';
import theme from '../styles/theme.style';

const Market = props => {
  return (
    <View>
      <Header style={styles.headerBack}>
        <Left />
        <Body>
          <Title style={{ color: 'white' }}>Market Items</Title>
        </Body>
        <Right />
      </Header>

      <FlatList
        data={props.marketChores}
        keyExtractor={chore => `${chore.id}${chore.choreId}`}
        renderItem={({ item }) => {
          return <MarketChoreSingle chore={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerBack: {
    backgroundColor: theme.SECONDARY_COLOR,
  },
});

const mapState = state => {
  return {
    marketChores: state.marketChores,
    userInfo: state.userInfo,
  };
};

const mapDispatch = dispatch => {
  return {
    getMarket: (userId, groupId) => dispatch(getMarketChoresThunk()),
  };
};
export default connect(
  mapState,
  mapDispatch
)(Market);
