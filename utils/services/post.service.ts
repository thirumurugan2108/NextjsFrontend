import axios from "axios";

const baseUrl = 'https://api.bingemeee.com/v1/posts/';
// const baseUrl = 'http://localhost:3001/v1/posts/';

export const updatePost = async (post:any) => {
    return await axios.post(baseUrl+ 'updatePost', post,
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

export const upsertPost = async(post:FormData) =>{
  return await axios.post(baseUrl+'uploadImages', post,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    }).catch(e => console.log(e));
}   