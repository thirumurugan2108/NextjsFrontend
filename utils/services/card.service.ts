import axios from "axios";

const baseUrl = process.env.apiBaseUrl+'cards/';

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

export function createCardDetails(postData:any) {
  return axios.post(baseUrl,
    postData,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
}


