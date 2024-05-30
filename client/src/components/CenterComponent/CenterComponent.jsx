import React, { useEffect } from "react";
import "./CenterComponent.css";
import MusicCard from "../MusicCard/MusicCard";
import { useDispatch, useSelector } from "react-redux";
import { getMusics, getSearchMusics } from "../../store/slices/MusicsSlice";

const CenterComponent = ({
  setSearchInput,
  searchFunc,
  data,
  accessToken,
  searchInputValue,
  setData,
}) => {
  const { musics, loading, error } = useSelector((state) => state.musics);
  const dispatch = useDispatch();

  var trackParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    dispatch(getMusics(trackParameters));
  }, []);

  // console.log(data);
  return (
    <div className="center-wrapper">
      <div className="searching">
        <input
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              if (searchInputValue) {
                dispatch(
                  getSearchMusics({ trackParameters, searchInputValue })
                );
              } else {
                alert("Please Enter Music");
              }
            }
          }}
          type="text"
          placeholder="Search for music..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          onClick={() =>
            searchInputValue
              ? dispatch(getSearchMusics({ trackParameters, searchInputValue }))
              : alert("Please Enter Music")
          }
        >
          Search
        </button>
      </div>
      <ul className="cards-ul">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">ERROR!</div>}
        {musics && musics.length > 0 ? (
          musics?.map((item) => {
            return (
              <MusicCard
                key={item.id}
                music={item}
                name={item.name}
                audio={item.preview_url}
                image={item.album.images[2].url}
                artist={item.album.artists[0].name}
                setData={setData}
              />
            );
          })
        ) : (
          <p className="music-not-found">
            No results were found for your search :({" "}
          </p>
        )}
      </ul>
    </div>
  );
};

export default CenterComponent;
