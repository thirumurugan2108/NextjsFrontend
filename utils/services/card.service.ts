import axios from "axios";

const baseUrl = 'https://api.bingemeee.com/v1/auth/';
// const baseUrl = 'http://localhost:3001/v1/cards/';

export function getcardDetails() {
  return axios.get(baseUrl,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
}


export function updateCardDetails(postData:any) {
  return axios.patch(baseUrl,
    postData,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
}


