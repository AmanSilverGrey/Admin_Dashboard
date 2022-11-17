import axios from 'axios';

const Api = axios.create({
    // baseURL: "http://15.206.124.89/api",
    // baseURL: "http://18.214.99.164/api",
    // baseURL: "https://asc.apptology.in/api/",
    baseURL: "https://asc.apptology.in/api",
});

export default Api;