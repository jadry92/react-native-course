// React native
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
// React
import React, { Component } from 'react';

//components
import CoinItem from './CoinItem';
import CoinsSearch from './CoinsSearch';
// libraries
import Http from '../../libs/http';
// Resources
import colors from '../../res/colors';

class CoinsScreen extends Component {
  //
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };

  componentDidMount = () => {
    this.getCoins();
  };

  getCoins = async () => {
    this.setState({ loading: true });
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/'
    );
    this.setState({ coins: res.data, allCoins: res.data, loading: false });
  };

  handelPress = (coin) => {
    this.props.navigation.navigate('CoinDetail', { coin });
  };

  handelSearch = (query) => {
    const { allCoins } = this.state;

    const coinsFilter = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.setState({ coins: coinsFilter });
  };

  render() {
    const { coins, loading } = this.state;
    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handelSearch} />
        {loading ? (
          <ActivityIndicator color="#000" size="large" style={styles.loader} />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({ item }) => (
            <CoinItem item={item} onPress={() => this.handelPress(item)} />
          )}
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
  titleText: {
    color: '#FFF',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: '#124312',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 80,
  },
});

export default CoinsScreen;
