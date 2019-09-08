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
import { Entypo } from '@expo/vector-icons';

const ChoreDetail = ({ nav }) => {
  const choreName = nav.getParam('choreName', 'No Name');
  const details = nav.getParam('details', 'No Details');
  const userName = nav.getParam('userName', 'No User Assigned');
  const daysRemaining = nav.getParam('timeLimit', 'No Limit');

  return (
    <Container>
      <Content>
        <Card style={styles.choreName}>
          <Title style={{ margin: 10 }}>
            <Text>{choreName}</Text>
          </Title>
        </Card>
        <Card style={styles.assignedTo}>
          <Title style={{ margin: 10 }}>
            <Text>Assigned To:</Text>
          </Title>
          <CardItem button style={styles.assignedButton}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {userName[0]}
            </Text>
          </CardItem>
        </Card>
        <Card style={styles.time}>
          <Title style={{ margin: 10 }}>
            <Text>Due Date / Elapsed Time</Text>
          </Title>
          <CardItem>
            <Left>
              <Text>Sept 12, 2019</Text>
            </Left>
            <Right>
              <Text style={{ marginRight: 10 }}>{daysRemaining} days</Text>
            </Right>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Image
                source={{
                  uri:
                    'https://cdnb.artstation.com/p/assets/images/images/001/281/285/large/arvie-alba-render-dark.jpg?1443552726',
                }}
                style={{ height: 200, width: 375, flex: 1 }}
              />
              <Text>{details}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left style={{ flexDirection: 'column' }}>
              <Button transparent textStyle={{ color: '#87838B' }}>
                {/* <Text>Swap Chore</Text> */}
                <Entypo name="swap" size={30} />
              </Button>
              <Text>Swap</Text>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  assignedTo: {
    height: 90,
  },
  assignedButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    width: 40,
    borderRadius: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  choreName: {
    backgroundColor: theme.SECONDARY_COLOR,
  },
});

export default ChoreDetail;
