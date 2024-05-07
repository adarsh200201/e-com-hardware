import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%", marginTop: "70px" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            "This is a very friendly and welcoming voice. For any queries or
            information about our products, feel free to call us anytime. We are
            available 24/7 to assist you."
          </p>
          <p className="mt-3">
            <BiMailSend /> : Adarshkumar200201@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 9572377168
          </p>
          {/* <p className="mt-3">
            <BiSupport /> : 
          </p> */}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
