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

export function getInfluencers() {
  return axios.get(`${baseUrl}users/getInfluencers`, 
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      userRole: ''+sessionStorage.getItem('role')
    }
  });

}

export function changePassword (data: any) {
  return axios.post(`${baseUrl}auth/changepassword`, 
  data,
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      infLoginAs: ''+sessionStorage.getItem('loginAs'),
      userRole: ''+sessionStorage.getItem('role')
    }
  });
}

export function getUserDetails() {
  return axios.get(`${baseUrl}users/`, 
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      infLoginAs: ''+sessionStorage.getItem('loginAs'),
      userRole: ''+sessionStorage.getItem('role')
    }
  });
}

export function uploadPhoto (formdata: any){
  return axios.post(`${baseUrl}users/uploadphoto`, 
  formdata,
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      infLoginAs: ''+sessionStorage.getItem('loginAs'),
      userRole: ''+sessionStorage.getItem('role')
    }
  });
}

export function uploadCoverPhoto (formdata: any){
  console.log("uploadCoverPhoto")
  return axios.post(`${baseUrl}users/uploadCoverphoto`, 
  formdata,
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      infLoginAs: ''+sessionStorage.getItem('loginAs'),
      userRole: ''+sessionStorage.getItem('role')
    }
  });
}
export function userLogin(email:string) {
  return axios.post(baseUrl+ 'auth/userLogin',{
      "email": email,
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

export function verifySignupOTP(otp: string, email: string) {
  return axios.post(baseUrl+ 'auth/registerVerifyOtp',{
      otp,
      email,
    });
}

export function verifyOTP(otp: string, email: string) {
  return axios.post(baseUrl+ 'auth/VerifyOtp',{
      otp,
      email,
    });
}

export async function userSignUp(name: string,email:string, mobile:string, influencer: string) {
  return await axios.post(baseUrl+ 'auth/userRegister',{
      name,
      email,
      mobile,
      influencer,
    });
}


export function getHomeDetailsByUsername (query:any){
  let token = ''
  if (query.token) {
    token = `&token=${query.token}`
  }
  return axios.get(`${baseUrl}users/public?username=${query.username}${token}`);
}