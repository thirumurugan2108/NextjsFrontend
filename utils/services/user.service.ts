import axios from "axios";

// const baseUrl = 'https://api.bingemeee.com/v1/';
const baseUrl = 'http://localhost:3001/v1/';

export function login(username: string, password: string) {
    return axios.post(baseUrl+ 'auth/login',{
      name:username,
      password: password
      })
}


export function getUserDetails() {
  return axios.get(`${baseUrl}users/`, 
  // return axios.get(`http://localhost:3001/v1/users/`, 
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  });
}

export function uploadPhoto (formdata: any){
  // return axios.post(`http://localhost:3001/v1/users/uploadphoto`, 
  return axios.post(`${baseUrl}users/uploadphoto`, 
  formdata,
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  });
}

export function signup(name: string,email:string, password: string, fullName: string) {
    return axios.post(baseUrl+ 'auth/register',{
        "name": name,
        "email": email,
        "password": password,
        fullName: fullName
      });
}


export function getHomeDetailsByUsername (username: String){
  // return axios.get('http://localhost:3001/v1/users/public?username='+ username);
  return axios.get(`${baseUrl}users/public?username=`+ username);
}