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
      <h3>{name ? name : "Unnamed User"} says:</h3>
      <h4>{content}</h4>
      {/* <p>Upvotes: {upvotes}</p> */}
      <p>Posted at: {formatTime(created_at)}</p>
      <h4>Author Email: {author ? author : "Unknown Email"}</h4>
      {accepted && <span className="accepted-badge">Accepted Answer</span>}
    </div>
  );
};

export default Answer;
