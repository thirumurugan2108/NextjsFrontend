import { useState, useReducer, useEffect } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image'
import React from "react";
import useSWR from 'swr'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { modalStyle, imageLoader } from '../../utils/common/commonUtil';
import styles from './home.module.scss'
import { getHomeDetailsByUsername } from '../../utils/services/user.service'
import PaymentDetails from '../../src/components/paymentDetails'
import Footer from '../../src/components/footer';


const fetcher = (query) => {
  if (query.username) {
    return getHomeDetailsByUsername(query.username);
  } else {
    return
  }
}



const initialState = {
  cardList: [],
  images: [],
  videos: [],
  buyerName: '',
  buyerPhoneNumber: '',
  buyerEmailId: '',
  user: {
    photoUrl: ''
  }
};

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


export default function About(ctx) {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [payableProductId, setPayableProductId] = useState('');
  const [isCard, setIsCard] = useState(false);
  const [isFreeProdcutOpen, setfreeProductOpen] = useState(false);
  const [openedProduct, setOpenedProduct] = useState({});
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);

  const handleOpen = (productId, isCard) => {
    setPayableProductId(productId);
    setIsPaymentOpen(true)
    setIsCard(isCard);
  };

  const handleClose = () => {
    setIsPaymentOpen(false)
  };

  const getImageSize = (imageObj) => {
    setNaturalWidth(imageObj.naturalWidth);
    setNaturalHeight(imageObj.naturalHeight);
  }

  const router = useRouter();
  const query = router.query;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, error } = useSWR(query, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  useEffect(() => {
    console.log(ctx);
    // console.log(post)
    // console.log(username)
    console.log(router.query)
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (!data.data.user.photoUrl) {
        data.data.user.photoUrl = 'https://bingmee1.s3.ap-south-1.amazonaws.com/profile/defaultprof.jpg';
      }
      dispatch({ type: 'fetchfromdb', payload: data.data });
    }
  }, [data]);

  const onChange = (e) => {
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  const onClose = () => {
    setfreeProductOpen(false);
    setOpenedProduct({});
  }


  const openFreeProduct = (data, isImage) => {
    setfreeProductOpen(true);
    setOpenedProduct({
      ...data, isImage
    });
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h5 className={styles.title} >{query.test}WELCOME TO MY OFFICIAL WEBSITE</h5>
        <p className={styles.subTitle} >CHECK OUT MY EXCLUSIVE PHOTOS AND VIDEOS</p>

        <div className={styles.contentSection}>
          <div className={styles.profileIconOuter}>
            <div className={styles.profileIconInner} style={{ backgroundImage: `url(${state.user?.photoUrl})` }}>
            </div>
          </div>
          <h3>{state?.user?.fullName}</h3>
          <p className={styles.subHeading}>Let's Connect</p>
          {state.cardList && state.cardList.map((data, index) => {
            return (
              <div className={styles.slot} key={index.toString()}>

                <div className={styles.around}>
                  <h4>{data.title}</h4>
                  <p className={styles.chatContent}>{data.description}</p>
                  <p>{data.price}</p>
                </div>

                <div className={styles.align}>

                  <a onClick={() => handleOpen(data.id, true)}>Booknow</a>
                </div>
              </div>
            )
          }
          )}
          {/* <div className={styles.slot}>

            <div className={styles.around}>
              <h4>DM on Instagram</h4>
              <p className={styles.chatContent}>Lets chat instagram for 10mins</p>
              <Text>Rs:400</Text>
            </div>

            <div className={styles.align}>

              <a onClick={handleOpen}>Booknow</a>
            </div>
          </div> */}
          {state.images?.length != 0 && <h4 className={styles.subHeading}>Images</h4>}
          <div className={styles.parentScroll}>
            {state.images && state.images.map((data, index) => {
              return (
                <>
                  <div key={index.toString()}>
                    <div className={styles.scroll}>
                      {data.isPaid === 'Yes' &&
                        <>
                          <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
                          </svg>

                          <p className={styles.unlock} onClick={() => handleOpen(data.id, false)}>Unlock ₹{data.price}</p>
                        </>

                      }

                      {data.isPaid === 'No' &&
                        <img
                          src={
                            data?.fileUrl
                          }
                          onClick={() => openFreeProduct(data, true)}

                          width="153"
                          className={styles.imgList}
                          height="160.5"
                        />
                      }
                    </div>
                    <p className={styles.imgTitle}>{data.title}</p>
                  </div>
                </>
              )
            }
            )}
          </div>

          {state.videos?.length != 0 && <h4 className={styles.subHeading}>Videos</h4>}
          <div className={styles.parentScroll}>
            {state.videos && state.videos.map((data, index) => {
              return (
                <>
                  <div key={index.toString()}>
                    <div className={styles.scroll}>
                      {data.isPaid === 'Yes' &&
                        <>
                          <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
                          </svg>

                          <p className={styles.unlock} onClick={() => handleOpen(data.id, false)}>Unlock ₹{data.price}</p>
                        </>

                      }

                      {data.isPaid === 'No' &&
                        <video
                          src={
                            data?.fileUrl
                          }
                          onClick={() => openFreeProduct(data, false)}
                          key={index.toString()}
                          width="153"
                          className={styles.imgList}
                          height="160.5"
                        />
                      }
                    </div>
                    <p className={styles.imgTitle}>{data.title}</p>
                  </div>
                </>
              )
            }
            )}
          </div>
        </div>


      </div>
      <Footer></Footer>

      <PaymentDetails handleclose={handleClose}
        open={isPaymentOpen}
        productid={payableProductId}
        username={query.username}
        isCard={isCard}
      >
      </PaymentDetails>

      <Modal
        open={isFreeProdcutOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <>
            {openedProduct.isImage && <Image
              loader={imageLoader}
              src={openedProduct.fileUrl}
              alt="Picture of the author"
              onLoadingComplete={getImageSize}
              width={naturalWidth}
              height={naturalHeight}
              layout="responsive"
            // height={500}
            />}

            {!openedProduct.isImage && 
              <video
              src={openedProduct.fileUrl}
              controls
              controlsList="nodownload"
              className={styles.video}
              alt="Picture of the author"
          />
            }
            {/* <button onClick={download}>Download</button> */}
          </>
        </Box>
      </Modal>
    </div>
  );
}
