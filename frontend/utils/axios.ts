// This axios template will be used to send the requests with velocix token

import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5002/api'
})

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined'){
            const token = localStorage.getItem('velocix_token')
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
)

export default api;