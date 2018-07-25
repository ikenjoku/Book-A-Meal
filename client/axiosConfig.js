import axios from 'axios';

let api = '/api/v1';

api = process.env.NODE_ENV === ('development' || 'test') ?
  `http://localhost:9000${api}` : api;

export default axios.create({
  baseURL: api,
});
