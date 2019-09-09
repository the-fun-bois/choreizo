import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList,
  SafeAreaView,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import theme from './../styles/theme.style';

const GroupInfoScreen = ({ userInfo, allGroupUsers }) => {
  const groupName = userInfo.groups[0].name;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        {/* display if a user belongs to a group */}
        <View>
          <Text>Group Name:</Text>
          <Text>{groupName}</Text>
          <Text>Members:</Text>
          <FlatList
            data={allGroupUsers}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Text>{`${item.firstName}  ${item.surName}`}</Text>
            )}
          />
        </View>

        {/* display if user does not belong to a group */}
      </View>
      {groupName ? null : (
        <Button
          title="Create Group"
          onPress={() => {
            console.log('go to group creation page');
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
});

GroupInfoScreen.navigationOptions = { title: 'Group Info' };

const mapState = ({ userInfo, allGroupUsers }) => ({ userInfo, allGroupUsers });
export default connect(mapState)(GroupInfoScreen);
