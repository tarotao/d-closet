import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, Platform, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ItemCreateScreen() {
  const [text, setText] = useState('');
  const [selectedValue, setSelectedValue] = useState('トップス');

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      {/* <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="トップス" value="トップス" />
        <Picker.Item label="ボトムス" value="ボトムス" />
        <Picker.Item label="アウター" value="アウター" />
        <Picker.Item label="シューズ" value="シューズ" />
        <Picker.Item label="その他" value="その他" />
      </Picker>
      <TextInput
        label="メモ"
        value={text}
        onChangeText={(inputText) => setText(inputText)}
      /> */}

      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour
          onChange={onChange}
        />
      )}
    </View>
  );
}
