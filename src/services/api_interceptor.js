import axios from "axios";
import { showErrorToast, showToast } from "../components/toast";

class Api {
    Api;
    baseURL = "https://expense-tracker-backend-yy5n.onrender.com";

    constructor() {
        this.Api = axios.create({
            baseURL : this.baseURL,
        });


        this.Api.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
              if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        }, (error) => {
            if (error.response && error.response.data && error.response.data.message){
                showErrorToast(error.response.data.message)
                console.error(error.response.data.message);

                if(error.response.data.message=='Missing Token' || error.response.data.message=='Invalid Token'){
                    localStorage.removeItem('token');
                    window.location.href = '/login';    
                }
            } else {
                showErrorToast(`Error: ${error.message}`);
            }
            console.error('Error:', error.message);
            return Promise.reject(error);
        });

        this.Api.interceptors.response.use((response) => {
            if(response.data.token){
                localStorage.setItem('token', response.data.token);
            }
            if(response.data.message){
                showToast(response.data.message);
            }
            return response;
        }, (error) => {
            if (error.response && error.response.data && error.response.data.message) {
                showErrorToast(error.response.data.message)
                console.error(error.response.data.message);
            } else {
                showErrorToast(`Server Error: ${error.message}`);
            }
            console.error('Server Error:', error.message);
            return Promise.reject(error);
        });
    }

}

export default Api;