import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import firebase from 'firebase';
import ClothListScreen from './src/screens/ClothListScreen';
import ListCreateScreen from './src/screens/ListCreateScreen';
import ListEditScreen from './src/screens//ListEditScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Edit"
        >
          <Stack.Screen name="List" component={ClothListScreen} />
          <Stack.Screen name="Create" component={ListCreateScreen} />
          <Stack.Screen name="Edit" component={ListEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
