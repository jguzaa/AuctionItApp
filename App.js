import * as React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { Login } from './Login';
import { Register } from './Register';
import { Main } from './Main';
import { Auction } from './Auction';



const Stack = createStackNavigator();

const App = () => (
  //stack navigation controller
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
      <Stack.Screen
        name="Main"
        component={Main}
      />
      <Stack.Screen
        name="Auction"
        component={Auction}
      />
      
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;