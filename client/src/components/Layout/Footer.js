import React from "react";
import { Link } from "react-router-dom";

import { ImLinkedin } from "react-icons/im";
import { BiLogoGmail } from "react-icons/bi";

import { AiFillInstagram } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="footer">
      <h3 className="text-center">
        "© [2024] Thakur Hardware Private Limited". All rights reserved."
      </h3>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
      <div className="footerLinks">
        <a
          href="https://www.linkedin.com/in/adarshkumarsharma07/"
          target="_blank"
          rel="noreferrer"
        >
          <ImLinkedin />
        </a>

        <a
          href="mailTo:Adarshkumar200201@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <BiLogoGmail />
        </a>
        <a
          href="https://www.instagram.com/_adarsh_sharma.07/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillInstagram />
        </a>
      </div>
    </div>
  );
};

export default Footer;
