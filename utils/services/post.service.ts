import axios from "axios";
import { Post } from "../models/post.model";

const baseUrl = 'http://localhost:3001/v1/posts/';

export function createPost(post:any) {
    axios.post(baseUrl, post,
    {
      headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTcyNGIxNzdjN2FjYzVmZjBhMTZhYTkiLCJpYXQiOjE2MzUwNjgyNDksImV4cCI6MTYzNTA3MDA0OSwidHlwZSI6ImFjY2VzcyJ9.Omh2fWCGFor7Ui6bEicuGAHhmsEKs2IIB2eJb3YRMR0'
      }
    }).catch(e => console.log(e));
}

export function getAllpostImages() {
  return axios.get(baseUrl, 
    {
      headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTcyNGIxNzdjN2FjYzVmZjBhMTZhYTkiLCJpYXQiOjE2MzUwNjgyNDksImV4cCI6MTYzNTA3MDA0OSwidHlwZSI6ImFjY2VzcyJ9.Omh2fWCGFor7Ui6bEicuGAHhmsEKs2IIB2eJb3YRMR0'
      }
    });
}

export function upsertPost(post:Post){
  axios.post(baseUrl+'uploadImages', post,
    {
      headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTcyNGIxNzdjN2FjYzVmZjBhMTZhYTkiLCJpYXQiOjE2MzUwNjgyNDksImV4cCI6MTYzNTA3MDA0OSwidHlwZSI6ImFjY2VzcyJ9.Omh2fWCGFor7Ui6bEicuGAHhmsEKs2IIB2eJb3YRMR0'
      }
    }).catch(e => console.log(e));
}