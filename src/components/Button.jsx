import { func, shape, string } from 'prop-types';
import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';

export default function Button(props) {
  const { label, onPress, style } = props;
  return (
    // , styleとすることでスタイルを上書きしている
    <TouchableOpacity style={[styles.buttonContainer, style]}>
      <Text style={styles.buttonLabel} onPress={onPress}>{label}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  label: string.isRequired,
  onPress: func,
  style: shape(),
};

Button.defaultProps = {
  onPress: null,
  style: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#808080',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: '#ffffff',
  },
});
