import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
// import About from "./components/About";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const toggleMode = () =>{
    if(mode === 'light')
    {
      setMode('dark');
      document.body.style.backgroundColor="#232d3f";
      showAlert("Dark mode has been enabled", "success");
    }
    else
    {
      setMode('light');
      document.body.style.backgroundColor="white";
      showAlert("Light mode has been enabled", "success");
    }
  }

  return (
    <>
      <Navbar title="TextUtils" mode = {mode} toggleMode = {toggleMode}/>
      <Alert alert = {alert}/>
      <div className="container my-3">
      <TextForm showAlert = {showAlert} heading="Enter Your Text to Analyze"  mode = {mode}/>
      </div>
    </>
  );
}

export default App;
