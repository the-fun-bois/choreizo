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

const acceptSwap = (userId, swapChoreId) => {
  return serverApi
    .put('/swap_chore/accept_swap', { userId, swapChoreId })
    .then(response => {
      console.log('swap accepted');
      return response.data;
    })
    .catch(e => console.error('error accepting chore', e));
};

const acceptTrade = (userId, tradeChoreId) => {
  return serverApi
    .put('/trade_chore/accept_trade', { userId, tradeChoreId })
    .then(response => {
      return response.data;
    })
    .catch(e => console.error('error accepting chore', e));
};

const acceptTransfer = (userId, transferChoreId) => {
  return serverApi
    .put('/transfer_chore/accept_transfer', { userId, transferChoreId })
    .then(response => {
      return response.data;
    })
    .catch(e => console.error('error accepting chore', e));
};

const acceptChore = (choreType, requestBody) => {
  if (!requestBody) {
    return Promise.resolve();
  }
  const { userId, swapChoreId, tradeChoreId, transferChoreId } = requestBody;
  switch (choreType) {
    case 'swap':
      return acceptSwap(userId, swapChoreId);
    case 'trade':
      return acceptTrade(userId, tradeChoreId);
    case 'transfer':
      return acceptTransfer(userId, transferChoreId);
    default:
      console.log('invalid chore type');
      return Promise.resolve();
  }
};

export const AcceptButton = ({
  type,
  body,
  userInfo,
  getMarketChores,
  getSwappableChores,
  getUserChores,
  getWallet,
}) => {
  const groupId = userInfo.groups[0].id;
  return (
    <Button
      onPress={() => {
        acceptChore(type, body)
          .then(() => {
            console.log('update redux state');
            getMarketChores(groupId);
            getSwappableChores(groupId);
            getUserChores(groupId);
            if (type === 'transfer') {
              getWallet();
            }
          })
          .catch(e => console.error('error accepting chore', e));
      }}
    >
      <Text>Accept</Text>
    </Button>
  );
};
const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatch = dispatch => ({
  getMarketChores: groupId => dispatch(getMarketChoresThunk(groupId)),
  getSwappableChores: groupId => dispatch(getSwappableChoresThunk(groupId)),
  getUserChores: groupId => dispatch(getUserChoresThunk(groupId)),
  getWallet: () => dispatch(getWalletThunk()),
});
export default connect(
  mapState,
  mapDispatch,
)(AcceptButton);
