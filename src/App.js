import React, { useEffect, useState } from "react";
import { ref, storageRef } from "./api/firebase";
import uuidv4 from "uuid/v4";

import "./App.css";

function App() {
  const [state, setState] = useState({
    added: false,
    photo: { key: null },
    started: false,
    visionResult: {},
  });

  const handleFileUpload = (e) => {
    let storeKey = uuidv4();
    if (!e.target.files[0]) {
      return;
    }
    const file = e.target.files[0];
    const filename = e.target.files[0].name;
    const photoStorageRef = storageRef.child(`new/${storeKey}`);
    const fileURL = photoStorageRef.child(filename);
    fileURL
      .put(file)
      .then((snapshot) => {
        photoStorageRef
          .child(filename)
          .getDownloadURL()
          .then((url) => {
            const theRef = ref.child("new").push();
            theRef.set({ key: theRef.key, url }).then(() => {
              setState({
                ...state,
                added: true,
                photo: { ...state.photo, key: theRef.key, url },
              });
            });
          });
      })
      .catch((error) => {
        alert("Error uploading image " + error);
        console.error(error);
      });
  };

  useEffect(() => {
    const theRef = ref.child(`new/${state.photo.key}`);
    const handleParent = (snap) => {
      if (snap.exists()) {
        setState((s) => ({ ...s, visionResult: snap.val() }));
      }
    };
    theRef.on("value", handleParent);
    return () => {
      theRef.off("value", handleParent);
    };
  }, [state.photo.key]);

  if (!state.started) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to a quick google vision example</h1>
          <button onClick={() => setState({ ...state, started: true })}>
            Get Started
          </button>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <input type="file" onChange={handleFileUpload} />
          {state.photo.url && (
            <img
              src={state.photo.url}
              style={{ height: "100px", width: "auto", margin: "10px" }}
              alt="the uploaded file"
            />
          )}
          <ul>
            {state.visionResult &&
              state.visionResult.objects &&
              state.visionResult.objects.map((item, idx) => (
                <li key={idx}>{item.name}</li>
              ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
