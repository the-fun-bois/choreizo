import React from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Button,
  Body,
} from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import serverApi from '../api/serverApi';
import theme from '../styles/theme.style';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ChoreCard = ({
  name,
  diff,
  details,
  currUserInfo,
  swapUserInfo,
  currChoreId,
  swapChoreId,
  swapCurrId,
  nav,
  currChoreIdComp,
  submitChore,
}) => {
  return (
    <Content padder>
      <Card>
        <Swipeable
          // added logic here so user not able to swipe complete in swap view, probably should split this component out in future
          renderLeftActions={(progress, dragX) =>
            !swapUserInfo ? (
              <LeftActions
                progress={progress}
                dragX={dragX}
                handleSubmit={() => {
                  submitChore(currChoreIdComp, currUserInfo.groups[0].id);
                }}
              />
            ) : (
              <Text />
            )
          }
        >
          <CardItem
            header
            bordered
            button
            onPress={() => (details ? details() : '')}
          >
            <Text>{name}</Text>
          </CardItem>
          <CardItem footer bordered>
            <CardItem style={styles.circleTag}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 10,
                }}
              >
                {currUserInfo
                  ? `${currUserInfo.firstName[0]}${currUserInfo.surName[0]}`
                  : `${swapUserInfo.firstName[0]}${swapUserInfo.surName[0]}`}
              </Text>
            </CardItem>
            {/* if there's difficulty then show it otherwise dont */}
            <Body style={{ marginRight: 60 }} />

            {diff ? (
              <Right style={styles.diff}>
                <Text
                  style={{ marginRight: 15, fontSize: 15, color: 'white' }}
                >{`Difficulty ${diff}`}</Text>
              </Right>
            ) : (
              swapUserInfo && (
                <Right>
                  <Button
                    transparent
                    style={styles.swapButton}
                    onPress={() => {
                      // will create the swap
                      swapCreator(
                        swapCurrId,
                        swapUserInfo.id,
                        currChoreId,
                        swapChoreId
                      );
                      nav.navigate('Home');
                    }}
                  >
                    <Entypo name="swap" size={20} />
                    <Text>Swap</Text>
                  </Button>
                </Right>
              )
            )}
          </CardItem>
        </Swipeable>
      </Card>
    </Content>
  );
};

const swapCreator = (user1Id, user2Id, assignedChore1Id, assignedChore2Id) => {
  serverApi
    .post('/swap_chore/create_swap', {
      user1Id,
      user2Id,
      assignedChore1Id,
      assignedChore2Id,
    })
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      err ? Alert.alert('Chore already in the marketplace') : '';
    });
};

// component for the sliding of chores on homescreen
const LeftActions = ({ progress, dragX, handleSubmit }) => {
  const scale = dragX.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    // TO-DO on press you can complete the chore
    <TouchableOpacity style={styles.leftAction} onPress={handleSubmit}>
      <Animated.Text
        style={[styles.leftActionText, { transform: [{ scale }] }]}
      >
        Complete
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomCard: {
    flex: 1,
  },
  diff: {
    backgroundColor: theme.PRIMARY_COLOR,
    height: 40,
    borderRadius: 100,
    marginLeft: 10,
    justifyContent: 'center',
  },
  circleTag: {
    backgroundColor: theme.PRIMARY_COLOR,
    height: 40,
    borderRadius: 100,
    marginLeft: 10,
  },
  swapButton: {
    flexDirection: 'column',
    alignContent: 'center',
  },
  leftAction: {
    backgroundColor: theme.SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  leftActionText: {
    color: 'white',
    padding: 20,
    fontWeight: 'bold',
  },
});

export default ChoreCard;
