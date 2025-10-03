// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Frontend/Home";
import EventsPage from "./Frontend/Event";
import Register from "./Frontend/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Events Page */}
        <Route path="/events" element={<EventsPage />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
