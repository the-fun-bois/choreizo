import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

const MarketChoreSingle = props => {
  return <Text>{props.chore.id}</Text>;
};

export default MarketChoreSingle;
