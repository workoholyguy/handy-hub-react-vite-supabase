import React from "react";
import { Link } from "react-router-dom";
import "./card-style.css";

function Postcard({
  id,
  time,
  title,
  description,
  url,
  upvotes,
  onUpvote,
  with_upvote, // Default value set here
  has_voted,
}) {
  const formatTime = (time) => {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="master-postcard-container">
      <Link to={"../answer-page/" + id}>
        <h2>
          <strong>Title </strong>: {title}
        </h2>
        <p>
          <strong>Image </strong>:{" "}
          <img
            src={`${url}`}
            alt="post"
            style={{ width: "100%", height: "auto" }}
          />
        </p>
        <p>
          <strong>Date </strong>: {formatTime(time)}
        </p>
      </Link>
      <p>
        <strong>Upvotes </strong>: {upvotes}
      </p>
      {with_upvote ? (
        <>
          {has_voted ? (
            <button
              className="unvote-btn"
              onClick={() => onUpvote(id, upvotes)} // Call the upvote handler
            >
              Unvote
            </button>
          ) : (
            <button
              className="upvote-btn"
              onClick={() => onUpvote(id, upvotes)} // Call the upvote handler
            >
              Upvote
            </button>
          )}
        </>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
}

// Postcard.defaultProps = {
//   with_upvote: true,
// };

export default Postcard;
