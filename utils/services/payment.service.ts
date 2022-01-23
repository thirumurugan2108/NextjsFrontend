import axios from "axios";

const baseUrl = 'http://ec2-13-126-51-246.ap-south-1.compute.amazonaws.com:3001/v1/payment/';

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
