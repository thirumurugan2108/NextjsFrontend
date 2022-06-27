import axios from "axios";

const baseUrl = process.env.apiBaseUrl+'posts/';

export const updatePost = async (post:any) => {
    return await axios.post(baseUrl+ 'updatePost', post,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    }).catch(e => console.log(e));
}

export function getAllpost() {
  return axios.get(baseUrl, 
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    });
}

export const deletePost = async (uuid:any) => {
  return await axios.delete(`${baseUrl}/deletePost/${uuid}`,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    }).catch(e => console.log(e));
}

export const upsertPost = async(post:FormData) =>{
  return await axios.post(baseUrl+'uploadImages', post,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role'),
        "Content-Type": 'multipart/form-data'
      }
    }).catch(e => console.log(e));
}   