import React from "react";
import "./MusicCard.css";
import { useDispatch } from "react-redux";
import { addList } from "../../store/slices/favoritesSlice";

const MusicCard = ({ name, audio, image, artist, music, setData }) => {
  const dispatch = useDispatch();
  return (
    <li onClick={() => setData(music)} className="musiccard">
      <div className="img-name">
        <div className="name-artist">
          <img src={image} alt={name} />
          <div className="p-content">
            <p>{name}</p>
            <p>{artist}</p>
          </div>
        </div>
        <button
          className="add-btn"
          onClick={() =>
            dispatch(
              addList({
                name: music.name,
                id: music.id,
                image,
                artist: artist,
                audio: audio,
              })
            )
          }
        >
          Add to list
        </button>
      </div>
      {/* <audio src={audio} controls></audio> */}
    </li>
  );
};

export default MusicCard;
