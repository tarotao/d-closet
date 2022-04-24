import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {
  IconButton,
} from 'react-native-paper';
import { shape, string } from 'prop-types';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { translateErrors } from '../utils';

// import { memo } from 'react';

export default function ItemDetailScreen2(props) {
  const { route } = props;
  const { id } = route.params;
  const [value, setValue] = useState(null);
  const { navigation } = props;

  useEffect(() => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db.collection(`users/${currentUser.uid}/items`).doc(id);
      unsubscribe = ref.onSnapshot((doc) => {
        const data = doc.data();
        setValue({
          id: doc.data,
          image: data.image,
          genre: data.genreValue,
          buyDate: data.buyDate,
          memo: data.submitMemo,
          price: data.submitPrice,
          times: data.times,
          wearDate: data.wearDate,
        });
      });
    }
    return unsubscribe;
  }, []);

  const handlePress = () => {
    console.log('taro');
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/items`).doc(id);
    ref.set({
      image: value.image,
      genreValue: value.genre,
      submitPrice: value.price,
      buyDate: value.buyDate,
      wearDate: value.wearDate,
      times: value.times,
      submitMemo: value.memo,
      updatedAt: new Date(),
    })
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // eslint-disable-next-line prefer-const
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setValue({ image: result.uri });
    }
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon="pencil"
        size={35}
        color="white"
        style={styles.checkButton}
        onPress={handlePress}
      />
      <ScrollView>
        <View style={styles.inner}>
          <View>
            <View style={styles.Title}>
              <Text style={styles.titleText}>画像</Text>
            </View>
            <IconButton
              onPress={pickImage}
              icon="pencil"
              style={styles.penButton}
            />
            <View style={styles.photoContainer}>
              <Image style={styles.photo} source={{ uri: value && value.image }} />
            </View>
          </View>
          <View style={styles.genrepicker}>
            <View style={styles.Title}>
              <Text style={styles.titleText}>カテゴリー</Text>
            </View>
            <Text style={styles.inputText}>
              {value && value.genre}
            </Text>
          </View>
          <View>
            <View style={styles.Title}>
              <Text style={styles.titleText}>価格</Text>
            </View>
            <Text style={styles.inputText}>
              {value && value.price}
              円
            </Text>
          </View>
          <View style={styles.DatePicker}>
            <View style={styles.Title}>
              <Text style={styles.titleText}>購入日</Text>
            </View>
            <Text style={styles.inputText}>
              {value && value.buyDate}
            </Text>
          </View>
          <View style={styles.DatePicker}>
            <View style={styles.Title}>
              <Text style={styles.titleText}>最終着用日</Text>
            </View>
            <Text style={styles.inputText}>{value && value.wearDate}</Text>
          </View>
          <View style={styles.timesContainaer}>
            <View style={[styles.Title, styles.timesTitle]}>
              <Text style={styles.titleText}>着用回数</Text>
            </View>
            <Text style={styles.inputText}>
              {value && value.times}
              回
            </Text>
          </View>
          <View>
            <View style={styles.Title}>
              <Text style={styles.titleText}>メモ</Text>
            </View>
            <Text style={[styles.inputText, styles.memoText]}>
              {value && value.memo}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

ItemDetailScreen2.propTypes = {
  route: shape({
    params: shape({
      id: string,
      genre: string,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkButton: {
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
  Title: {
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 40,
    paddingVertical: 8,

  },
  titleText: {
    fontSize: 17,
  },
  inputText: {
    fontSize: 19,
    paddingLeft: 40,
    paddingVertical: 22,
  },

  photoContainer: {
    height: 242,
  },
  photo: {
    alignItems: 'center',
    marginLeft: 105,
    marginVertical: 20,
    width: 200,
    height: 200,
  },
  photoButton: {
    position: 'absolute',
    left: 155,
    top: 60,
  },
  penButton: {
    position: 'absolute',
    left: 320,
    top: -5,
  },

  genreconteiner: {
    marginVertical: 70,
  },
  genrepicker: {
  },

  memoInput: {
    paddingBottom: 20,
    width: 280,
    height: 150,
  },
  memoCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 220,
    left: 31,
  },
  memoModalView: {
    height: 280,
    width: 330,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  radioItems: {
    flexDirection: 'row',
  },
  radioText: {
    fontSize: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 120,
    left: 75,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  priceCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 120,
    left: 75,
  },
  PriceModalView: {
    height: 200,
    width: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  priceInput: {
    marginTop: 20,
    width: 100,
  },
  modalButton: {
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  timesContainaer: {
  },
  plusButton: {
    position: 'absolute',
    bottom: -7,
    left: 305,
  },
  minusButton: {
    position: 'absolute',
    bottom: -7,
    left: 340,
  },
  timesTitle: {
    flexDirection: 'row',
  },

  memoText: {
    height: 300,
  },
});
