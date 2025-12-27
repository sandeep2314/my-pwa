import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Only register SW in production
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  console.log("Registering SW...");
  navigator.serviceWorker
    .register("/registerSW.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((err) => {
      console.error("SW registration failed:", err);
    });
} else {
  console.log("Skipping SW registration in dev mode");
}
