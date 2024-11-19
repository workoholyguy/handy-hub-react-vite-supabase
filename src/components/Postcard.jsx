// Postcard.jsx
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { format, compareAsc } from "date-fns";
import { supabase } from "../client";
import "./card-style.css";

function Postcard(props) {
  const formatTime = function (time) {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };
  return (
    <>
      <div className="master-postcard-container">
        <Link to={"../answer-page/" + props.id}>
          <h2>
            <strong>Title </strong>: {props.title}
          </h2>
          {/* <p>
            <strong>Description </strong>: {props.description}
          </p> */}
          <p>
            <strong>Image </strong>:{" "}
            <img
              src={`${props.url}`}
              alt="post"
              style={{ width: "100%", height: "auto" }}
            />
          </p>
          <p>
            <strong>Date </strong>: {formatTime(props.time)}
          </p>
        </Link>
        <p>
          <strong>Upvotes </strong>: {props.upvotes}
        </p>
        <p>
          <strong>Comments </strong>: {props.comments}
        </p>
      </div>
    </>
  );
}

export default Postcard;
