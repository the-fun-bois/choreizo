import React from 'react';
import { Image, StyleSheet } from 'react-native';
import theme from './../styles/theme.style';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';

const ChoreDetail = ({ nav }) => {
  const choreName = nav.getParam('choreName', 'No Name');
  const details = nav.getParam('details', 'No Details');
  const userName = nav.getParam('userName', 'No User Assigned');
  const lastName = nav.getParam('lastName', 'No User Assigned');
  const daysRemaining = nav.getParam('timeLimit', 'No Limit');
  const currChoreId = nav.getParam('currChoreId', 'None');
  const currUserId = nav.getParam('currUserId', 'No current user');

  return (
    <Container>
      <Content>
        <Card style={styles.choreName}>
          <Title style={{ margin: 10 }}>
            <Text style={{ color: 'white' }}>{choreName}</Text>
          </Title>
          <CardItem button style={styles.assignedButton}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>
              {`${userName[0]}${lastName[0]}`}
            </Text>
          </CardItem>
        </Card>
        <Card style={styles.time}>
          <Title style={{ margin: 10 }}>
            <Text style={{ color: 'white' }}>Due Date / Elapsed Time</Text>
          </Title>
          <CardItem style={styles.time}>
            <Left>
              <Text style={{ color: 'white' }}>Sept 12, 2019</Text>
            </Left>
            <Right>
              <Text style={{ marginRight: 10, color: 'white' }}>
                {daysRemaining} days
              </Text>
            </Right>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Image
                source={{
                  // TO-DO dynamically have pictures assigned or be able to upload
                  uri:
                    'https://cdnb.artstation.com/p/assets/images/images/001/281/285/large/arvie-alba-render-dark.jpg?1443552726',
                }}
                style={{ height: 200, width: 375, flex: 1 }}
              />
              <CardItem footer>
                <Text>{details}</Text>
              </CardItem>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem style={styles.econoptions}>
            <Left>
              <Button
                transparent
                style={styles.ecoButton}
                onPress={() =>
                  nav.navigate('Swap', {
                    currChoreId: currChoreId,
                  })
                }
              >
                {/* <Text>Swap Chore</Text> */}
                <Entypo name="swap" size={20} color="white" />
                <Text style={{ color: 'white' }}>Swap</Text>
              </Button>
            </Left>
            <Body>
              <Button
                transparent
                style={styles.ecoButtonMiddle}
                // put necssary params here
                onPress={() =>
                  nav.navigate('Sell', {
                    name: choreName,
                    choreId: currChoreId,
                    userId: currUserId,
                  })
                }
              >
                {/* <Text>Swap Chore</Text> */}
                <Feather name="dollar-sign" size={20} color="white" />
                <Text style={{ color: 'white' }}>Sell</Text>
              </Button>
            </Body>
            <Right>
              <Button
                transparent
                style={styles.ecoButton}
                onPress={() =>
                  nav.navigate('Trade', {
                    name: choreName,
                    choreId: currChoreId,
                    userId: currUserId,
                  })
                }
              >
                {/* <Text>Swap Chore</Text> */}
                <AntDesign name="sync" size={20} color="white" />
                <Text style={{ color: 'white' }}>Trade</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  assignedButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    width: 45,
    height: 42,
    borderRadius: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  choreName: {
    backgroundColor: theme.SECONDARY_COLOR,
    height: 90,
  },
  econoptions: {
    backgroundColor: theme.SECONDARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ecoButton: {
    color: '#87838B',
    flexDirection: 'column',
    alignContent: 'center',
  },
  ecoButtonMiddle: {
    color: '#87838B',
    flexDirection: 'column',
    alignContent: 'center',
    marginRight: 20,
  },
  time: {
    backgroundColor: theme.SECONDARY_COLOR,
    color: 'white',
  },
});

export default ChoreDetail;
