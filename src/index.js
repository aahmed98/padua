import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Launch from "./Launch";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Launch />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>
);

root.render(<Root />);
