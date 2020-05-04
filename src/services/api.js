import axios from 'axios';
const api = axios.create(
    {
        // baseURL: process.env.REACT_APP_API_URL
        baseURL:' http://localhost:3001/api/'
        // baseURL:'https://boradeliveryone.herokuapp.com/api/'
    }
)
export default api;