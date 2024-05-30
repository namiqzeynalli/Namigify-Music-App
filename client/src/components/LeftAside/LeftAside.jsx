import React from "react";
import "./LeftAside.css";
import Playlists from "../Playlists/Playlists";
import HomeLogo from "../../assets/images/homeLogo.png";
import SearchLogo from "../../assets/images/searchlogo.png";
import { Link } from "react-router-dom";
import NamigifyLogo from "../../assets/images/logo-color.png";

const LeftAside = () => {
  return (
    <div className="left-wrapper">
      <div className="home-search">
        <div className="logo-container">
          <Link className="namigify-logo" to={"/"}>
            <img src={NamigifyLogo} alt="logo" className="logo-img" />
          </Link>
        </div>
        <div className="home">
          <img src={HomeLogo} alt="homeLogo" />
          <Link className="home" to={"/"}>
            <p>Home</p>
          </Link>
        </div>
      </div>
      <Playlists />
    </div>
  );
};

export default LeftAside;
