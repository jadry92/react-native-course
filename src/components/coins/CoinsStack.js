// Components
import CoinDetailScreen from '../coinsDetail/CoinDetailScreen';
import CoinsScreen from './CoinsScreen';
// React
import React from 'react';
// Resources
import colors from '../../res/colors';
// React Native
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
