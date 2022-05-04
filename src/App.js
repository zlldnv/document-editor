import { useEffect, useState } from "react";
import axios from "axios";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
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
    axios
      .post(
        "http://gitlab.vitaliismolev.com/content",
        JSON.stringify({
          id,
          content: convertToRaw(data),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => console.log(err));
  };

  const generateID = () => {
    setButtonAvailable(false);
    const id = uid();
    setDocId(id);
    sendData(id);
  };

  useEffect(() => {
    if (docId) {
      setTimeout(getDocBody(docId), 5000);
    }
  }, [docId]);

  const getDocBody = (id) => {
    fetch(`http://gitlab.vitaliismolev.com/content?id=${id}`)
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        const contentState = convertFromRaw(res.content);
        const editorState = EditorState.createWithContent(contentState);
        console.log(contentState);
        setEditorValue(editorState);
      });
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
