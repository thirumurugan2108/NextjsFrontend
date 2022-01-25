import axios from "axios";

// const baseUrl = 'http://ec2-13-126-51-246.ap-south-1.compute.amazonaws.com:3001/v1/auth/';
const baseUrl = 'http://localhost:3001/v1/auth/';

export function login(username: string, password: string) {
    return axios.post(baseUrl+ 'login',{
      name:username,
      password: password
      })
}

// export function signup(username: string,email:string, password: string) {
//     return axios.post(baseUrl+ 'register',{
//         "name": "fake name1",
//         "email": "fake@example.com",
//         "password": "password1"
//       });
// }


export function getHomeDetailsByUsername (username: String){
  return axios.get('http://ec2-13-126-51-246.ap-south-1.compute.amazonaws.com:3001/v1/users/public?username='+ username);
}