import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import CordeListScreen from './src/screens/CordeListScreen';
import ColumnScreen from './src/screens/ColumnScreen';
import LogoutButton from './src/components/LogoutButton';
import ItemCreateScreen from './src/screens/ItemCreateScreen';
// import ColumnScreen from './src/screens/ColumnScreen';

// import ListCreateScreen from './src/screens/ListCreateScreen';
// import ListEditScreen from './src/screens/ListEditScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: 'AIzaSyCXWzC4CmWUILnonc_CCW0wvJMQBekSkDE',
  authDomain: 'd-closet-d1229.firebaseapp.com',
  projectId: 'd-closet-d1229',
  storageBucket: 'd-closet-d1229.appspot.com',
  messagingSenderId: '1027199391805',
  appId: '1:1027199391805:web:edc0ab271fe3f5c633f254',
};

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Main(props) {
  const { navigation } = props;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton />,
    });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="ホーム"
    >
      <Tab.Screen
        name="ホーム"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home',
        }}
      />
      <Tab.Screen
        name="コーデ"
        component={CordeListScreen}
        options={{
          tabBarIcon: 'hanger',
        }}
      />
      <Tab.Screen
        name="コラム"
        component={ColumnScreen}
        options={{
          tabBarIcon: 'text',
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Create"
          screenOptions={{
            headerStyle: { backgroundColor: '#467FD3' },
            headerTitleStyle: { color: '#ffffff' },
            headerTitle: 'MemoApp',
            headerTintColor: '#ffffff',
            headerBackTitle: 'Back',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Create" component={ItemCreateScreen} />
          {/* <Stack.Screen name="Edit" component={Main} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });