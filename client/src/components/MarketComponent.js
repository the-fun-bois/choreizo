import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { getMarketChoresThunk } from '../redux/creators/marketChoresCreators';

export class Market extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log(this.props);
    this.props.getMarket();
    return <Text></Text>;
  }
}

const mapState = state => {
  return {};
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
