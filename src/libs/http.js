class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      let req = await fetch(url);
      let json = req.json();
      return json;
    } catch (error) {
      console.log('http GET method error', error);
      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body,
      });
      let json = req.json();
      return json;
    } catch (error) {
      console.log('http POST method error', error);
      throw Error(error);
    }
  };

  update = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'PATCH',
        body,
      });
      let json = req.json();
      return json;
    } catch (error) {
      console.log('http PATCH method error', error);
      throw Error(error);
    }
  };

  replace = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'PUT',
        body,
      });
      let json = req.json();
      return json;
    } catch (error) {
      console.log('http PUT method error', error);
      throw Error(error);
    }
  };

  remove = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'DELETE',
        body,
      });
      let json = req.json();
      return json;
    } catch (error) {
      console.log('http DELETE method error', error);
      throw Error(error);
    }
  };
}

export default Http;
