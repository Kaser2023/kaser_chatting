import axios from 'axios';

const instance = axios.create({
    // When Deploting the URL link will be changed to the Heroku or other API
    baseURL: 'http://localhost:9000'
})

export default instance