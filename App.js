import * as React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { Login } from './Login';
import { Register } from './Register';
//import { Auction } from './Auction';
//import { CreateAuction } from './CreateAuction';
//import { ManageAuction } from './ManageAuction';


const Stack = createStackNavigator();

const App = () => (
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
      
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;