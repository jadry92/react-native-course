import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../res/colors';
import FavoritesEmptyState from './FavoritesEmptyState';

class FavoritesScreen extends Component {
  state = {
    coinFavorites: [],
  };

  render() {
    const coinFavorites = this.state;
    return (
      <View style={style.container}>
        <Text>
          <FavoritesEmptyState />
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
