import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Playlists.css";
import { useDispatch, useSelector } from "react-redux";
import deleteImg from "../../assets/images/deletePng.png";
import { deleteAll, deleteList } from "../../store/slices/favoritesSlice";
import axios from "axios";

const Playlists = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistName, setPlaylistName] = useState("New Playlist");

  const fetchData = () => {
    fetch(`http://localhost:4000/playlists`)
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
      .catch((err) => console.log(err));
  };

  const handlePost = () => {
    if (favorites.length > 0) {
      fetch(`http://localhost:4000/playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistName, favorites }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          fetchData();
          dispatch(deleteAll());
          setPlaylistName("New Playlist");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdate = () => {
    if (selectedPlaylist) {
      fetch(`http://localhost:4000/playlist/${selectedPlaylist.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistName, favorites }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          fetchData();
          dispatch(deleteAll());
          setSelectedPlaylist(null);
          setPlaylistName("New Playlist");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeletePlaylist = (playlistId) => {
    axios
      .delete(`http://localhost:4000/playlist/${playlistId}`)
      .then((response) => {
        setPlaylists(
          playlists.filter((playlist) => playlist.id !== playlistId)
        );
        // alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error deleting playlist:", error);
        alert("Playlist could not be deleted.");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="playlists-container">
      <h3>Create or Update Playlist</h3>
      <div className="add-playlist">
        <input
          value={playlistName}
          type="text"
          placeholder="New Playlist Name"
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <ul>
          {favorites?.map((item) => (
            <li className="favorite-li" key={item.id}>
              <div className="favorite-img-p">
                <img src={item.image} alt="music-image" />
                <p>{item.name}</p>
              </div>
              <img
                className="delete-icon"
                src={deleteImg}
                alt="delete icon"
                onClick={() => dispatch(deleteList(item.id))}
              />
            </li>
          ))}
        </ul>
        <button
          className="saveBtn"
          onClick={selectedPlaylist ? handleUpdate : handlePost}
        >
          {selectedPlaylist ? "Update Playlist" : "Save Playlist"}
        </button>
      </div>
      <div className="playlists">
        <h3>Playlists</h3>
        <ul>
          {playlists.length === 0 ? (
            <p className="loading">No Playlists</p>
          ) : (
            playlists?.map((playlist) => (
              <div key={playlist.id} className="playlistName-list">
                <Link
                  className="link-playlistname"
                  to={`/playlist/${playlist.id}`}
                  onClick={() => {
                    setSelectedPlaylist(playlist);
                    setPlaylistName(playlist.playlistName);
                  }}
                >
                  <p>{playlist.playlistName}</p>
                </Link>
                <Link to={"/"}>
                  <img
                    src={deleteImg}
                    alt="delete image"
                    onClick={() => handleDeletePlaylist(playlist.id)}
                  />
                </Link>
              </div>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Playlists;
