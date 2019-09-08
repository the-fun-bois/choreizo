import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

const ChoreCard = ({ name, diff, details }) => {
  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header bordered button onPress={() => details()}>
            <Text>{name}</Text>
          </CardItem>
          <CardItem footer bordered>
            <Text style={styles.bottomCard}>
              Like
              <AntDesign name="hearto" />
            </Text>
            <Text style={styles.diff}>Difficulty</Text>
            <Text>{diff}</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  bottomCard: {
    flex: 1,
  },
  diff: {
    marginRight: 5,
  },
});

export default ChoreCard;
