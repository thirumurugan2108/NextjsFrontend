import axios from "axios";
import { Post } from "../models/post.model";

const baseUrl = 'http://localhost:3001/v1/posts/';

export function createPost(post:any) {
    axios.post(baseUrl, post,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).catch(e => console.log(e));
}

export function getAllpostImages() {
  return axios.get(baseUrl, 
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
}

export function upsertPost(post:Post){
  axios.post(baseUrl+'uploadImages', post,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).catch(e => console.log(e));
}   