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
  author,
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
        <h3>
          {/* <strong>Title </strong>:  */}
          {title}
        </h3>
        <p>
          {/* <strong>Image </strong>:{" "} */}
          <div className="post-image-container">
            <img
              className="post-image"
              src={`${
                url
                  ? url
                  : "https://images.unsplash.com/photo-1682888813788-373f947aacb3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }`}
              alt="post"
              // style={{ width: "100%", height: "auto" }}
            />
          </div>
        </p>
      </Link>

      <div className="date-and-upvotes-container">
        <p>
          <strong>Date </strong>: {formatTime(time)}
        </p>
        <p>
          <strong>Upvotes </strong>: {upvotes}
        </p>
      </div>

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
      <p className="author">Author: {author}</p>
    </div>
  );
}

// Postcard.defaultProps = {
//   with_upvote: true,
// };

export default Postcard;
