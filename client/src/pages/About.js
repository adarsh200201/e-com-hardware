import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%", marginTop: "30px" }}
          />
        </div>
        <div className="col-md-4">
          <h6 className="text-justify mt-2">
            <b>"Welcome to Thakur Hardware</b>, your trusted partner since{" "}
            <b>1990! </b>
            We offer <b>top-quality</b> hardware solutions, from nuts and bolts
            to power tools. Our expert team provides guidance for all projects,
            big or small. We prioritize reliability and durability by sourcing
            from <b>trusted manufacturers</b>. Competitive pricing and
            convenient delivery options make <b>shopping easy</b> . Customer
            satisfaction is our utmost priority.
            <b>Thank you for choosing Thakur Hardware</b>. Let's build
            together!"
          </h6>
        </div>
      </div>
    </Layout>
  );
};

export default About;
