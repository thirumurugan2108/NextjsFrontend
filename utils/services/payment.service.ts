import axios from "axios";

// const baseUrl = 'http://ec2-13-126-51-246.ap-south-1.compute.amazonaws.com:3001/v1/payment/';
const baseUrl = 'http://localhost:3001/v1/payment/';

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
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
}

export function getpaymentdetailsByUser() {
  return axios.get(baseUrl + 'paymentDetails',
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
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
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
}