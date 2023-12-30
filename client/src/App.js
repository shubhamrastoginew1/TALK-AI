import Login from "./pages/Login";
import './css/app.css';
import SpeechToText from "./pages/SpeechToText";
// import SpeechToText from "./pages/SpeechToText";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/speech" element={<SpeechToText />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;