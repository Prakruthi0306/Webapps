import axios from 'axios'

const instance = axios.create();
instance.defaults.baseURL = process.env.API_ENDPOINT || "http://localhost:8080"
instance.defaults.timeout = 2500;

export default instance
