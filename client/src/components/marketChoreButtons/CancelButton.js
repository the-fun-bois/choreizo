import React from 'react';
import { Button } from 'native-base';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  getMarketChoresThunk,
  getSwappableChoresThunk,
  getUserChoresThunk,
  getWalletThunk,
} from '../../redux/creators';
import serverApi from '../../api/serverApi';

// swap chore

const cancelSwap = (userId, swapChoreId) => {
  return serverApi
    .put('/swap_chore/cancel_swap', { userId, swapChoreId })
    .then(response => {
      console.log('swap accepted');
      return response.data;
    })
    .catch(e => console.error('error canceling chore', e));
};

const cancelTrade = (userId, tradeChoreId) => {
  return serverApi
    .put('/trade_chore/cancel_trade', { userId, tradeChoreId })
    .then(response => {
      return response.data;
    })
    .catch(e => console.error('error canceling chore', e));
};

const cancelTransfer = (userId, transferChoreId) => {
  return serverApi
    .put('/transfer_chore/cancel_transfer', { userId, transferChoreId })
    .then(response => {
      return response.data;
    })
    .catch(e => console.error('error canceling chore', e));
};

const cancelChore = (choreType, requestBody) => {
  if (!requestBody) {
    return Promise.resolve();
  }
  const { userId, swapChoreId, tradeChoreId, transferChoreId } = requestBody;
  switch (choreType) {
    case 'swap':
      return cancelSwap(userId, swapChoreId);
    case 'trade':
      return cancelTrade(userId, tradeChoreId);
    case 'transfer':
      return cancelTransfer(userId, transferChoreId);
    default:
      console.log('invalid chore type');
      return Promise.resolve();
  }
};

export const CancelButton = ({
  type,
  body,
  userInfo,
  getMarketChores,
  getSwappableChores,
  getUserChores,
}) => {
  const groupId = userInfo.groups[0].id;
  return (
    <Button
      onPress={() => {
        cancelChore(type, body)
          .then(() => {
            console.log('update redux state');
            getMarketChores(groupId);
            getSwappableChores(groupId);
            getUserChores(groupId);
          })
          .catch(e => console.error('error canceling chore', e));
      }}
    >
      <Text>Cancel</Text>
    </Button>
  );
};
const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatch = dispatch => ({
  getMarketChores: groupId => dispatch(getMarketChoresThunk(groupId)),
  getSwappableChores: groupId => dispatch(getSwappableChoresThunk(groupId)),
  getUserChores: groupId => dispatch(getUserChoresThunk(groupId)),
});
export default connect(
  mapState,
  mapDispatch,
)(CancelButton);
