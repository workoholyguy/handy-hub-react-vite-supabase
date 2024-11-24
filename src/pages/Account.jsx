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
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error signing out: " + error.message);
    } else {
      navigate("/");
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
