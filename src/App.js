import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import Navigation from "./Components/Navagation/Navagation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import "tachyons";
import Rank from "./Components/Rank/Rank";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Signin from "./Components/SignIn/Signin";
import Register from "./Components/Register/Register";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
// import { count } from "console";

function detectFacesInImage(
  imageURL,
  faceLocatorFunction,
  displayfaceBox,
  user,
  setUser,
  updateEntries
) {
  fetch(`https://face-recognition-api-yt0g.onrender.com/imageurl`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: imageURL,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const regions = result.outputs[0].data.regions;
      const boxArray = [];

      if (regions !== undefined) {
        regions.forEach((region) => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const box = faceLocatorFunction(boundingBox);
          boxArray.push(box);
        });
      }

      if (result.status.description === "Ok") {
        updateEntries(boxArray.length, setUser, user);
      }

      displayfaceBox(boxArray);
    })
    .catch((error) => console.log("error", error));
}

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

const initialUser = {
  id: "",
  name: "",
  email: "",
  password: "",
  entries: 0,
  joined: "",
};

function App() {
  const [init, setInit] = useState(false);
  const [input, setInput] = useState("");
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignIn] = useState(false);
  const [user, setUser] = useState(initialUser);

  function loadUser(user) {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      entries: user.entries,
      joined: user.joined,
    });
  }

  function onInputChange(event) {
    setInput(event.target.value);
  }

  function onPictureSubmit() {
    detectFacesInImage(
      input,
      calculateFaceLocation,
      displayfaceBox,
      user,
      setUser,
      updateEntries
    );
  }

  function updateEntries(newEntries, setUser, user) {
    fetch(`https://face-recognition-api-yt0g.onrender.com/image`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        newEntries: newEntries,
      }),
    })
      .then((response) => response.json())
      .then((count) => {
        setUser((prevUser) => ({
          ...prevUser,
          entries: count,
        }));
      })
      .catch(console.log);
  }

  function calculateFaceLocation(data) {
    const clarifaiFace = data;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      bottomRow: (1 - clarifaiFace.bottom_row) * height,
      rightCol: (1 - clarifaiFace.right_col) * width,
    };
  }

  function onRouteChange(newRoute) {
    if (newRoute === "signin") {
      setSignIn(false);
      setInput("");
      setBox([]);
      setUser(initialUser);
    } else if (newRoute === "home") {
      setSignIn(true);
    }
    setRoute(newRoute);
  }

  function displayfaceBox(box) {
    setBox(box);
  }

  useEffect(() => {
    if (!init) {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
      }).then(() => {
        setInit(true);
      });
    }
  }, [init]);

  const particlesComponent = useMemo(() => {
    return <Particles className="particles" options={particlesOptions} />;
  }, []);

  return (
    <div className="App">
      {init && particlesComponent}
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank entries={user.entries} name={user.name} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition selectedImage={input} boxArray={box} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
