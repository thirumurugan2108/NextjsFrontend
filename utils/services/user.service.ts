import axios from "axios";

const baseUrl = process.env.apiBaseUrl;

export function login(username: string, password: string) {
    return axios.post(baseUrl+ 'auth/login',{
      name:username,
      password: password
      })
}

export function logout() {
  return axios.post(baseUrl+ 'auth/logout',{
    refreshToken:sessionStorage.refreshToken
    })
}


export function getUserDetails() {
  return axios.get(`${baseUrl}users/`, 
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  });
}

export function uploadPhoto (formdata: any){
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
  return axios.get(`${baseUrl}users/public?username=`+ username);
}