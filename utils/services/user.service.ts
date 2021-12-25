import axios from "axios";

const baseUrl = 'http://localhost:3001/v1/auth/';

export function login(username: string, password: string) {
    return axios.post(baseUrl+ 'login',{
      name:username,
      password: password
      })
}

export function signup(username: string,email:string, password: string) {
    return axios.post(baseUrl+ 'register',{
        "name": "fake name1",
        "email": "fake@example.com",
        "password": "password1"
      })
}