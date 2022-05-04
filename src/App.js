import { useEffect, useState } from "react";
import axios from "axios";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";

import { firestore as db } from "./firebase";

import Rich from "./rich";

import "./rich.css";

import "./App.css";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

axios.defaults.headers.common.accept = "application/json";

function App() {
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty());
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [docId, setDocId] = useState("");

  const sendData = (id) => {
    const data = editorValue.getCurrentContent();

    db.collection("docs")
      .doc(id)
      .set({ content: convertToRaw(data) });
  };

  const generateID = () => {
    setButtonAvailable(false);
    const id = uid();
    setDocId(id);
    sendData(id);
  };

  useEffect(() => {
    if (docId) {
      setInterval(() => {
        getDocBody(docId);
      }, 1000);
    }
  }, [docId]);

  const getDocBody = async (id) => {
    const snap = await db.collection("docs").doc(id).get();

    const contentState = convertFromRaw(snap.data().content);
    const editorState = EditorState.createWithContent(contentState);
    setEditorValue(editorState);
  };

  const sendIdForDoc = () => {
    if (docId) {
      setButtonAvailable(false);
      getDocBody(docId);
    }
  };

  return (
    <div className="app">
      {docId && !buttonAvailable ? (
        `Your doc Id ${docId}`
      ) : (
        <>
          {" "}
          <div>Enter existing doc ID </div>
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
          or new{" "}
          <button disabled={!buttonAvailable} onClick={generateID}>
            new ID
          </button>{" "}
          to create new doc
        </>
      )}
      <Rich
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        sendData={sendData}
        docId={docId}
      />
    </div>
  );
}
export default App;
