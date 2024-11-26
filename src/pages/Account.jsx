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
import UpdateUserModal from "../components/UpdateUserModal";

const Account = ({ session }) => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [email, setEmail] = useState(session?.user?.email || ""); // State for the email input
  const [phone, setPhone] = useState(session?.user?.email || ""); // State for the email input
  const [fullName, setFullName] = useState(
    session?.user?.user_metadata?.full_name || ""
  );
  const [error, setError] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const navigate = useNavigate();

  const formatTime = function (time) {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

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
      console.log("Updating Mode: ", showModal);
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

  const handleUpdateUserInfo = async ({ email, fullName, phone }) => {
    console.log("Update Button Pressed");
    try {
      const updates = { email, data: { full_name: fullName, phone } };
      const { error } = await supabase.auth.updateUser(updates);
      if (error) throw error;
      setShowModal(false);
    } catch (error) {
      console.error("Error Caught: ", error);
      alert("Failed to update user info.");
    }
    // const response = await
    // setShowModal(true);
    // return null;
  };

  const formatPhoneNumber = (phone) => {
    // Ensure phone is a string
    phone = phone.toString();

    // Extract last 4 digits
    const lastFour = phone.slice(-4);

    // Extract middle part (next 3 digits before last 4)
    const middle = phone.slice(-7, -4);

    // Extract middle part (next 3 digits before last 4)
    const areaCode = phone.slice(-10, -7);

    return `(${areaCode}) ${middle}-${lastFour}`;
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
          {session?.user?.user_metadata.phone
            ? formatPhoneNumber(session?.user?.user_metadata.phone)
            : "Unavailable"}
        </span>
      </h2>
      <h2>
        Account Updated at:{" "}
        <span className="user-data">
          {formatTime(session?.user?.updated_at)}
        </span>
      </h2>
      <h2>
        Account Created at:{" "}
        <span className="user-data">
          {formatTime(session?.user?.created_at)}
        </span>
      </h2>
      <h3>Manage your account details below:</h3>
      <div className="button-container">
        <button onClick={() => setShowModal(true)} className="btn-update">
          Update Personal Info
        </button>
        <button onClick={handleSignOut} className="btn-logout">
          Sign Out
        </button>
      </div>
      {showModal && (
        <UpdateUserModal
          user={session?.user}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdateUserInfo}
        />
      )}
    </div>
  );
};

export default Account;
