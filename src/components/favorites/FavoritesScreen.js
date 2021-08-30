import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import colors from '../../res/colors';
import CoinItem from '../coins/CoinItem';
import FavoritesEmptyState from './FavoritesEmptyState';
import Storage from '../../libs/storage';

class FavoritesScreen extends Component {
  state = {
    coinFavorites: [],
  };

  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      if (keys) {
        const favAndKeys = await Storage.instance.multiGet(keys);
        const favorites = favAndKeys.map((fav) => JSON.parse(fav[1]));
        this.setState({ coinFavorites: favorites });
      }
    } catch (err) {
      console.log('Error in get favorites', err);
    }
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.getFavorites);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites);
  }

  handelPress = (coin) => {
    this.props.navigation.navigate('CoinDetail', { coin });
  };

  render() {
    const { coinFavorites } = this.state;
    console.log(coinFavorites);

    return (
      <View style={style.container}>
        {coinFavorites.length === 0 && <FavoritesEmptyState />}
        {coinFavorites.length > 0 && (
          <FlatList
            data={coinFavorites}
            renderItem={({ item }) => (
              <CoinItem item={item} onPress={() => this.handelPress(item)} />
            )}
          />
        )}
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
