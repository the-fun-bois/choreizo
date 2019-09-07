import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  List,
  ListItem,
} from 'native-base';
import { FlatList, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MarketChoreSingle from './MarketChoreSingle';
import refreshAllChores from './utils/marketUtils';
import { getMarketChoresThunk } from '../redux/creators/marketChoresCreators';

const Market = props => {
  return (
    <View>
      <FlatList
        data={props.marketChores}
        keyExtractor={chore => `${chore.id}${chore.choreId}`}
        renderItem={({ item }) => {
          return <MarketChoreSingle chore={item} />;
        }}
      />
    </View>
    //<MarketChoreSingle />
  );
};

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
