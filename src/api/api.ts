import axios from "axios";


const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
    timeout: 40000,
    headers: { Accept: 'application/json' }
})

export default api;