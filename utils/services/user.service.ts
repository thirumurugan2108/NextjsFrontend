import axios from "axios";

const baseUrl = 'http://localhost:3001/v1/auth/';

export function login(email: string, password: string) {
    axios.post(baseUrl+ 'login',{
        "email": "fake@example.com",
        "password": "password1"
      })
}

export function signup(username: string,email:string, password: string) {
    axios.post(baseUrl+ 'register',{
        "name": "fake name1",
        "email": "fake@example.com",
        "password": "password1"
      })
}