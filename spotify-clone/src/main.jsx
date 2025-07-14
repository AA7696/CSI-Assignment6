import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import  PlayerProvider  from "./context/PlayerContext.jsx";
import { BrowserRouter } from "react-router-dom"; // ✅ Required for routing

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </BrowserRouter>
);
