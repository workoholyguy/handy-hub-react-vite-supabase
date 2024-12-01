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
import horizontalLogo from "./assets/Horizontal Logo.png";

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
          style: { input: { color: "white" } },
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

  return (
    <div className="app-master-container">
      <nav className="top-nav">
        <Link to="/">
          <img src={horizontalLogo} alt="Logo" />
        </Link>
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/feed">Feed</Link>
        </button>
        <button>
          <Link to="/tables">Tables</Link>
        </button>
        <button>
          <Link to="/new-question">New Question</Link>
        </button>
        <button>
          <Link to="/account">Account</Link>
        </button>
      </nav>
      <div className="main">{element}</div>
    </div>
  );
}

export default App;
