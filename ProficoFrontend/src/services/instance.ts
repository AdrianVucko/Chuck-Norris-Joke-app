import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081"
});

instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem("user-token")
      
      if (token) {
        config.headers['authorization'] = 'Bearer ' + token
        config.params= {...config.params, token:token}
      }
      
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

export default instance;