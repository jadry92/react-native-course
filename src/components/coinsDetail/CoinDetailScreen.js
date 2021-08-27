// React
import React, { Component } from 'react';
// React Native
import {
  FlatList,
  Image,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Http from '../../libs/http';
import Colors from '../../res/colors';
import CoinMarketItem from './CoinMarketItem';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: {},
  };

  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/25x25/${coinNameId}.png`;
    }
  };

  setCoinValues = (coin) => {
    this.setState({ coin: coin });
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
    console.log('id' + coin.id);
    console.log(this.state.markets);
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
    const { coin, markets } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image
            style={styles.iconImg}
            source={{ uri: this.getSymbolIcon(coin.nameid) }}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
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
          renderItem={({ item }) => (
            <CoinMarketItem key={item.name} item={item} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
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
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 12,
    flexDirection: 'row',
  },
  list: {
    maxHeight: 150,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 10,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  itemText: {
    color: '#FFF',
    fontSize: 14,
  },
  sectionText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
});

export default CoinDetailScreen;
