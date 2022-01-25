import {useState, useReducer, useEffect} from 'react';
import { useRouter } from "next/router";
import React from "react";
import useSWR from 'swr'

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
  buyerEmailId: ''
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
  const [open, setOpen] = useState(false);
  const [payableProductId, setPayableProductId] = useState('');
  const [isCard, setIsCard] = useState(false);

  const handleOpen = (productId, isCard) => {
    setPayableProductId(productId);
    setOpen(true)
    setIsCard(isCard);
  };

  const handleClose = () => {
    setOpen(false)
  };

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
      dispatch({ type: 'fetchfromdb', payload: data.data });
    }
  }, [data]);

  const onChange = (e) => {
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };


  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h5 className={styles.title} >{query.test}WELCOME TO MY OFFICIAL WEBSITE</h5>
        <p className={styles.subTitle} >CHECK OUT MY EXCLUSIVE PHOTOS AND VIDEOS</p>

        <div className={styles.contentSection}>
          <div className={styles.profileIconOuter}>
            <div className={styles.profileIconInner}>
            </div>
          </div>
          <h3>{state?.user?.name}</h3>
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
          <h4 className={styles.subHeading}>Images</h4>
          <div className={styles.parentScroll}>
            {state.images && state.images.map((data, index) => {
              return (
                <div key={index.toString()}>
                  <div className={styles.scroll}>
                    <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                      <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
                    </svg>

                    <p className={styles.unlock} onClick={() => handleOpen(data.id, false)}>Unlock ₹{data.price}</p>
                  </div>
                  <p className={styles.imgTitle}>{data.title}</p>
                </div>
              )
            }
            )}
          </div>

          <h4 className={styles.subHeading}>Videos</h4>
          <div className={styles.parentScroll}>
            {state.videos && state.videos.map((data, index) => {
              return (
                <div key={index.toString()}>
                  <div className={styles.scroll}>
                    <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                      <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
                    </svg>

                    <p className={styles.unlock} onClick={() => handleOpen(data.id, false)}>Unlock ₹{data.price}</p>
                  </div>
                  <p className={styles.imgTitle}>{data.title}</p>
                </div>
              )
            }
            )}
          </div>
        </div>


      </div>
      <Footer></Footer>

      <PaymentDetails handleclose={handleClose}
        open={open}
        productid={payableProductId}
        username={query.username}
        isCard={isCard}
        >
      </PaymentDetails>
    </div>
  );
}
