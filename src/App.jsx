// App.jsx
// Imports necessary hooks from React and routing components from react-router-dom.
import { useState, useEffect, createContext, useContext } from "react";
import "./App.css"; // Imports the main CSS file for this component's styling.
import { useRoutes, Navigate } from "react-router-dom";
// Hook to define our application's routes.
import { Link } from "react-router-dom"; // Link component for navigation.
import { supabase } from "./client";

// Imports the pages that will be displayed for each route.
// Pages
import Home from "./pages/Home";
import AllTables from "./pages/AllTables";
import Feed from "./pages/Feed";
import NewQuestion from "./pages/NewQuestion";
import AnswerPage from "./pages/AnswerPage";
import NewAnswer from "./pages/NewAnswer";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Auth Context
export const AuthContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  // Check for an existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  // Defines the routes for the application. Each route path corresponds to a specific component.
  onst element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/account",
      element: <PrivateRoute user={user}><Account /></PrivateRoute>,
    },
    {
      path: "/tables",
      element: <PrivateRoute user={user}><AllTables /></PrivateRoute>,
    },
    {
      path: "/feed",
      element: <PrivateRoute user={user}><Feed /></PrivateRoute>,
    },
    {
      path: "/new-question",
      element: <PrivateRoute user={user}><NewQuestion /></PrivateRoute>,
    },
    {
      path: "/answer-page/:id",
      element: <PrivateRoute user={user}><AnswerPage /></PrivateRoute>,
    },
    {
      path: "/new-answer/:id/:user_id",
      element: <PrivateRoute user={user}><NewAnswer /></PrivateRoute>,
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
    <>
       <AuthContext.Provider value={{ user, setUser }}>
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
    </AuthContext.Provider>
    </>
  );
}

// PrivateRoute Component
function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/sign-in" />;
}

export default App;
