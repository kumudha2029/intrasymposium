// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Frontend/Home";
import EventsPage from "./Frontend/Event";
import Register from "./Frontend/Register";
import Register2 from "./Frontend/Register2";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register2" element={<Register2 />} />
      </Routes>
    </Router>
  );
}
