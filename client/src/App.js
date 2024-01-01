import Login from "./pages/Login";
import './css/app.css';
import SpeechToText from "./pages/SpeechToText";
import { Redirect, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


function App() {
  const [ authorized, setA ] = useState(localStorage.getItem("username") === (null) ? false : true);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login authorized={authorized} />} />
          <Route path="/speech" element={<SpeechToText authorized={authorized} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;