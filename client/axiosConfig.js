import axios from 'axios';

let api = '/api/v1';

api = process.env.NODE_ENV === 'production' ?
  api : `http://localhost:9000${api}`;

export default axios.create({
  baseURL: api,
});
