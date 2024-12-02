import { useState, useEffect } from "react";
import "./App.css";
import { useRoutes, Link } from "react-router-dom";
import { supabase } from "./client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import Home from "./pages/Home";
import AllTables from "./pages/AllTables";
import Feed from "./pages/Feed";
import NewQuestion from "./pages/NewQuestion";
import AnswerPage from "./pages/AnswerPage";
import NewAnswer from "./pages/NewAnswer";
import Account from "./pages/Account";

import PrivateRoute from "./components/PrivateRoute";
import horizontalLogo from "./assets/Horizontal Logo.png";
import backgroundCask from "./assets/BackDropCask.webp";
import "./pages/page-styles.css";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const initializeSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    initializeSession();

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const requireAuth = (Component) => {
    return session ? (
      <PrivateRoute>{<Component session={session} />}</PrivateRoute>
    ) : (
      <Auth
        supabaseClient={supabase}
        appearance={{
          style: {
            input: { color: "black" },
            form: { padding: " 0%  0%  10px  0%" },
          },
          theme: ThemeSupa,
        }}
        providers={["github"]}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Login: Use "admin@example.com"',
              password_label: 'Password: Use "admin"',
              email_input_placeholder: "Enter email",
              password_input_placeholder: "Enter password",
            },
          },
        }}
      />
    );
  };

  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/account", element: requireAuth(Account) },
    { path: "/tables", element: <AllTables /> },
    { path: "/feed", element: requireAuth(Feed) },
    { path: "/new-question", element: requireAuth(NewQuestion) },
    { path: "/answer-page/:id", element: requireAuth(AnswerPage) },
    { path: "/new-answer/:id/:user_id", element: requireAuth(NewAnswer) },
  ]);

  {
    document.addEventListener("DOMContentLoaded", () => {
      const menuToggle = document.querySelector(".menu-toggle");
      const navLinks = document.querySelector(".nav-links");

      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    });
  }

  return (
    <div className="app-master-container">
      <div className="header-image-container">
        <img src={backgroundCask} alt="Background" className="header-image" />
      </div>
      <nav className="top-nav">
        <img src={horizontalLogo} alt="Logo" className="main-logo" />
        <button className="btn">
          <Link to="/">Home</Link>
        </button>
        <button className="btn">
          <Link to="/feed">Feed</Link>
        </button>
        <button className="btn">
          <Link to="/tables">Tables</Link>
        </button>
        <button className="btn">
          <Link to="/new-question">New Question</Link>
        </button>
        <button className="account-btn">
          <Link to="/account">Account</Link>
        </button>
      </nav>

      <div className="main">{element}</div>
      <nav className="bottom-nav ">
        <h4>
          &copy;All rights are reserved 2024. Designed and created by Omar
          Madjitov @ Avid Tech Usa. See More:{" "}
          <a href="https://github.com/workoholyguy?tab=repositories">
            Click Here
          </a>
        </h4>
      </nav>
    </div>
  );
}

export default App;
