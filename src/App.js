import { useState } from "react";
import Rich from "./rich";

import "./App.css";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

function App() {
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [docId, setDocId] = useState("");

  const generateID = () => {
    setButtonAvailable(false);
    const id = uid();
    setDocId(id);
  };

  const getDocBody = (id) => {
    console.log(id);
  };

  const sendIdForDoc = () => {
    if (docId) {
      setButtonAvailable(false);
      getDocBody(docId);
    }
  };

  return (
    <div className="app">
      <div>enter doc ID </div>
      <input
        disabled={!buttonAvailable}
        className="id-input"
        value={docId}
        onChange={(e) => {
          setDocId(e.target.value);
        }}
      />{" "}
      <button disabled={!buttonAvailable} onClick={sendIdForDoc}>
        OK
      </button>{" "}
      or generate new{" "}
      <button disabled={!buttonAvailable} onClick={generateID}>
        generate ID
      </button>
      <Rich />
    </div>
  );
}
export default App;
