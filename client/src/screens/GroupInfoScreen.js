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
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import theme from './../styles/theme.style';

const MemberCard = ({ memberInfo }) => {
  const defaultAvatarUri = require('./../assets/default_avatar.png');
  const { firstName, surName, imageUrl } = memberInfo;
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        marginVertical: 5,
        paddingBottom: 5,
        alignItems: 'center',
      }}
    >
      <Image
        source={imageUrl ? { uri: imageUrl } : defaultAvatarUri}
        style={{ width: 30, height: 30, borderRadius: 15, marginRight: 5 }}
      />
      <Text
        style={{ fontSize: theme.FONT_SIZE_MEDIUM }}
      >{`${firstName} ${surName}`}</Text>
    </View>
  );
};

const GroupInfoScreen = ({ userInfo, allGroupUsers }) => {
  const groupName = userInfo.groups[0].name;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        {/* display if a user belongs to a group */}
        <View>
          <Text style={styles.header}>Group Name</Text>
          <Text style={{ fontSize: theme.FONT_SIZE_MEDIUM }}>{groupName}</Text>
          <Text style={styles.header}>Members</Text>
          <FlatList
            data={allGroupUsers}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <MemberCard memberInfo={item} />}
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
    marginLeft: 5,
  },
  header: {
    fontSize: theme.FONT_SIZE_LARGE,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

GroupInfoScreen.navigationOptions = {
  title: 'Group Info',
};

const mapState = ({ userInfo, allGroupUsers }) => ({ userInfo, allGroupUsers });
export default connect(mapState)(GroupInfoScreen);
