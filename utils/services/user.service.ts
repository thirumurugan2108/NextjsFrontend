import axios from "axios";

// const baseUrl = 'http://ec2-13-126-51-246.ap-south-1.compute.amazonaws.com:3001/v1/auth/';
const baseUrl = 'http://bingemeee.com:3001/v1/auth/';

export function login(username: string, password: string) {
    return axios.post(baseUrl+ 'login',{
      name:username,
      password: password
      })
}


export function getUserDetails() {
  return axios.get(`http://bingemeee.com:3001/v1/users/`, 
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  });
}

export function uploadPhoto (formdata: any){
  return axios.post(`http://bingemeee.com:3001/v1/users/uploadphoto`, 
  formdata,
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  });
}

export function signup(name: string,email:string, password: string, fullName: string) {
    return axios.post(baseUrl+ 'register',{
        "name": name,
        "email": email,
        "password": password,
        fullName: fullName
      });
}


export function getHomeDetailsByUsername (username: String){
  return axios.get('http://bingemeee.com:3001/v1/users/public?username='+ username);
  // return axios.get('http://ec2-13-126-51-246.ap-south-1.compute.amazonaws.com:3001/v1/users/public?username='+ username);
}