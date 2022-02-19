import React from "react";
// import ChatBox from "./ChatBox";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <span>
        <a
          href="https://www.facebook.com/rebe.kah.524/"
          rel="noreferrer"
          target="_blank"
        >
          <i class="fa fa-facebook-square fa-lg"></i>
        </a>
        <a
          href="https://www.instagram.com/refka_guenichi/"
          rel="noreferrer"
          target="_blank"
        >
          <i class="fa fa-instagram fa-lg"></i>
        </a>
      </span>
      <span>
        &copy; {1900 + new Date().getYear()}
        <Link to="/" target="_blank">
          Swift Shop
        </Link>
        , made with love to facilitate your life
      </span>
    </footer>
  );
};

export default Footer;
