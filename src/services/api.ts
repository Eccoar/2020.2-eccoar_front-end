import axios from 'axios';

const url = process.env.REACT_APP_GATEWAY || 'localhost:5000';
const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';

const api = axios.create({ baseURL: `${protocol}${url}/api` });

export default api;
