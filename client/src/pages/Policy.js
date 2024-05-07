import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "99%", marginTop: "60px" }}
          />
        </div>
        <div className="col-md-5">
          <p>
            → Your personal data is collected and stored securely for the sole
            purpose of processing orders and providing customer service.
          </p>
          <p>
            → Any sharing of your information with trusted partners or service
            providers is strictly limited to fulfilling orders or providing
            services.
          </p>
          <p>
            → Your consent to the collection and use of your information is
            implied by your use of our website, and you have the right to
            review, update, or delete your personal data as needed.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
