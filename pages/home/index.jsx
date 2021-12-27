import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './home.module.scss'
import { createPayment} from '../../utils/services/payment.service'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function About() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await createPayment();
    console.log(data);
    var options = {
      key: 'rzp_test_6mQa7wgUCs49Is', // Enter the Key ID generated from the Dashboard
      name: "Manu Arora Pvt Ltd",
      currency: 'INR',
      amount: 50000,
      order_id: data.data.id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        // name: "thiru",
        // email: "thiru2108@gmail.com",
        // contact: "9999999999",
      },
      notes: {
          address: "Soumya Dey Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h5 className={styles.title}>WELCOME TO MY OFFICIAL WEBSITE</h5>
        <p className={styles.subTitle} >CHECK OUT MY EXCLUSIVE PHOTOS AND VIDEOS</p>

        <div className={styles.contentSection}>
          <div className={styles.profileIconOuter}>
            <div className={styles.profileIconInner}>

            </div>

          </div>
          <h3>Elon Musk </h3>
          <p className={styles.connect}>Let's Connect</p>
          <div className={styles.slot}>

            <div className={styles.around}>
              <h4>DM on Instagram</h4>
              <p className={styles.chatContent}>Lets chat instagram for 10mins</p>
              <text>Rs:400</text>
            </div>

            <div className={styles.align}>

              <a onClick={handleOpen}>Booknow</a>
            </div>
          </div>
          <div className={styles.parentScroll}>
            <span className={styles.scroll}>
              <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
              </svg>

              <a className={styles.unlock}>Unlock</a>
            </span>

            <span className={styles.scroll}>
              <div>
                <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                  <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
                </svg>
                <a className={styles.unlock}>Unlock</a>
              </div>
            </span>
            <span className={styles.scroll}>
              <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
              </svg>
              <a className={styles.unlock}>Unlock</a>
            </span>

            <span className={styles.scroll}>
              <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
              </svg>
              <a className={styles.unlock}>Unlock</a>
            </span>
            <span className={styles.scroll}>
              <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
              </svg>
              <a className={styles.unlock}>Unlock</a>
            </span>

            <span className={styles.scroll}>
              <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
              </svg>
              <a className={styles.unlock}>Unlock</a>
            </span>
          </div>
        </div>


      </div>

      <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <label htmlFor="name_payment">Name :</label>
          <input type="text" id="name_payment" placeholder='name'/>

          <label htmlFor="phonenumber_payment">Phone number :</label>
          <input type="text" id="name_payment" placeholder='phonenumber'/>

          <label htmlFor="email_payment">Email :</label>
          <input type="text" id="email_payment" placeholder='email'/>
          <div>
            <Button onClick={() => makePayment()}>Proceed</Button>
          </div>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
    </div>
  );
}
