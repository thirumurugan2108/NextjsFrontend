import axios from "axios";

const baseUrl = process.env.apiBaseUrl+'subscription/';

export const setSubscription = async (post:any) => {
  return await axios.post(baseUrl+ 'update', post,
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      infLoginAs: ''+sessionStorage.getItem('loginAs'),
      userRole: ''+sessionStorage.getItem('role')
    }
  }).catch(e => console.log(e));
}

export const getSubscriptionDetails = async (influencer: any) => {
  return await axios.get(baseUrl+ '?influencer=' + influencer,
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      infLoginAs: ''+sessionStorage.getItem('loginAs'),
      userRole: ''+sessionStorage.getItem('role')
    }
  }).catch(e => console.log(e));
}

export const disableSubscriptionStatus = async (post:any) => {
  return await axios.post(baseUrl+ 'disable', post,
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      infLoginAs: ''+sessionStorage.getItem('loginAs'),
      userRole: ''+sessionStorage.getItem('role')
    }
  }).catch(e => console.log(e));
}