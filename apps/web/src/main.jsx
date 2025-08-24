import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";

import "./styles/global.css";
import "./styles/brand.css";
import "./styles/App.css";
import "./styles/auth.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
