import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  ); // Retrieve from localStorage on initial render
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const currentUser = data?.session?.user || null;
        setUser(currentUser);

        // Store user in localStorage for persistence
        if (currentUser) {
          localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }

      // Subscription for auth state changes
      const { data: subscription } = supabase.auth.onAuthStateChange(
        (event, session) => {
          const currentUser = session?.user || null;
          setUser(currentUser);

          if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
          } else {
            localStorage.removeItem("user");
          }
        }
      );

      return () => {
        subscription?.unsubscribe();
      };
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
