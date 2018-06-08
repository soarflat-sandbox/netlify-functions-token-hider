const axios = require('axios');
const qs = require('qs');

export function handler(event, context, callback) {
  const API_PARAMS = qs.stringify(event.queryStringParameters);
  // Netlify site UIで定義された、環境変数を取得する
  const { API_TOKEN, API_URL } = process.env;
  const URL = `${API_URL}?${API_PARAMS}&key=${API_TOKEN}`;

  console.log('Injecting token to', API_URL);
  console.log('logging event.....', event);
  console.log('Constructed URL is ...', URL);

  const respond = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  // API呼び出し
  const get = () => {
    axios
      .get(URL)
      .then(response => {
        console.log(response.data);
        respond(response.data);
      })
      .catch(err => respond(err));
  };

  if (event.httpMethod == 'GET') {
    get();
  }
}
