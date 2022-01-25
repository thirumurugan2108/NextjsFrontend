import React from "react";
import styles from "./refund-poicy.module.scss";
import Header from "../../src/components/header";
import Footer from "../../src/components/footer";

const RefundPolicy = () => {

    return (
        <>
            <Header />
            <div className={styles.refundContainer}>
                <h1 className={styles.heading}>REFUND POLICY</h1>
                <p>We&rsquo;re so convinced you&rsquo;ll absolutely love our products, that we&rsquo;re willing to offer a 14 day risk-free money back guarantee. If you are not satisfied with the product for any reason you can raise a request for a refund within 14 days of making a purchase. Our team will check the reason for request, if the request is valid refund will be initiated with 14 from your date of request.</p>
                <h2>Contacting us</h2>
                <p>If you have any questions, concerns, or complaints regarding this refund policy, we encourage you to contact us using the details below:</p>
                <a href="#">shroomzzinfo@gmail.com</a>
                <p>This document was last updated on January 23, 2022</p>
            </div>
            <Footer />
        </>
    )
}

export default RefundPolicy;