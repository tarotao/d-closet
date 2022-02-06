import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import LogoutButton from '../components/LogoutButton';
import { Button } from 'react-native-paper';

export default function HomeScreen(props) {
  const { navigation } = props;
  const handlePress = () => {
    navigation.navigate('Create');
  };
  // navigation.setOptions({
  //   headerRight: () => <LogoutButton />,
  // });

  return (
    <View style={styles.container}>
      <Text>List</Text>
      <Button
        icon="plus-circle"
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
