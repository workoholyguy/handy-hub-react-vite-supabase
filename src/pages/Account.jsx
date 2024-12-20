// Account.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import { format, compareAsc } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { id } from "date-fns/locale";
import "./account.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import UpdateUserModal from "../components/UpdateUserModal";
import Postcard from "../components/Postcard";
import Answer from "../components/Answer";
import "./page-styles.css";

const Account = ({ session }) => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [email, setEmail] = useState(session?.user?.email || ""); // State for the email input
  const [phone, setPhone] = useState(session?.user?.email || ""); // State for the email input
  const [fullName, setFullName] = useState(
    session?.user?.user_metadata?.full_name || ""
  );
  const [error, setError] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loadingAnswers, setLoadingAnswers] = useState(true);
  const navigate = useNavigate();

  const formatTime = function (time) {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  useEffect(() => {
    // Fetch User General Info
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // console.log(user);
      // console.log(user.user_metadata.full_name);
      // console.log();
      // console.log("Been Verified: ", user.user_metadata.email_verified);
      // console.log("Phone: ", user.phone);
      // console.log("Updating Mode: ", showModal);
    };

    getUserData(session);

    // Fetch USer Questions
    const fetchUserPosts = async () => {
      setLoadingPosts(true);
      try {
        // Fetch posts created by the logged-in user
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("user_id", session?.user?.id);

        if (error) throw error;

        setUserPosts(data || []);
        // console.log("Questions Data: ", data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchUserPosts();

    // Fetch User Answers:
    const fetchUserAnswers = async () => {
      setLoadingAnswers(true);
      try {
        const { data, error } = await supabase
          .from("answers")
          .select("*, profiles(full_name, email)") // Join profiles table to fetch full_name
          .eq("user_id", session?.user?.id);

        if (error) throw error;
        setUserAnswers(data || []);
      } catch (error) {
        console.error("Error fetching user Answers:", error);
      } finally {
        setLoadingAnswers(false);
      }
    };
    fetchUserAnswers();
  }, [session]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error signing out: " + error.message);
    } else {
      navigate("/");
    }
  };

  const handleUpdateUserInfo = async ({ email, fullName, phone }) => {
    // console.log("Update Button Pressed");
    const formatedPhone = formatPhoneNumber(phone);
    try {
      // Update the Auth user
      const { error: authError } = await supabase.auth.updateUser({
        email,
        data: { full_name: fullName, phone: phone, formatedPhone },
      });
      if (authError) throw authError;

      // Sync the changes to the profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          email,
          phone: formatedPhone,
        })
        .eq("id", session?.user?.id); // Match the user ID
      if (profileError) throw profileError;

      // Close the modal if successful
      setShowModal(false);
      alert("User Information Updated Succcesfully");

      // const updates = { email, data: { full_name: fullName, formatedPhone } };
      // const { error } = await supabase.auth.updateUser(updates);
      // if (error) throw error;
      // setShowModal(false);
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

  const handleDeleteQuestion = async (questionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("id", questionId);

      if (error) throw error;

      // Remove the question from local state
      setUserPosts(userPosts.filter((q) => q.id !== questionId));
      alert("Question deleted successfully.");
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("Failed to delete question. Please try again.");
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this answer? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("answers")
        .delete()
        .eq("id", answerId);

      if (error) throw error;

      // Remove the answer from local state
      setUserAnswers(userAnswers.filter((answer) => answer.id !== answerId));
      alert("Answer deleted successfully.");
    } catch (err) {
      console.error("Error deleting answer:", err);
      alert("Failed to delete answer. Please try again.");
    }
  };

  // console.log("User Metadata:", session?.user?.user_metadata);
  console.log("User Posts:", userPosts);
  console.log("User Answer:", userAnswers);

  return (
    <>
      <div className="account-container">
        <h2>
          Welcome, to your Home Page,&nbsp;&nbsp;
          <span>
            {session?.user?.user_metadata.full_name ||
              "User, we don't have your name"}
            !
          </span>
        </h2>
        <div className="general-details">
          {/* <h1>Welcome, {session?.user?.email || "User"}!</h1> */}
          <h2>
            We have your email as: <br />
            <span className="user-data">
              {session?.user?.email || "Unavailable"}
            </span>
          </h2>
          <h2>
            We have your phone number as: <br />
            <span className="user-data">
              {session?.user?.user_metadata?.formatedPhone
                ? session?.user?.user_metadata?.formatedPhone
                : "Unavailable"}
            </span>
          </h2>
          <h2>
            Account Updated at: <br />
            <span className="user-data">
              {formatTime(session?.user?.updated_at)}
            </span>
          </h2>
          <h2>
            Account Created at: <br />
            <span className="user-data">
              {formatTime(session?.user?.created_at)}
            </span>
          </h2>
        </div>
        <h3>Manage your account details below:</h3>
        <div className="account-managemant">
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
        <div className="q_and_a_container">
          {loadingPosts ? (
            <p>Loading Posts...</p>
          ) : userPosts.length > 0 ? (
            <div className="user-posts-container">
              <h2>Questions:</h2>
              {userPosts.map((post, index) => (
                <div key={index} className="post-container">
                  <Postcard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    upvotes={post.upvotes}
                    url={post.image_url}
                    time={post.created_at}
                    author={post.user_email}
                  />
                  <button
                    className="delete-btn btn-logout"
                    onClick={() => handleDeleteQuestion(post.id)}
                  >
                    Delete Question
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>You Haven't Poseted Anything</p>
          )}
          {loadingAnswers ? (
            <p>Loading Answers...</p>
          ) : userAnswers.length > 0 ? (
            <div className="answer-posts-container">
              <h2>Answers:</h2>
              {userAnswers.map((answer) => (
                <div key={answer.id} className="answer-card">
                  <Answer
                    key={answer.id}
                    answerId={answer.id}
                    name={answer.profiles?.full_name || "Unknown"}
                    author={answer.profiles?.email}
                    // upvotes={answer.upvotes}
                    content={answer.content}
                    created_at={answer.created_at}
                    accepted={answer.is_accepted}
                  />
                  <button
                    className="btn-logout"
                    onClick={() => handleDeleteAnswer(answer.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>You Haven&apos;t Answered Any Questions Yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
