import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import firebase from 'firebase';
// ここでuseNavigationを読み込む
import { useNavigation } from '@react-navigation/native';

export default function LogoutButton() {
  // screenコンポーネントの中でしかnavigatio.resetが
  // 使えないのでuseNavigationを使っている
  // また、下のようなuse~の宣言はは必ずexport defaultの直下に書く
  const navigation = useNavigation();
  function handlePress() {
    firebase.auth().signOut()
      .then(() => {
      // backボタンを表示せずにLogIn画面に遷移させている
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch(() => {
        Alert.alert('ログアウトに失敗しました');
      });
  }
  return (
  /* eslint-disable-next-line */
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255 ,.7)',
  },
});
