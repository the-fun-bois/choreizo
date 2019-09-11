import React from 'react';
import { Button } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  getMarketChoresThunk,
  getSwappableChoresThunk,
  getUserChoresThunk,
  getWalletThunk,
} from '../../redux/creators';
import serverApi from '../../api/serverApi';
import theme from '../../styles/theme.style';

// swap chore

const cancelSwap = (userId, swapChoreId) => {
  console.log('userId', userId, 'swap chore id', swapChoreId);
  return serverApi
    .delete('/swap_chore/cancel_swap', { data: { userId, swapChoreId } })
    .then(response => {
      console.log('swap canceled');
      return response.data;
    })
    .catch(e => console.error('error canceling chore', e));
};

const cancelTrade = (userId, tradeChoreId) => {
  return serverApi
    .delete('/trade_chore/cancel_trade', { data: { userId, tradeChoreId } })
    .then(response => {
      return response.data;
    })
    .catch(e => console.error('error canceling chore', e));
};

const cancelTransfer = (userId, transferChoreId) => {
  return serverApi
    .delete('/transfer_chore/cancel_transfer', {
      data: { userId, transferChoreId },
    })
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
      style={styles.circleTag}
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
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        Cancel
      </Text>
    </Button>
  );
};
const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatch = dispatch => ({
  getMarketChores: groupId => dispatch(getMarketChoresThunk(groupId)),
  getSwappableChores: groupId => dispatch(getSwappableChoresThunk(groupId)),
  getUserChores: groupId => dispatch(getUserChoresThunk(groupId)),
});

const styles = StyleSheet.create({
  circleTag: {
    backgroundColor: theme.PRIMARY_COLOR,
    height: 40,
    borderRadius: 100,
    marginLeft: 10,
  },
});

export default connect(
  mapState,
  mapDispatch
)(CancelButton);
