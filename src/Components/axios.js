import axios from 'axios'

const instance = axios.create({
    baseURL: "https://thepandect-backend.herokuapp.com"
})
export default instance;