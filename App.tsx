import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/pages/Home';
import Details from './src/pages/Details';
import {screens} from './src/routes';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens.home.route}>
        <Stack.Screen name={screens.home.route} component={Home} />
        <Stack.Screen name={screens.details.route} component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
