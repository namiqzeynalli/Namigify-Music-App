// import { useEffect, useState } from "react";
// import "./App.css";
// import CenterComponent from "./components/CenterComponent/CenterComponent";
// import LeftAside from "./components/LeftAside/LeftAside";
// import RightAside from "./components/RightAside/RightAside";
// import { Route, Router } from "react-router-dom";
// import PlaylistDetails from "./components/PlaylistDetails/PlaylistDetails";

// function App() {
//   const [accessToken, setAccessToken] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [data, setData] = useState({
//     name: "505",
//     album: {
//       artists: [{ name: "Arctic Monkeys" }],
//       images: [
//         { first: "" },
//         {
//           url: "https://i.scdn.co/image/ab67616d00001e020c8ac83035e9588e8ad34b90",
//         },
//       ],
//       release_date: "2007-04-24",
//     },
//     preview_url:
//       "https://p.scdn.co/mp3-preview/1b23606bada6aacb339535944c1fe505898195e1?cid=c6d53315404e4ceaa6f7005ca7b114ee",
//   });

//   const CLIENT_ID = "c6d53315404e4ceaa6f7005ca7b114ee";
//   const CLIENT_SECRET = "eab8fac42cfa4a1e962c22f66039315a";

//   useEffect(() => {
//     var authParameters = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body:
//         "grant_type=client_credentials&client_id=" +
//         CLIENT_ID +
//         "&client_secret=" +
//         CLIENT_SECRET,
//     };

//     fetch(`https://accounts.spotify.com/api/token`, authParameters)
//       .then((res) => res.json())
//       .then((data) => setAccessToken(data.access_token));
//   }, []);
//   // console.log(accessToken);

//   // const searchFunc = async () => {
//   //   // console.log("Searching token " + accessToken);
//   //   var trackParameters = {
//   //     method: "GET",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Authorization: "Bearer " + accessToken,
//   //     },
//   //   };
//   //   // console.log(artistParameters);

//   //   const response = await fetch(
//   //     `https://api.spotify.com/v1/search?q=${searchInput}&type=track`,
//   //     trackParameters
//   //   )
//   //     .then((response) => response.json())
//   //     .then((data) => setData(data.tracks.items));
//   //   // console.log(response.tracks.items);
//   // };

//   return (
//     <div className="wrapper">
//       {/* <button onClick={searchFunc}>Search</button> */}
//       <LeftAside />
//       <CenterComponent
//         setData={setData}
//         setSearchInput={setSearchInput}
//         // searchFunc={searchFunc}
//         // data={data}
//         accessToken={accessToken}
//         searchInputValue={searchInput}
//       />
//       <RightAside data={data} />
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import "./App.css";
import CenterComponent from "./components/CenterComponent/CenterComponent";
import LeftAside from "./components/LeftAside/LeftAside";
import RightAside from "./components/RightAside/RightAside";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Değişiklik
import PlaylistDetails from "./components/PlaylistDetails/PlaylistDetails";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState({
    name: "505",
    album: {
      artists: [{ name: "Arctic Monkeys" }],
      images: [
        { first: "" },
        {
          url: "https://i.scdn.co/image/ab67616d00001e020c8ac83035e9588e8ad34b90",
        },
      ],
      release_date: "2007-04-24",
    },
    preview_url:
      "https://p.scdn.co/mp3-preview/1b23606bada6aacb339535944c1fe505898195e1?cid=c6d53315404e4ceaa6f7005ca7b114ee",
  });

  const CLIENT_ID = "c6d53315404e4ceaa6f7005ca7b114ee";
  const CLIENT_SECRET = "eab8fac42cfa4a1e962c22f66039315a";

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch(`https://accounts.spotify.com/api/token`, authParameters)
      .then((res) => res.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  return (
    <div className="wrapper">
      <LeftAside />
      <Routes>
        {" "}
        <Route
          path="/"
          element={
            <CenterComponent
              setData={setData}
              setSearchInput={setSearchInput}
              accessToken={accessToken}
              searchInputValue={searchInput}
            />
          }
        />
        <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
      </Routes>{" "}
      <RightAside data={data} />
    </div>
  );
}

export default App;
