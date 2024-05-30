import React, { useEffect, useState } from "react";
import "./PlaylistDetails.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const fetchSongs = () => {
    axios
      .get(`http://localhost:4000/playlist/${playlistId}`)
      .then((response) => {
        setSongs(response.data.songs);
        setPlaylistName(response.data.playlistName);
      })
      .catch((error) => console.error("Error fetching songs:", error));
  };

  const handleDeleteSong = (musicId) => {
    axios
      .delete(`http://localhost:4000/playlist/${playlistId}/song/${musicId}`)
      .then((response) => {
        fetchSongs();
        // alert(response.data.message);
      })
      .catch((error) => console.error("Error deleting song:", error));
  };

  useEffect(() => {
    fetchSongs();
  }, [playlistId]);

  return (
    <div className="playlistDetails-wrapper">
      <Link to={"/"}>
        <p className="back-arrow">⇦</p>
      </Link>
      <h1 className="playlist-details-heading">{playlistName}</h1>
      <ul>
        {songs?.map((song, index) => (
          <li key={index}>
            <img src={song.image} alt={song.musicName} />
            <div className="playlist-content">
              <div className="delete-about">
                <p>
                  <span className="music-name-span">{song.musicName}</span>
                  <span className="by">by</span>
                  <span className="artist-name-span">{song.artist}</span>
                </p>
                <button onClick={() => handleDeleteSong(song.musicId)}>
                  Remove
                </button>
              </div>
              <audio
                className="playlist-audio"
                src={song.audio}
                controls
              ></audio>{" "}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDetails;
