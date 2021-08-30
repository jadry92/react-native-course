import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.log('error in store method', err);
      return false;
    }
  };

  get = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      console.log('error in Get method', err);
      throw new Error(err);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (err) {
      console.log('error in Get All Keys method', err);
      throw new Error(err);
    }
  };

  multiGet = async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (err) {
      console.log('error in Multi Get method', err);
      throw new Error(err);
    }
  };

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (err) {
      console.log('error in remove method', err);
      return false;
    }
  };
}

export default Storage;
