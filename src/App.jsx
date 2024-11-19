// App.jsx
// Imports necessary hooks from React and routing components from react-router-dom.
import { useState, useEffect, createContext, useContext } from "react";
import "./App.css"; // Imports the main CSS file for this component's styling.
import { useRoutes, Navigate } from "react-router-dom";
// Hook to define our application's routes.
import { Link } from "react-router-dom"; // Link component for navigation.
import { supabase } from "./client";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Imports the pages that will be displayed for each route.
// Pages
import Home from "./pages/Home";
import AllTables from "./pages/AllTables";
import Feed from "./pages/Feed";
import NewQuestion from "./pages/NewQuestion";
import AnswerPage from "./pages/AnswerPage";
import NewAnswer from "./pages/NewAnswer";
import Account from "./pages/Account";

// Auth Context
// export const AuthContext = createContext(null);
// Components
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/account",
      element: (
        <PrivateRoute>
          <Account />
        </PrivateRoute>
      ),
    },
    {
      path: "/tables",
      element: (
        <PrivateRoute>
          <AllTables />
        </PrivateRoute>
      ),
    },
    {
      path: "/feed",
      element: (
        <PrivateRoute>
          <Feed />
        </PrivateRoute>
      ),
    },
    {
      path: "/new-question",
      element: (
        <PrivateRoute>
          <NewQuestion />
        </PrivateRoute>
      ),
    },
    {
      path: "/answer-page/:id",
      element: (
        <PrivateRoute>
          <AnswerPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/new-answer/:id/:user_id",
      element: (
        <PrivateRoute>
          <NewAnswer />
        </PrivateRoute>
      ),
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
  ]);

  return (
    <div className="app-master-container">
      <div className="side-nav">
        <Link to="/account">Account</Link>
        <Link to="/">Home</Link>
        <Link to="/tables">View All Current Tables!</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/new-question">New Question</Link>
      </div>
      <div className="main">{element}</div>
    </div>
  );
}

export default App;
