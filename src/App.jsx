// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import { useRoutes, Link } from "react-router-dom";
import { supabase } from "./client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// Imports for existing components and pages

import Home from "./pages/Home";
import AllTables from "./pages/AllTables";
import Feed from "./pages/Feed";
import NewQuestion from "./pages/NewQuestion";
import AnswerPage from "./pages/AnswerPage";
import NewAnswer from "./pages/NewAnswer";
import Account from "./pages/Account";

// Authenticated route wrapper
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [session, setSession] = useState(null); // State to track user session

  // Supabase Auth state listener
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

    // Correctly handle subscription cleanup with null-check
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Helper function for routes requiring authentication
  const requireAuth = (Component) => {
    return session ? (
      <PrivateRoute>{<Component session={session} />}</PrivateRoute>
    ) : (
      <Auth
        supabaseClient={supabase}
        appearance={{
          style: {
            input: { color: "white" },
          },
          theme: ThemeSupa,
        }}
        providers={["github"]}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Login: Use as login \n"admin@example.com"',
              password_label: 'Password: Use as pass: \n"admin"',
              email_input_placeholder: '"admin@example.com"',
              password_input_placeholder: '"admin"',
            },
            sign_up: {
              email_input_placeholder: "Enter your email address",
              password_input_placeholder: "Choose a strong password",
            },
          },
        }}
      />
    );
  };

  // Routes definition, integrating session-based authentication
  const element = useRoutes([
    {
      path: "/",
      element: <Home />, // Unrestricted access to Home page
    },
    {
      path: "/account",
      element: requireAuth(Account),
    },
    {
      path: "/tables",
      element: <AllTables />,
    },
    {
      path: "/feed",
      element: requireAuth(Feed),
    },
    {
      path: "/new-question",
      element: requireAuth(NewQuestion),
    },
    {
      path: "/answer-page/:id",
      element: requireAuth(AnswerPage),
    },
    {
      path: "/new-answer/:id/:user_id",
      element: requireAuth(NewAnswer),
    },
  ]);

  return (
    <div className="app-master-container">
      <div className="side-nav">
        <Link to="/account">Account</Link>
        <Link to="/">Home</Link>
        <Link to="/tables">
          View All Current Tables! <br />
          (Pick a Username Here)
        </Link>
        <Link to="/feed">Feed</Link>
        <Link to="/new-question">New Question</Link>
      </div>
      <div className="main">{element}</div>{" "}
      {/* Always render the defined routes */}
    </div>
  );
}

export default App;
