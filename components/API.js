import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'http://192.168.0.112:8000/api',
  //timeout: 10000,
});

export default APIKit;