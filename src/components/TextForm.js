import React, { useState, useRef } from "react";

export default function TextForm(props) {
  
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [Image, setImage] = useState(
    <svg
      preserveAspectRatio="xMidYMid meet"
      width="24"
      height="24"
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z"
        fillRule="nonzero"
      />
    </svg>
  );
  const utteranceRef = useRef(null);

  const HandleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Upper Case", "success");
  };

  const HandleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lower Case", "success");
  };

  const HandleCopy = () => {
    navigator.clipboard.writeText(text);
    setImage(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
      </svg>
    );
  };

  const HandleClear = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text is Cleared", "success");
  };

  const HandleSpeak = () => {
    let utterance = new SpeechSynthesisUtterance();
    console.log(text);
    utterance.text = text;
    utterance.voice = window.speechSynthesis.getVoices()[0];
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    console.log(utterance.voice);
    window.speechSynthesis.speak(utterance);
    var r = setInterval(function () {
      if (!utterance.speaking) clearInterval(r);
      else utterance.resume();
  }, 14000);
  };

  const handlePause = () => {
    if (!isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleCancel = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const HandleOnChange = (event) => {
    setText(event.target.value);
    setImage(
      <svg
        preserveAspectRatio="xMidYMid meet"
        width="24"
        height="24"
        clipRule="evenodd"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z"
          fillRule="nonzero"
        />
      </svg>
    );
  };

  return (
    <div>
      <div
        className="container"
        style={{ color: props.mode === "light" ? "black" : "white" }}
      >
        <div className="mb-3 my-3">
          <label htmlFor="myBox" className="form-label">
            <h1>{props.heading}</h1>
          </label>
          <textarea
            className="form-control"
            onChange={HandleOnChange}
            value={text}
            id="exampleFormControlTextarea1"
            rows="8"
            style={{
              backgroundColor: props.mode === "light" ? "white" : "#adadad",
              color: "black",
            }}
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={HandleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={HandleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={HandleCopy}>
          {Image} Copy to Clipboard
        </button>
        <button className="btn btn-danger mx-2 my-1" onClick={HandleClear}>
          Clear
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={HandleSpeak}>
          Speak
        </button>
        {isSpeaking && (
          <>
            <button className="btn btn-primary mx-2 my-1" onClick={handlePause}>
              Pause
            </button>
            <button className="btn btn-primary mx-2 my-1" onClick={handleResume}>
              Resume
            </button>
            <button className="btn btn-danger mx-2 my-1" onClick={handleCancel}>
              Cancel
            </button>
          </>
        )}
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "light" ? "black" : "white" }}
      >
        <h2>Text Summary</h2>
        <p>Word Count: {text.match(/\S+/g)?.length || 0}</p>
        <p>No. of Characters: {text.length}</p>
        <p>
          Time to read: {Math.round(0.008 * text.split(" ").length)} minutes
        </p>
      </div>
      <div
        className="container"
        style={{ color: props.mode === "light" ? "black" : "white" }}
      >
        <h2>Preview</h2>
        <p>
          {text.length > 0
            ? text
            : "Enter something in the textbox above to preview here"}
        </p>
      </div>
    </div>
  );
}
