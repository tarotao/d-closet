import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
// import LogoutButton from '../components/LogoutButton';
import { IconButton } from 'react-native-paper';
import firebase from 'firebase';
import Items from './Items';
import { translateErrors } from '../utils';
// import Loading from '../components/Loading';

export default function Tops(props) {
  const { navigation } = props;
  const [itemList, setItemList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const handlePress = () => {
    navigation.navigate('Create');
  };
  // navigation.setOptions({
  //   headerRight: () => <LogoutButton />,
  // });

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    // .orderByで追加された順でメモを保存する
    const ref = db.collection(`users/${currentUser.uid}/items`).where('genreValue', '==', 'トップス');
    // メモリストのデータをsnapshotに入れている
    let unsubcrive = () => {};

    if (currentUser) {
      setLoading(true);
      unsubcrive = ref.onSnapshot((snapshot) => {
        const userItems = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          // console.log(data.image);
          userItems.push({
            id: doc.id,
            image: data.image,
            // updatedAt: data.updatedAt.toDate(),
          });
        });
        setItemList(userItems);
        setLoading(false);
      }, (error) => {
        const errorMsg = translateErrors(error.code);
        setLoading(false);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
    }
    return unsubcrive;
  }, []);

  return (
    <View style={styles.container} isLoading={isLoading}>
      <IconButton
        icon="plus"
        size={35}
        color="white"
        style={styles.plusButton}
        onPress={handlePress}
      />
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          style={styles.filter}
        >
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => {
              navigation.navigate('ホーム');
            }}
          >
            <Text style={styles.filterText}>全て</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => {
              navigation.navigate('Tops');
            }}
          >
            <Text style={styles.selected}>トップス</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => {
              navigation.navigate('Bottoms');
            }}
          >
            <Text style={styles.filterText}>ボトムス</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => {
              navigation.navigate('Outers');
            }}
          >
            <Text style={styles.filterText}>アウター</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => {
              navigation.navigate('Shoes');
            }}
          >
            <Text style={styles.filterText}>シューズ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => {
              navigation.navigate('Anothers');
            }}
          >
            <Text style={styles.filterText}>その他</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.itemContainer}>
        <Items itemList={itemList} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // itemContainer: {
  //   marginTop: 50,
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    height: 40,
    zIndex: 3,
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  filter: {
    marginTop: 10,
  },
  selected: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  filterItem: {
    marginRight: 20,
  },
  filterText: {
    opacity: 0.4,
    fontSize: 17,
  },
  plusButton: {
    position: 'absolute',
    backgroundColor: '#467FD3',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    right: 40,
    bottom: 40,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 30,
  },
});
