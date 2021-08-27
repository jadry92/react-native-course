// React native
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// React
import React from 'react';
// Resources
import colors from '../../res/colors';

const CoinItem = ({ item, onPress }) => {
  const getImagePath = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    } else {
      return require('../../assets/arrow_down.png');
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image source={getImagePath()} style={styles.imageStatus} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    borderBottomColor: colors.zircon,
    borderWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: colors.white,
    fontSize: 14,
    marginRight: 16,
  },
  percentText: {
    color: colors.white,
    fontSize: 12,
  },
  priceText: {
    color: colors.white,
    fontSize: 14,
  },
  imageStatus: {
    width: 15,
    height: 15,
    marginLeft: 15,
  },
});

export default CoinItem;
