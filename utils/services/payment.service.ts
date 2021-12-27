import axios from "axios";
import { Post } from "../models/post.model";

const baseUrl = 'http://localhost:3001/v1/payment/';

export async function createPayment() {
    return await axios.get(baseUrl,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).catch(e => console.log(e));
}

export function getAllpost(isVideo: Boolean) {
  return axios.get(baseUrl+'?isVideo='+ isVideo, 
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