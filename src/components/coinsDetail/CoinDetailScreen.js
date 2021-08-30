// React
import React, { Component } from 'react';
// React Native
import {
  FlatList,
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  Alert,
  View,
} from 'react-native';
import Http from '../../libs/http';
import Storage from '../../libs/storage';
import colors from '../../res/colors';
import CoinMarketItem from './CoinMarketItem';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: {},
    isFavorite: false,
  };

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };

  removeFavorite = async () => {
    Alert.alert('Remove Favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;

          const removed = await Storage.instance.remove(key);
          if (removed) {
            this.setState({ isFavorite: false });
          }
        },
        style: 'destructive',
      },
    ]);
  };

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const stored = await Storage.instance.store(key, coin);
    if (stored) {
      this.setState({ isFavorite: true });
    }
  };

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favorite = await Storage.instance.get(key);
      if (favorite) {
        this.setState({ isFavorite: true });
      }
    } catch (err) {
      console.log('error to load favorite', err);
    }
  };

  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/25x25/${coinNameId}.png`;
    }
  };

  setCoinValues = (coin) => {
    this.setState({ coin: coin }, () => {
      this.getFavorite();
    });
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    let markets = await Http.instance.get(url);

    this.setState({ markets: markets });
  };

  componentDidMount = () => {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol });
    this.setCoinValues(coin);
    this.getMarkets(coin.id);
  };

  getSections = (coin) => {
    const section = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24H',
        data: [coin.volume24],
      },
      {
        title: 'Change 24H',
        data: [coin.percent_change_24h],
      },
    ];
    return section;
  };

  render() {
    const { coin, markets, isFavorite } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{ uri: this.getSymbolIcon(coin.nameid) }}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>

          <Pressable
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove Favorite' : 'Add Favorites'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          style={styles.list}
          data={markets}
          horizontal={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CoinMarketItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 12,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  list: {
    maxHeight: 150,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 10,
    textAlignVertical: 'center',
  },
  iconImg: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: colors.white,
    fontSize: 14,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
});

export default CoinDetailScreen;
