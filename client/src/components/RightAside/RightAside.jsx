import React from "react";
import "./RightAside.css";

const RightAside = ({ data }) => {
  return (
    <div className="right-wrapper">
      <div className="about-music-heading">
        <h3>About Music</h3>
      </div>
      <img src={data?.album.images[1].url} alt="music image" />
      <div className="right-name-artist">
        <p className="music-name">{data?.name}</p>
        <p className="artist-name">{data?.album.artists[0].name}</p>
      </div>
      <p className="release-date">
        Release Date: <span>{data?.album.release_date}</span>
      </p>
      <audio src={data?.preview_url} controls></audio>
    </div>
  );
};

export default RightAside;
