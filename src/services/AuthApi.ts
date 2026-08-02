import axios from "axios";


export type RegisterData = {
  name: string;
  department: string;
  email: string;
  mobile: string;
  address: string;
  password: string;
  confirmPassword: string;
};


export type LoginData = {
  email: string;
  password: string;
};


const API = "http://localhost:8081/api/auth";


export const registerUser = (data: RegisterData) => {

    return axios.post(
        `${API}/register`,
        data
    );

};


export const loginUser = (data: LoginData) => {

    return axios.post(
        `${API}/login`,
        data
    );

};