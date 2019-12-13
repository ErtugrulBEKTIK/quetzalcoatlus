import axios from 'axios';
import qs from 'qs';
import { API_BASE } from '../config';

export default axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data, headers) {
    return qs.stringify(data);
  }],
});