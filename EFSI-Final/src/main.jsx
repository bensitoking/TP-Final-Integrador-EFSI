import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { MovimientosProvider } from "./context/MovimientosContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MovimientosProvider>
          <App />
        </MovimientosProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
