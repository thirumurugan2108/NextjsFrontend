import React from "react";
import styles from "./dummy.module.scss";
import Header from "../../src/components/header";
import Footer from "../../src/components/footer";

const dummy = ()=>{

return(
   <>  
    <Header />
    <h2 className={styles.myclass}>hello</h2>
    <Footer />
    </>
)
}

export default dummy;