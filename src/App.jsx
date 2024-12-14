import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./pages";
import Dashboard from "./pages/dashboard";
import { Sidebar } from "./components";
import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <Sidebar   />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
