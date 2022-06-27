import axios from "axios";

const baseUrl = process.env.apiBaseUrl+'cards/';

export function getcardDetails() {
  return axios.get(baseUrl,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    })
}


export function updateCardDetails(postData:any) {
  return axios.patch(baseUrl,
    postData,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    })
}

export function deleteCardById(id:any) {
  return axios.post(baseUrl + 'deleteCard',
    {
      id: id
    },
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    })
}

export function createCardDetails(postData:any) {
  return axios.post(baseUrl,
    postData,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    })
}


