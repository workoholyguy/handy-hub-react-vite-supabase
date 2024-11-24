// Account.jsx
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { format, compareAsc } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { id } from "date-fns/locale";
import "./account.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Account = ({ session }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error.message);
        alert("Error signing out. Please try again later.");
        return;
      }

      alert("You have been signed out successfully.");
      navigate("/");
    } catch (err) {
      console.error("Unexpected error during sign-out:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="account-container">
      <h1>Welcome, {session?.user?.email || "User"}!</h1>
      <p>Manage your account details below:</p>
      <button onClick={handleSignOut} className="btn-logout">
        Sign Out
      </button>
    </div>
  );
};

export default Account;
