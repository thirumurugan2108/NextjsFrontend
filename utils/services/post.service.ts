import axios from "axios";

const baseUrl = 'http://localhost:3001/v1/posts/';

export function updatePost(post:any) {
    axios.post(baseUrl+ 'updatePost', post,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    }).catch(e => console.log(e));
}

export function getAllpost() {
  return axios.get(baseUrl, 
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
}

export function upsertPost(post:FormData){
  axios.post(baseUrl+'uploadImages', post,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    }).catch(e => console.log(e));
}   