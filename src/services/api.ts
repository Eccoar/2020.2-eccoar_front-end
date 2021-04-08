import axios from 'axios';

const url = process.env.REACT_APP_GATEWAY || 'localhost:5000';

const api = axios.create({ baseURL: `http://${url}/api` });

export default api;
