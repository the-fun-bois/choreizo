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

const declineSwap = (userId, swapChoreId) => {
  return serverApi
    .put('/swap_chore/decline_swap', { userId, swapChoreId })
    .then(response => {
      console.log('swap declined');
      return response.data;
    })
    .catch(e => console.error('error declining chore', e));
};

const declineChore = (choreType, requestBody) => {
  if (!requestBody) {
    return Promise.resolve();
  }
  const { userId, swapChoreId, tradeChoreId, transferChoreId } = requestBody;
  switch (choreType) {
    case 'swap':
      return declineSwap(userId, swapChoreId);
    default:
      console.log('invalid chore type');
      return Promise.resolve();
  }
};

export const DeclineButton = ({
  type = 'swap',
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
        declineChore(type, body)
          .then(() => {
            console.log('update redux state');
            getMarketChores(groupId);
            getSwappableChores(groupId);
            getUserChores(groupId);
          })
          .catch(e => console.error('error accepting chore', e));
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        Decline
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
)(DeclineButton);
