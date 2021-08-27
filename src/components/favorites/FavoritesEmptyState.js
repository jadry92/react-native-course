import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const FavoritesEmptyState = () => {
  return (
    <View style={style.container}>
      <Text style={style.textMiddle}>You Don't have any favorite yet</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textMiddle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default FavoritesEmptyState;
