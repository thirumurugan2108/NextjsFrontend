import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { modalStyle, imageLoader } from '../../../utils/common/commonUtil';
import styles from "./paymentDetails.module.scss"
import { createPayment, verifyPayment } from "../../../utils/services/payment.service"
import { TextareaAutosize } from "@mui/material";

import MuiAlert from '@mui/material/Alert';
import * as Yup from 'yup';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



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
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, { })
    const [data, setData] = useState(undefined);
    const [isPaymentMode, setisPaymentMode] = useState(true);
    const [errors, setErrors] = useState([]);
    const [isCardSuccess, setCardSuccess] = useState(false);
    // used for image handling
    const [naturalWidth, setNaturalWidth] = useState(0);
    const [naturalHeight, setNaturalHeight] = useState(0);
    const [paymentMade, setPaymentMade] = useState(false)
    // schema to valiadte user entering details before payment
    let validationSchema = Yup.object({comments: Yup.string().required('please enter comments ')});
    
    const onChange = (e) => {
        dispatch({ type: "generic", field: e.target.name, value: e.target.value });
    };

    // useEffect(() => {
    //     if (data) {
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
        console.log(res)
        if (!res) {
            return;
        }
        // Make API call to the serverless API
        const data = await createPayment(props.username, props.productid, props.isCard);
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            // name: "Manu Arora Pvt Ltd",
            currency: 'INR',
            amount: data.data.price,
            order_id: data.data.id,
            // description: "Thankyou for your test donation",
            // image: "https://manuarora.in/logo.png",
            handler: async function (response) {
                // Validate payment at server - using webhooks is a better idea.
                verifyPayment({
                    orderCreationId: data.data.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    buyerDetails: {
                        ...state,
                        buyerName:props.loggedInUser.name, 
                        buyerPhoneNumber: props.loggedInUser.mobile, 
                        buyerEmailId: props.loggedInUser.email
                    },
                    productDetails: {
                        username: props.username,
                        productid: props.productid
                    },
                    isCard: props.isCard
                }).then(data => {
                    // router.push('../login');
                    // props.handleclose();
                    setisPaymentMode(false);
                    if (props.isCard) {
                        setCardSuccess(true)
                    }
                    if (!data.data.isVideo) {
                        dispatch({ type: "generic", field: 'imageUrl', value: data.data.fileurl });
                    } else {
                        dispatch({ type: "generic", field: 'videoUrl', value: data.data.fileurl });
                    }
                    props.handlePaymentComplete(props.productid)
                    setPaymentMade(true)
                    
                }).catch(err => {
                });
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
        if (options.key.indexOf('rzp_test_') !== -1) {
            delete options.order_id
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
    if (props.open && !props.isCard) {
       makePayment(state)
    }
    const proceed = () => {
        validationSchema.validate(state, { abortEarly: false })
      .catch((err) => {
        err.name; // => 'ValidationError'
        err.errors; // => [{ key: 'field_too_short', values: { min: 18 } }]
        setErrors(err.errors);
      })
      .then((valid) => {
          if(valid) {
              makePayment(state);
          }
      });
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
        setCardSuccess(false);
        props.handleclose(paymentMade);
    }

    const ErrorMessage = () => {
        if (errors.length !== 0) {
          return (
            <Alert severity="error" >
              {errors.map(data => {
                return (<li>{data}</li>)
              })}
            </Alert>
          )
        } else {
          return <></>
        }
      }

    const getImageSize = (imageObj) => {
        setNaturalWidth(imageObj.naturalWidth);
        setNaturalHeight(imageObj.naturalHeight);
    }
    return (
        <>
            <div>

                {props.isCard && <Modal
                    open={props.open}
                    onClose={onClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={modalStyle}>
                        {isPaymentMode && props.isCard &&
                            <>
                                {<ErrorMessage></ErrorMessage>}
                                <h2 className={styles.userHeading}>Enter Comments for Influencer</h2>
                                <label htmlFor="comments">Comments :</label>
                               
                                <TextareaAutosize
                                    aria-label="comments"
                                    id="comments"
                                    name="comments"
                                    minRows={3}
                                    placeholder="Comments for influencer"
                                    onChange={(e) => onChange(e)}
                                    style={{ width: '100%' }}
                                />
                                <span className={styles.comments}>Enter comments to know more about you. eg. your social profile url, valid mobile etc. Infulencer may contact you in the given details.</span>
                                <div>
                                    <Button onClick={() => proceed()}>Proceed</Button>
                                </div>
                            </>

                        }
                        {state.imageUrl &&
                            <>
                                <Image
                                    loader={imageLoader}
                                    src={state.imageUrl}
                                    alt="Picture of the author"
                                    onLoadingComplete={getImageSize}
                                    width={naturalWidth}
                                    height={naturalHeight}
                                    layout="responsive"
                                // height={500}
                                />
                                {/* <button onClick={download}>Download</button> */}
                            </>
                        }

                        {state.videoUrl &&
                            <>
                                <video
                                    src={state.videoUrl}
                                    autoPlay
                                    controls
                                    controlsList="nodownload"
                                    className={styles.video}
                                    alt="Picture of the author"
                                />
                                {/* <button onClick={download}>Download</button> */}
                            </>
                        }
                        {isCardSuccess &&
                            <h2>Your order has been placed successfully . Influencer will contact you soon!</h2>
                        }
                    </Box>
                </Modal>}
                {paymentMade && !props.isCard && <Modal
                    open={props.open}
                    onClose={onClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        {state.imageUrl &&
                            <>
                                <Image
                                    loader={imageLoader}
                                    src={state.imageUrl}
                                    alt="Picture of the author"
                                    onLoadingComplete={getImageSize}
                                    width={naturalWidth}
                                    height={naturalHeight}
                                    layout="responsive"
                                // height={500}
                                />
                                {/* <button onClick={download}>Download</button> */}
                            </>
                        }

                        {state.videoUrl &&
                            <>
                                <video
                                    src={state.videoUrl}
                                    autoPlay
                                    controls
                                    controlsList="nodownload"
                                    className={styles.video}
                                    alt="Picture of the author"
                                />
                                {/* <button onClick={download}>Download</button> */}
                            </>
                        }
                        {isCardSuccess &&
                            <h2>Your order has been placed successfully . Influencer will contact you soon!</h2>
                        }
                    </Box>
                </Modal>}
            </div>
        </>
    );
};

export default PaymentDetails;
