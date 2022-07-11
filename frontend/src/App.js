import "./App.css";
import { Home } from "./Home";
import { Nave } from "./Nave";
import { Tripulante } from "./Tripulante";
import { Navigation } from "./Navigation";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h2 className="m-3 d-flex justify-content-center">
          Base de datos Tripulacion Matrix
        </h2>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nave" element={<Nave />} />
          <Route path="/tripulante" element={<Tripulante />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
