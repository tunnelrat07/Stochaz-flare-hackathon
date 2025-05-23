import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BettingPage } from "./Betting";
import { ThirdwebProvider } from "thirdweb/react";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LearnMore } from "./LearnMore";
createRoot(document.getElementById("root")!).render(
  <ThirdwebProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/playground" element={<BettingPage />} />
        <Route path="/learnmore" element={<LearnMore />} />
      </Routes>
    </BrowserRouter>
  </ThirdwebProvider>
);
