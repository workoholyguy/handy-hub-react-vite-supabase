// Home.js

import React from "react";
import { Link } from "react-router-dom";
import "./page-styles.css";
import "./home.css";

function Home() {
  return (
    <>
      <div className="home-master-container">
        <div className="main">
          <div className="home-content-container">
            <h1>Welcome to HandyHub!</h1>
            <p>
              HandyHub is a platform designed to bring together DIY enthusiasts
              and professional handymen. Whether you're looking to tackle a home
              project yourself or need expert advice, HandyHub is here to
              connect you with a community ready to help.
            </p>

            <h2>About HandyHub</h2>
            <p>
              Our mission is to create a collaborative environment where users
              can ask questions, share knowledge, and connect with professionals
              across various fields such as carpentry, plumbing, electrical
              work, and more. Post your DIY questions and receive answers from
              experienced enthusiasts or professionals.
            </p>

            <h2>Key Features</h2>
            <ul>
              <li>
                <strong>Ask Questions:</strong> Post your DIY-related questions
                and get insights from the community.
              </li>
              <li>
                <strong>Answer and Earn:</strong> Share your expertise by
                answering questions and earn monetary rewards when your answer
                is accepted.
              </li>
              <li>
                <strong>Upvote Content:</strong> Upvote helpful questions and
                answers to highlight valuable contributions.
              </li>
              <li>
                <strong>Monetary Transactions:</strong> Use dollars to post
                questions and earn them by providing accepted answers.
              </li>
            </ul>

            <h2>How It Works</h2>
            <ol>
              <li>
                <span>
                  <strong>Sign Up:</strong>{" "}
                  <Link to="/signup">Create an account</Link> to join the
                  community.
                </span>
              </li>
              <li>
                <span>
                  <strong>Ask a Question:</strong> Spend $5 to post a question
                  in your area of interest.
                </span>
              </li>
              <li>
                <span>
                  <strong>Receive Answers:</strong> Community members will
                  provide answers to your question.
                </span>
              </li>
              <li>
                <span>
                  <strong>Accept an Answer:</strong> Mark the most helpful
                  answer as accepted, rewarding the contributor with $5.
                </span>
              </li>
              <li>
                <span>
                  <strong>Contribute:</strong> Answer questions from others to
                  earn dollars.
                </span>
              </li>
            </ol>

            <h2>Get Started</h2>
            <p>
              Ready to dive in? Head over to the{" "}
              <Link to="/questions">Questions</Link> page to see what the
              community is discussing, or start by{" "}
              <Link to="/ask">asking your own question</Link>.
            </p>

            <p>
              If you're new, check out the <Link to="/guide">User Guide</Link>{" "}
              to learn more about how HandyHub works.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
