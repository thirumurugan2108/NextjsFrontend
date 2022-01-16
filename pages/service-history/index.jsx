import React, { useState } from "react";
import Layout from "../../src/components/layout";
import styles from './service-history.module.scss';

import { useReducer } from "react";
import { Card } from "../../utils/models/card.model";
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

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.main}>
          <p className={styles.username}>Hi Names</p>
          <h1 className={styles.welcome}>Welcome Back.</h1>
        </div>

        <ul className={styles.accountBalance}>
    <li>
      <p>Total Revenue</p>
      <p className={styles.price}>Rs.900</p>
    </li>
    <li>
    <p>Balance</p>
      <p className={styles.price}>Rs.900</p>
    </li>
    <li>
      <p>Paid</p>
      <p className={styles.price}>Rs.1000</p>
    </li>
        </ul>

        <table className={styles.accountsTable}>
          <thead>
            <th>username</th>
            <th>price</th>
            <th>status</th>
            <th>Edit</th>
          </thead>
          <tbody>
            <tr>
              <td> Mohan</td>
              <td> 400</td>
              <td> pending</td>
              <td> <button>edit</button></td>
            </tr>
            <tr>
              <td> Aashik</td>
              <td> 400</td>
              <td> pending</td>
              <td> <button>edit</button></td>
            </tr>
            <tr>
              <td> Santhosh</td>
              <td> 400</td>
              <td> pending</td>
              <td> <button>edit</button></td>
            </tr>

          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ServiceHistory;
