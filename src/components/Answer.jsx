// Answer.jsx
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { format, compareAsc } from "date-fns";
import { supabase } from "../client";
import "./card-style.css";
import "./answer.css";

const Answer = (props) => {
  const id = props.answerId;
  const accepted = props.accepted;
  const formatTime = function (time) {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };
  return (
    <>
      <div className="master-answer-container">
        <h2>{props.name} says:</h2>
        <h3>{props.content}</h3>
        <p>Upvotes: {props.upvotes}</p>
        <p>at {formatTime(props.created_at)}</p>
      </div>
    </>
  );
};

export default Answer;
