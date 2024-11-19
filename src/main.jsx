// Imports the StrictMode component from React, which helps identify potential issues by adding extra checks
import { StrictMode } from "react";
// Imports the createRoot function to render our app into the DOM
import { createRoot } from "react-dom/client";
// Imports the main CSS file for styling the entire application
import "./index.css";
// Imports the main App component which contains the core of the application
import App from "./App.jsx";
// Imports BrowserRouter, which allows for navigation between different pages in a single-page application
import { BrowserRouter } from "react-router-dom";

// Renders the App component inside the root element in index.html, wrapped in StrictMode and BrowserRouter
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
