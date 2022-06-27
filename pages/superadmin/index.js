import { LoginSharp } from "@mui/icons-material";
import router from "next/router";
import React, {  useState, useEffect } from "react";
import Layout from "../../src/components/layout/influencer";
import { getInfluencers } from "../../utils/services/user.service";
import Styles from "./superadmin.module.scss"

const SuperAdminHome = ({referer}) => {
  const [influencers, setInfluencers] = useState([])
  const fetchAllDetails = async () => {
    const influencerDetails = await getInfluencers();
    if (influencerDetails.status == 200 && influencerDetails.data && !influencerDetails.data.status) {
      setInfluencers(influencerDetails.data)
      return true
    }
    else {
      return false
    }
  }
  const loginAs = (id, name, fullName) => {
    
    sessionStorage.setItem('loginAs', id);
    sessionStorage.setItem('loginAsName', fullName);
    sessionStorage.setItem('loginAsUserName', name);
    if (!referer) {
      router.push('/creator')
    }
    else {
      router.push(referer)
    }
  }
  const influencerOutput = influencers.map(({id, name, fullName})  => {
    return (
      <li key={id} onClick={(e) => loginAs(id, name, fullName)}>{`${fullName}(${name})`}</li>
    )
  })

  useEffect(async () => {
    const status = await fetchAllDetails();
    
    if (!status) {
      router.push('/login')
    }
  }, [])

  return (
    <Layout>
      <h3>Click Below influencer to login as </h3>
      {influencers.length > 0 && <ul className={Styles.influencerList}>
        {influencerOutput}
      </ul>}
    </Layout>
  );
};

export const getServerSideProps = (context) => {
  const referer = context.req && context.req.headers && context.req.headers.referer && context.req.headers.referer.indexOf('superadmin') == -1 &&  
    context.req.headers.referer.indexOf('login') == -1
    ? context.req.headers.referer : ''
  return {props: {referer}}
}
export default SuperAdminHome;
