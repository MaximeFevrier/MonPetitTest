import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/pages/Home';
import Details from './src/pages/Details';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export type RootStackParamList = {
  Home: undefined;
  Details: {playerId: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen name={'Home'} component={Home} />
          <Stack.Screen name={'Details'} component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
