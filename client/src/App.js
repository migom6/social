import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import "./App.scss";

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
