import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CanvasEditor from "./components/CanvasEditor";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/canvas/:id" element={<CanvasEditor />} />
    </Routes>
  </Router>
);

export default App;
