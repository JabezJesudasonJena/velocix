// This axios template will be used to send the requests with velocix token

import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
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