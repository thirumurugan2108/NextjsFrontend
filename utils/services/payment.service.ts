import axios from "axios";

const baseUrl = process.env.apiBaseUrl+'payment/';

export async function createPayment(username: String, id: String, isCard: Boolean) {
  return await axios.get(baseUrl + `?username=${username}&id=${id}&isCard=${isCard}`,
  ).catch(e => console.log(e));
}

export async function verifyPayment(paymentVerificationData: any) {
  return await axios.post(baseUrl, {
    ...paymentVerificationData
  },
  );
}

export function getAllpost(isVideo: Boolean) {
  return axios.get(baseUrl + '?isVideo=' + isVideo,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    });
}

export function getpaymentdetailsByUser() {
  return axios.get(baseUrl + 'paymentDetails',
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    });
}

export function updatePaymentStatus(id: String, status: String) {
  return axios.post(baseUrl + 'paymentDetails', {
    id: id,
    status: status
  },
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        infLoginAs: ''+sessionStorage.getItem('loginAs'),
        userRole: ''+sessionStorage.getItem('role')
      }
    });
}

export function createPaymentRequest (payload: any) {
  return axios.post(baseUrl + 'createOrder',payload);
}

export function storePaymentDetail(data: any) {
  return axios.post(baseUrl + 'storePaymentDetail',data);
}

export function getTransactionsByUser(data: any) {
  return axios.post(baseUrl + 'getTransactionsByUser', data,
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      infLoginAs: ''+sessionStorage.getItem('loginAs'),
      userRole: ''+sessionStorage.getItem('role')
    }
  });
}