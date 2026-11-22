import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import "./i18n";
import "./style.css";
import "./polish.css";
import App from "./app/App";
import ErrorBoundary from "./app/ErrorBoundary";
registerSW({
  onOfflineReady() {
    window.dispatchEvent(new Event("offline-ready"));
    localStorage.setItem("offline-ready", "yes");
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);

import "./design-system/typography.css";
import "./design-system/animations.css";
import "./design-system/responsive.css";

import './design-system/playful.css';

import './design-system/adventure.css';
