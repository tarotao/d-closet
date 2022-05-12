import React from 'react';
// import {
//   TextInput,
//   RadioButton,
//   Button,
//   IconButton,
// } from 'react-native-paper';
import {
  StyleSheet, TouchableOpacity, FlatList, Image, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  shape,
  string,
  arrayOf,
} from 'prop-types';
// import firebase from 'firebase';

export default function Items(props) {
  const { itemList } = props;
  const navigation = useNavigation();

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.photoItem}
            // { id: item.id }でmemodetailscreenにメモのIDを渡している
        // onPress={() => {
        //   navigation.navigate(
        //     'Edit',
        //     { id: item.id },
        //   );
        // }}
        onPress={() => {
          navigation.navigate(
            'Detail',
            { id: item.id },
          );
        }}
      >
        <Image style={styles.itemImage} source={{ uri: item.image }} />
      </TouchableOpacity>

    );
  }

  return (
    <View style={styles.itemContainer}>
      <FlatList
        data={itemList}
        /* eslint-disable-next-line */
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

Items.propTypes = {
  itemList: arrayOf(shape({
    id: string,
    bodyText: string,
  })).isRequired,
};

const styles = StyleSheet.create({
  itemImage: {
    width: 150,
    height: 150,
    margin: 10,
  },
});
