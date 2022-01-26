import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from "./paymentDetails.module.scss"
import { createPayment, verifyPayment } from "../../../utils/services/payment.service"

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

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

function reducer(state, action) {
    switch (action.type) {
        case "fetchfromdb":
            return {
                ...action.payload,
            };
        case "generic":
            return {
                ...state,
                [action.field]: action.value,
            };
        default:
            return {
                ...state,
            };
    }
}

const PaymentDetails = (props) => {
    const [state, dispatch] = useReducer(reducer, {});
    const [data, setData] = useState(undefined);
    const [isPaymentMode, setisPaymentMode] = useState(true);

    const router = useRouter()

    const onChange = (e) => {
        dispatch({ type: "generic", field: e.target.name, value: e.target.value });
    };

    // useEffect(() => {
    //     if (data) {
    //       console.log(data);
    //     //   dispatch({ type: 'fetchfromdb', payload: data.data });
    //     router.push('login');
    //     }
    //   }, [data]);

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

    const makePayment = async (buyerDetails) => {

        const res = await initializeRazorpay();

        if (!res) {
            console.log("Razorpay SDK Failed to load");
            return;
        }

        // Make API call to the serverless API
        const data = await createPayment(props.username, props.productid, props.isCard);
        var options = {
            key: 'rzp_test_6mQa7wgUCs49Is', // Enter the Key ID generated from the Dashboard
            name: "Manu Arora Pvt Ltd",
            currency: 'INR',
            amount: data.data.price,
            order_id: data.data.id,
            description: "Thankyou for your test donation",
            image: "https://manuarora.in/logo.png",
            handler: async function (response) {
                // Validate payment at server - using webhooks is a better idea.
                verifyPayment({
                    orderCreationId: data.data.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    buyerDetails: {
                        ...state
                    },
                    productDetails: {
                        username: props.username,
                        productid: props.productid
                    },
                    isCard: props.isCard
                }).then(data => {
                    // router.push('../login');
                    console.log(data)
                    console.log(data.data.fileurl);
                    // props.handleclose();
                    setisPaymentMode(false);
                    if (!data.data.isVideo) {
                        dispatch({ type: "generic", field: 'imageUrl', value: data.data.fileurl });
                    } else {
                        dispatch({ type: "generic", field: 'videoUrl', value: data.data.fileurl });
                    }
                }).catch(err => {
                    console.log(err);
                });
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);
            },
            prefill: {
                name: buyerDetails.buyerName,
                email: buyerDetails.buyerEmailId,
                contact: buyerDetails.buyerPhoneNumber,
            },
            // notes: {
            //   address: "Soumya Dey Corporate Office",
            // },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const proceed = () => {
        makePayment(state);
    }

    const download = () => {
        var element = document.createElement("a");
        var file = new Blob(
            [
                state.fileurl
            ],
            { type: "*" }
        );
        element.href = URL.createObjectURL(file);
        element.download = "image";
        element.click();
    };

    const onClose = () => {
        setisPaymentMode(true)
        state.imageUrl = '';
        state.videoUrl = '';
        props.handleclose();
    }

    return (
        <>
            <div>
                <Modal
                    open={props.open}
                    onClose={onClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {isPaymentMode &&
                            <>
                                <label htmlFor="buyerName">Name :</label>
                                <input type="text" id="buyerName" name="buyerName" placeholder='insta Id' onChange={(e) => onChange(e)} />

                                <label htmlFor="buyerPhoneNumber">Phone number :</label>
                                <input type="number" id="buyerPhoneNumber" name='buyerPhoneNumber' placeholder='phonenumber' onChange={(e) => onChange(e)} />

                                <label htmlFor="buyerEmailId">Email :</label>
                                <input type="text" id="buyerEmailId" name="buyerEmailId" placeholder='email' onChange={(e) => onChange(e)} />
                                <div>
                                    <Button onClick={() => proceed()}>Proceed</Button>
                                </div>
                            </>
                        }
                        {state.imageUrl &&
                            <>
                                <Image
                                    loader={myLoader}
                                    src={state.imageUrl}
                                    alt="Picture of the author"
                                    width={500}
                                    height={500}
                                />
                                {/* <button onClick={download}>Download</button> */}
                            </>
                        }

                        {state.videoUrl &&
                            <>
                                <video
                                    src={state.videoUrl}
                                    autoPlay
                                    className={styles.video}
                                    alt="Picture of the author"
                                />
                                {/* <button onClick={download}>Download</button> */}
                            </>
                        }
                        <div className={styles.videoContainer}>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default PaymentDetails;
