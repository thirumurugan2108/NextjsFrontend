import React from "react";
import nookies from "nookies";
// import { useRouter } from 'next/router'
import { firebaseAdmin, db } from "../firebaseAdmin";

import Head from 'next/head'


import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext ) => {

  // const router = useRouter()
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    // const { pid } = router.query
    // the user is authenticated!
    // FETCH STUFF HERE
    let id = ctx.query.post;//'387909c2-016f-4f18-b29b-3574702d3454';
    let test = await db.collection('urls').where('uuid','==',id ).get();
    let data = '';
    let urldata : any ;
    test.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data = doc.data().source_url;
          urldata = doc.data();
        });
    // .then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     return {
    //       props: { message: `Your lknemail is ${uid + email}s` },
    //     };

    //   });
    // })
    // .catch((error) => {
    //   return {
    //     props: { message: `Your lknemail is ${uid + email}s` },
    //   };
    // });
    
    return {
            props: { message: `Your lkndeflemail is ${uid + email}s`,
           data: data,
           urldata: urldata
          },
           
          };
    // const entry = await test.docs.map(entry => entry.data());
   
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
};

function AuthenticatedPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // const router = useRouter();

  // useEffect(async () => {


  // }, []);
  return (
    
    <div>
    <Head>
    <meta
          name="description"
          content={props.message}
        />
    </Head>
      {/* <p className="test">{props.message!}</p> */}
      <div className="container"> 
       <iframe src={props.data} width="100%" height="100%"></iframe>
      </div>
      
      <img src={props.urldata.advertisemtent} alt="image" height="90" width="100%"/>
      {/* <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .signOut()
            .then(() => {
              router.push("/");
            });
        }}
      >
        Sign out
      </button> */}
    </div>
    
  );
}

export default AuthenticatedPage;
