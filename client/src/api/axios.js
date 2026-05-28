import axios from "axios"

const api= axios.create({

    baseURL:(import.meta.VITE_BASE_URL||"http://13.204.69.101:3000")+"/api"
})

api.interceptors.request.use((config)=>{
    const token= localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;

})
export default api