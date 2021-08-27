/**
 * @format
 */
// components
import CoinsStack from './src/components/coins/CoinsStack';
// React
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import colors from './src/res/colors';
import FavoritesStack from './src/components/favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          tintColor: '#fefefe',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.blackPearl,
          },
        }}>
        <Tabs.Screen
          name="COINS"
          component={CoinsStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('./src/assets/bank.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Favorite"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('./src/assets/star.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
