import React, { useEffect, useState } from "react";
import Layout from "../../src/components/layout";
import styles from './service-history.module.scss';
import Image from 'next/image';

import Paid from '../../assets/images/paid.svg';
import Balance from '../../assets/images/balance.svg';
import UserCircle from '../../assets/images/round-user.png';

import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';

import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import { useReducer } from "react";
import { getpaymentdetailsByUser, updatePaymentStatus } from "../../utils/services/payment.service";

import ModalComponent from '../../components/Modal'
import StatusCnfModal from '../../components/StatusCnf'
import { modalStyle, imageLoader } from '../../utils/common/commonUtil';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  'min-width': 370,
  'max-width': 700,
  borderRadius: 4,
  bgcolor: 'background.paper',
  boxShadow: 4,
  p: 2,
};

const initialState = {

};

function reducer(state, action) {
  switch (action.type) {
    case "getModalData":
      return {
        ...state,
        userModalData: action.payload
      };
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

const ServiceHistory = (_props) => {
  const [isDisplayModal, setdisplayModal] = useState(false);
  const [isStatusChanged, setStatusChanged] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [statusCnfModalOpen, setStatusCnfModalOpen] = useState(false)

  const fetchAllDetails = async () => {
    const paymentDetails = await getpaymentdetailsByUser();
    dispatch({
      type: 'fetchfromdb',
      payload: {
        paymentDetails: paymentDetails.data,
        username: paymentDetails.data.username,
        totalRevenue: paymentDetails.data.totalRevenue,
        paid: paymentDetails.data.paid,
        balance: paymentDetails.data.balance,
      }
    })
  }
  useEffect(async () => {
    await fetchAllDetails();
  }, [])

  const viewUserDetailsModal = (data, index) => {
    dispatch({
      type: "getModalData", payload: {
        index,
        ...data
      }
    });
    setdisplayModal(true);
  };

  const statusChange = (e) => {
    const id = e.target.id.replace('status-', '')
    const currentStatus = e.target.value

    updatePaymentStatus(id, currentStatus);
  }

  
  const hideUserDetailsModal = () => {
    setdisplayModal(false);
    setStatusChanged(false);
    dispatch({ type: "getModalData", payload: null });
  }

  const onStatusChange = (e, data) => {
    if (data.status === e.target.value) {
      setStatusChanged(false);
    } else {
      dispatch({
        type: "getModalData", payload: {
          ...state.userModalData,
          status: e.target.value
        }
      });
      setStatusChanged(true);
    }
  };

  const handleStsCnfClose = (e) => {
    setStatusCnfModalOpen(false)
    setStatusChanged(false);
    setdisplayModal(false)
  }

  const saveStatusConf = async () => {
    setStatusCnfModalOpen(true)
  }
  const saveSatus = async () => {
    // save the status to backend..call the service here
    setStatusCnfModalOpen(false)
    if (isStatusChanged && state.userModalData.id) {
      await updatePaymentStatus(state.userModalData.id, state.userModalData.status);
    }
    setStatusChanged(false);
    await fetchAllDetails();
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h3 id={styles.head1}>Hi {state?.username}</h3>
        <h2 id={styles.head2}>Welcome Back!</h2>
        <div className={styles.total}>
          <div className={styles.label}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wallet" className="svg-inline--fa fa-wallet fa-w-16"
              role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 450">
              <path fill="currentColor" d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path>
            </svg>
            Total Revenue
          </div>
          <div className={styles.value}>
            <span className={styles.symbol}>₹</span>
            <span className={styles.inr}>{state?.totalRevenue}</span>
          </div>
        </div>

        <div className={styles.total}>
          <div className={styles.label}>
            <Balance />
            Balance
          </div>
          <div className={styles.value}>
            <span className={styles.symbol}>₹</span>
            <span className={styles.inr}>{state?.balance}</span>
          </div>
        </div>

        <div className={styles.total}>
          <div className={styles.label}>
            <Paid />
            Paid
          </div>
          <div className={styles.value}>
            <span className={styles.symbol}>₹</span>
            <span className={styles.inr}>{state?.paid}</span>
          </div>
        </div>


        {state.userModalData && <Modal
          open={isDisplayModal}
          onClose={hideUserDetailsModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >

          <Box sx={style}>

            <h1 style={{ textAlign: "center" }}>
              User details
            </h1>
            <div className={styles.modalContainer}>
              <span className={styles.labelModal}><b>Name</b>  </span>
              <span className={styles.modalValue}>{state.userModalData.buyerDetails.buyerName}</span>
              <span className={styles.labelModal}><b>Email Id</b></span>
              <span className={styles.modalValue}>{state.userModalData.buyerDetails.buyerEmailId}</span>
              <span className={styles.labelModal}><b>Contact</b></span>
              <span className={styles.modalValue}>{state.userModalData.buyerDetails.buyerPhoneNumber}</span>

              {state.userModalData.buyerDetails.comments && state.userModalData.buyerDetails.comments !== '' && <>
                <span className={styles.labelModal}><b>Comments</b></span>
                <span className={styles.modalValue}>{state.userModalData.buyerDetails.comments}</span>

                <span className={styles.labelModal}><b>Product Title</b></span>
                <span className={styles.modalValue}>{state.userModalData.productDetails.title}</span>

                <span className={styles.labelModal}><b>Product Description</b></span>
                <span className={styles.modalValue}>{state.userModalData.productDetails.description}</span>
              </>}

              <span className={styles.labelModal}><b>Status</b>
              </span>
              <NativeSelect
                defaultValue={state.userModalData.status}
                className={styles.dropdown}
                inputProps={{
                  name: 'status',
                  id: 'uncontrolled-native',
                }}
                onChange={(e) => onStatusChange(e, state.userModalData)}
              >
                <option value={'pending'}>Pending</option>
                <option value={'success'}>Success</option>

              </NativeSelect>
            </div>

            <div>
              <Button variant="outlined" onClick={hideUserDetailsModal}  >Cancel</Button>
              <Button variant="outlined" className={styles.save} onClick={saveStatusConf}>Save</Button>
            </div>


          </Box>

        </Modal>}

        {state.paymentDetails?.pendingJobs && <h2 id={styles.head3}>Pending</h2>}

        {state.paymentDetails?.pendingJobs && state.paymentDetails?.pendingJobs.map((data, index) => {
          const buyerDetails = data.buyerDetails;
          return (
            <div onClick={() => viewUserDetailsModal(data, index)}
              className={styles.pendingItem}>
         
              <div className={styles.image}>
                <Image src={UserCircle} width="50px" height="50px" />
              </div>
              <div className={styles.name} >
                <h3>{buyerDetails.buyerName}</h3>
                <p className={styles.statusPending}>
                  {data.status}</p>
              </div>
              <div className={styles.price}>

                + {data.productDetails.price}
              </div>

            </div>)
        }
        )}

        {state.paymentDetails?.successJobs?.length != 0 && <h2 id={styles.head3}>Success</h2>}

        {state.paymentDetails?.successJobs && state.paymentDetails?.successJobs.map((data, index) => {
          const buyerDetails = data.buyerDetails;
          return (
            <div onClick={() => viewUserDetailsModal(data, index)}
              className={styles.pendingItem}>
     
              <div className={styles.image}>
                <Image src={UserCircle} width="50px" height="50px" />
              </div>
              <div className={styles.name} >
                <h3>{buyerDetails.buyerName}</h3>
                <p className={styles.statusSuccess}>
                  {data.status}</p>
              </div>
              <div className={styles.price}>
                + {data.productDetails.price}
              </div>

            </div>) 
        }
        )}
        {statusCnfModalOpen &&
        <ModalComponent open={statusCnfModalOpen} onClose={handleStsCnfClose} modalStyle={modalStyle} >
          <StatusCnfModal confirmation={saveSatus} close={handleStsCnfClose} />
        </ModalComponent>}
      </div>
    </Layout>
  );
};

export default ServiceHistory;