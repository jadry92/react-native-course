import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import colors from '../../res/colors';

class CoinsSearch extends Component {
  state = {
    query: '',
  };

  handelText = (query) => {
    this.setState({ query });
    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };

  render() {
    const { query } = this.state;
    return (
      <View>
        <TextInput
          style={[
            style.textInput,
            Platform.OS === 'ios' ? style.textInputIOS : style.textInputAndroid,
          ]}
          placeholderTextColor="#fff"
          placeholder="Search Coin"
          onChangeText={this.handelText}
          value={query}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});
export default CoinsSearch;
