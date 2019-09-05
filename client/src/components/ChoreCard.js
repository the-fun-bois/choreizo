import React from 'react';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

const ChoreCard = () => {
  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>Chore TITLE</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>CHORE Detail</Text>
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Text style={{ marginRight: 10 }}>Like</Text>
            <AntDesign name="hearto" />
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default ChoreCard;
