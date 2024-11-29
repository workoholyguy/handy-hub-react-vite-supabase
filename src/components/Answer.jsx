// Answer.jsx
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { format, compareAsc } from "date-fns";
import { supabase } from "../client";
// import "./card-style.css";
import "./answer.css"; // Import the CSS file

const Answer = ({ author, name, content, upvotes, created_at, accepted }) => {
  const formatTime = (time) => {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="master-answer-container">
      <h2>{name ? name : "Unnamed User"} says:</h2>
      <h3>{content}</h3>
      {/* <p>Upvotes: {upvotes}</p> */}
      <p>Posted at: {formatTime(created_at)}</p>
      <h3>Author Email: {author ? author : "Unknown Email"}</h3>
      {accepted && <span className="accepted-badge">Accepted Answer</span>}
    </div>
  );
};

export default Answer;
