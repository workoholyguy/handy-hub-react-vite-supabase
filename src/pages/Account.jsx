// Account.jsx
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { format, compareAsc } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { id } from "date-fns/locale";

const Account = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error signing out: " + error.message);
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div>
      <h1>Account</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Account;
