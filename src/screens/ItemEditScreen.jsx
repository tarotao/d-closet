/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  TextInput,
  RadioButton,
  Button,
  IconButton,
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {
  shape,
  string,
  number,
} from 'prop-types';
import firebase from 'firebase';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { translateErrors } from '../utils';

export default function ItemEditScreen(props) {
  const { route } = props;
  const {
    id,
    wImage,
    wGenre,
    wBuyDate,
    wMemo,
    wPrice,
    wTimes,
    wWearDate,
  } = route.params;

  const [image, setImage] = useState(wImage);
  const [genreValue, setGenreValue] = useState(wGenre);
  const [submitPrice, setSubmitPrice] = useState(wPrice);
  const [buyDate, setBuyDate] = useState(wBuyDate);
  const [wearDate, setWearDate] = useState(wWearDate);
  const [times, setTimes] = useState(wTimes);
  const [submitMemo, setSubmitMemo] = useState(wMemo);

  const deleteItem = (deleteId) => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/items`).doc(deleteId);
      Alert.alert('メモを削除します', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {},
        },
        {
          text: '削除する',
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert('削除に失敗しました');
            });
            navigation.navigate('Home');
          },
          style: 'destructive',
        },
      ]);
    }
  };

  const submitValue = () => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/items`).doc(id);
    ref.set({
      image,
      genreValue,
      submitPrice,
      buyDate,
      wearDate,
      times,
      submitMemo,
      updatedAt: new Date(),
    })
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
  };
  const submitData = () => {
    if (image != null && genre !== '未選択') {
      console.log('データを送信しました');
      submitValue();
    } else {
      Alert.alert(
        '必須項目が未入力です',
        '※は必須項目です',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      );
    }
  };
  const { navigation } = props;

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
      setImage(result.uri);
    }
  };
  const [genre, setGenre] = useState('トップス');
  const [inputMemo, setInputMemo] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [priceVisible, setPriceVisible] = useState(false);
  const [memoVisible, setMemoVisible] = useState(false);
  const [inputPrice, setInputPrice] = useState('');

  const mordalShow = () => {
    setIsVisible(true);
  };
  const mordalHide = () => {
    setIsVisible(false);
  };

  const priceShow = () => {
    setPriceVisible(true);
  };
  const priceHide = () => {
    setPriceVisible(false);
  };
  const priceConfirm = () => {
    priceHide();
    setSubmitPrice(inputPrice);
  };

  const memoShow = () => {
    setMemoVisible(true);
  };
  const memoHide = () => {
    setMemoVisible(false);
  };
  const memoConfirm = () => {
    memoHide();
    setSubmitMemo(inputMemo);
  };

  const submitGenre = () => {
    mordalHide();
    setGenreValue(genre);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [isWearVisible, setWearVisibility] = useState(false);
  const showWearPicker = () => {
    setWearVisibility(true);
  };
  const hideWearPicker = () => {
    setWearVisibility(false);
  };

  const handleBuyDate = (selectedDate) => {
    hideDatePicker();
    /* eslint-disable-next-line */
    const formatDate = require('date-fns/format');
    const submitBuyDate = formatDate(selectedDate, 'yyyy年MM月dd日');
    setBuyDate(submitBuyDate);
  };
  const handleWearDate = (selectedDate) => {
    hideWearPicker();
    /* eslint-disable-next-line */
    const formatDate = require('date-fns/format');
    const submitWearDate = formatDate(selectedDate, 'yyyy年MM月dd日');
    setWearDate(submitWearDate);
  };

  const addTimes = () => {
    setTimes(times + 1);
  };
  const subTimes = () => {
    if (times >= 1) {
      setTimes(times - 1);
    } else {
      setTimes(0);
    }
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon="check-bold"
        size={35}
        color="white"
        style={styles.checkButton}
        onPress={submitData}
      />
      <ScrollView>
        <View style={styles.inner}>
          <View style={styles.deleteContainar}>
            <Button
              onPress={() => { deleteItem(id); }}
              mode="contained"
              style={styles.deleteBtn}
              color="red"
            >
              削除する
            </Button>
          </View>
          <View>
            <View style={styles.Title}>
              <Text style={styles.titleText}>画像※</Text>
              <IconButton
                onPress={pickImage}
                icon="pencil"
                style={styles.penButton}
              />
            </View>
            <View style={styles.photoContainer}>
              <IconButton
                size={50}
                onPress={pickImage}
                icon="file-image-outline"
                style={styles.photoButton}
              />
              {image && <Image style={styles.photo} source={{ uri: image && image }} />}
            </View>
          </View>
          <View style={styles.genrepicker}>
            <View style={styles.Title}>
              <Text style={styles.titleText}>カテゴリー※</Text>
              <IconButton
                onPress={mordalShow}
                icon="pencil"
                style={styles.penButton}
              />
            </View>
            <Text style={styles.inputText}>
              {genreValue}
            </Text>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent
                visible={isVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <RadioButton.Group onValueChange={(newValue) => setGenre(newValue)} value={genre}>
                      <RadioButton.Item label="トップス" value="トップス" />
                      <RadioButton.Item label="ボトムス" value="ボトムス" />
                      <RadioButton.Item label="アウター" value="アウター" />
                      <RadioButton.Item label="シューズ" value="シューズ" />
                      <RadioButton.Item label="その他" value="その他" />
                    </RadioButton.Group>
                    <Button
                      mode="contained"
                      onPress={submitGenre}
                      color="#467FD3"
                    >
                      決定
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View>
            <View style={styles.Title}>
              <Text style={styles.titleText}>価格</Text>
              <IconButton
                onPress={priceShow}
                icon="pencil"
                style={styles.penButton}
              />
            </View>
            <Text style={styles.inputText}>
              {submitPrice}
              円
            </Text>
            <View style={styles.priceCenteredView}>
              <Modal
                animationType="slide"
                transparent
                visible={priceVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.PriceModalView}>
                    <TextInput
                      label="価格"
                      value={inputPrice}
                      onChangeText={(input) => setInputPrice(input)}
                      dense
                      mode="outlined"
                      style={styles.priceInput}
                    />
                    <Button
                      onPress={priceConfirm}
                      mode="contained"
                      style={styles.modalButton}
                      color="#467FD3"
                    >
                      決定
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View style={styles.DatePicker}>
            <View style={styles.Title}>
              <Text style={styles.titleText}>購入日</Text>
              <IconButton
                onPress={showDatePicker}
                icon="pencil"
                style={styles.penButton}
              />
            </View>
            <Text style={styles.inputText}>{buyDate}</Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleBuyDate}
              onCancel={hideDatePicker}
              confirmTextIOS="決定"
              cancelTextIOS="戻る"
              display="inline"
              locale="ja-JA"
            />
          </View>
          <View style={styles.DatePicker}>
            <View style={styles.Title}>
              <Text style={styles.titleText}>最終着用日</Text>
              <IconButton
                onPress={showWearPicker}
                icon="pencil"
                style={styles.penButton}
              />
            </View>
            <Text style={styles.inputText}>{wearDate}</Text>
            <DateTimePickerModal
              isVisible={isWearVisible}
              mode="date"
              onConfirm={handleWearDate}
              onCancel={hideWearPicker}
              confirmTextIOS="決定"
              cancelTextIOS="戻る"
              display="inline"
              locale="ja-JA"
            />
          </View>
          <View style={styles.timesContainaer}>
            <View style={[styles.Title, styles.timesTitle]}>
              <Text style={styles.titleText}>着用回数</Text>
              <IconButton
                style={[styles.plusButton]}
                onPress={addTimes}
                icon="plus-box"
              />
              <IconButton
                style={[styles.minusButton]}
                onPress={subTimes}
                icon="minus-box"
              />
            </View>
            <Text style={styles.inputText}>
              {times}
              回
            </Text>
          </View>
          <View>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent
                visible={memoVisible}
                style={styles.memoModal}
              >
                <View style={styles.memoCenteredView}>
                  <View style={styles.memoModalView}>
                    <TextInput
                      label="メモ"
                      value={inputMemo}
                      onChangeText={(inputText) => setInputMemo(inputText)}
                      style={styles.memoInput}
                      mode="outlined"
                      multiline
                    />
                    <Button
                      onPress={memoConfirm}
                      mode="contained"
                      style={styles.modalButton}
                      color="#467FD3"
                    >
                      決定
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.Title}>
              <Text style={styles.titleText}>メモ</Text>
              <IconButton
                onPress={memoShow}
                icon="pencil"
                style={[styles.timesButton, styles.penButton]}
              />
            </View>
            <Text style={[styles.inputText, styles.memoText]}>{submitMemo}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

ItemEditScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
      wImage: string,
      wGenre: string,
      wBuyDate: string,
      wMemo: string,
      wPrice: string,
      wWearTimes: number,
    }),
  }).isRequired,
//   route: shape({
//     params: shape({ id: string }),
//   }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkButton: {
    position: 'absolute',
    backgroundColor: '#20b2aa',
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
    left: 275,
  },
  minusButton: {
    position: 'absolute',
    bottom: -7,
    left: 320,
  },
  timesTitle: {
    flexDirection: 'row',
  },

  memoText: {
    height: 300,
  },
  deleteContainar: {
    justifyContent: 'center',
    flexDirection: 'row',

  },
  deleteBtn: {
    width: 100,
    fontSize: 40,
    marginVertical: 30,
  },
});
