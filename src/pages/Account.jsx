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
  const formatTime = function (time) {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);
      console.log(user.user_metadata.full_name);
      console.log();
      console.log("Been Verified: ", user.user_metadata.email_verified);
      console.log("Phone: ", user.phone);
    };

    getUserData(session);
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error signing out: " + error.message);
    } else {
      navigate("/");
    }
  };

  const handleUpdate = async () => {
    console.log("Update Button Pressed");
    return null;
  };

  return (
    <div className="account-container">
      <h1>
        Welcome,{" "}
        <span>
          {session?.user?.user_metadata.full_name ||
            "User, we don't have your name"}
        </span>
        !
      </h1>
      {/* <h1>Welcome, {session?.user?.email || "User"}!</h1> */}
      <h2>
        We have your email as:
        <span className="user-data">
          {session?.user?.email || "Unavailable"}
        </span>
      </h2>
      <h2>
        We have your phone number as:
        <span className="user-data">
          {session?.user?.phone || "Unavailable"}
        </span>
      </h2>
      <h2>
        Account Created at:{" "}
        <span className="user-data">
          {formatTime(session?.user?.updated_at)}
        </span>
      </h2>
      <h3>Manage your account details below:</h3>
      <div className="button-container">
        <button onClick={handleUpdate} className="btn-update">
          Update Personal Info
        </button>
        <button onClick={handleSignOut} className="btn-logout">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
