import React, { useState } from "react";
import Layout from "../../src/components/layout";
import styles from './service-history1.module.scss';
import styles1 from "./card.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook} from "@fortawesome/free-brands-svg-icons";
import { faGooglePlusSquare} from "@fortawesome/free-brands-svg-icons";
import { faInstagram} from "@fortawesome/free-brands-svg-icons";
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import { useReducer } from "react";
import { borderRadius } from "@mui/system";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius:4,
  bgcolor: 'background.paper',
  boxShadow: 4,
  p: 4,
};

const initialState = {
  cardList: [{
    "title": "DM on Instagram",
    "price": 400,
    "description": "Lets chat instagram for 10mins",
    "isEditMode": false
  }]
};

function reducer(state, action) {
  switch (action.type) {
    case "editToggle":
      return {
        ...state,
        cardlist: state.cardList.map((data, index) => {
          if (index === action.index) {
            data.isEditMode = action.isEdit;
          }
          return data;
        })
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
  const [fileName, setfileName] = useState();
  const [isDisplayModal, setdisplayModal] = useState(false);
  const [isStatusEditable, setStatusEditabe] = useState(false);
  const [isCardEditMode, setisCardEditMode] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  async function onFileChange(event) {
    // setSelectedFile(event.target.files[0]);
    setfileName(event.target.files[0].name);


    // props.updateFile(event);
  }

  const onEdit = (index) => {
    dispatch({ type: "editToggle", index: index, isEdit: true })
  }

  const onEditCancel = (index) => {
    dispatch({ type: "editToggle", index: index, isEdit: false })
  }

  const onCardSubmit = (index) => {
    dispatch({ type: "editToggle", index: index, isEdit: true })
  }

  const viewDetails = () => {
    console.log('view');
    setdisplayModal(true);
  };


  const editStatus = () => {
    setStatusEditabe(true);
  };

  const hideDetails = () => {
    setdisplayModal(false);
  }

  const saveSatus = () => {
    setStatusEditabe(false);
    // save the status to backend..call the service here
  }


  const cancelStatus = () => {
    setStatusEditabe(false);
  }

  return (
    <Layout>
      <div className={styles.container}>
        <p id={styles.head1}>Hi Names</p>

        <h2 id={styles.head2}>Welcome Back!</h2>
        <div id={styles.total}><h3>Total Revenue</h3><p>INR : 65478</p><a href="https://icons8.com/icon/26138/next-page"><img src="https://img.icons8.com/ios/50/000000/circled-chevron-right.png" /></a></div>
        <div id={styles.bal}><h3>Balance</h3><p>INR : 9872</p><a href="https://icons8.com/icon/26138/next-page"><img src="https://img.icons8.com/ios/50/000000/circled-chevron-right.png" /></a></div>
        <div id={styles.paid}><h3>Paid</h3><p>INR : 7654  </p><a href="https://icons8.com/icon/26138/next-page"><img src="https://img.icons8.com/ios/50/000000/circled-chevron-right.png" /></a></div>
        <h2 id={styles.head3}>Pending</h2>

        <div id={styles.detail}>

          <div className={styles.column} >
            <h3>Thirumurugan</h3>
            <p>INR:400</p>
          </div>
          <div className={styles.column}>
            {!isStatusEditable && <h3>Status:Pending</h3>}
            {isStatusEditable && <select name="status" id="status">
              <option value="pending">pending</option>
              <option value="success">success</option>
            </select>
            }
            <p >
            {!isStatusEditable &&  <button style={{marginRight:5}}onClick={editStatus}>edit</button>}
            {isStatusEditable &&  <button  style={{marginRight:5}}onClick={saveSatus}>save</button>}
            {!isStatusEditable && <button style={{marginRight:5}} onClick={viewDetails}>View</button>}
            {isStatusEditable && <button  style={{marginRight:5}}onClick={cancelStatus}>Cancel</button>}
            </p>
          </div>
        </div>


        <Modal
          open={isDisplayModal}
          onClose={hideDetails}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
         
          <Box sx={style}>
          
          <div id={styles1.cardloginContainer}>
    <div className={styles1.cardprofileImg}></div>
    
   
    <h1>
      Zanti
    </h1>
    <div className={styles1.cardsocial}>
      
    <a><FontAwesomeIcon icon={faFacebook}>
    </FontAwesomeIcon></a>
    <a><FontAwesomeIcon icon={faGooglePlusSquare}>
    </FontAwesomeIcon></a>
    <a><FontAwesomeIcon icon={faInstagram}>
    </FontAwesomeIcon></a>
    
    </div>
    <button id={styles1.button}><FontAwesomeIcon icon={faPhone}>
    </FontAwesomeIcon>
      </button>
        
    <button id={styles1.button}>Message</button>
  </div>

          </Box>
        </Modal>
      </div>
    </Layout>
  );
};

export default ServiceHistory;
