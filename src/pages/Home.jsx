import React from "react";
import { Link } from "react-router-dom";
import "./page-styles.css";
import "./home.css";

function Home() {
  return (
    <div className="home-master-container">
      <header className="home-header">
        <h1>Welcome to HandyHub!</h1>
        <p className="intro-text">
          HandyHub is the ultimate platform for DIY enthusiasts and professional
          handymen. Whether you're tackling a project or seeking expert advice,
          HandyHub connects you with a supportive community ready to help.
        </p>
      </header>

      <main className="home-content">
        <section className="about-section">
          <h2>About HandyHub</h2>
          <p>
            Our mission is to create a collaborative environment where users
            share knowledge, ask questions, and connect with professionals in
            carpentry, plumbing, electrical work, and more.
          </p>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Ask Questions:</strong> Post DIY questions and get
              community insights.
            </li>
            <li>
              <strong>Answer and Earn:</strong> Help others and earn rewards for
              accepted answers.
            </li>
            <li>
              <strong>Upvote Content:</strong> Highlight valuable contributions
              by upvoting.
            </li>
            <li>
              <strong>Monetary Transactions:</strong> Use dollars to post
              questions and earn them by helping others.
            </li>
          </ul>
        </section>

        <section className="how-it-works-section">
          <h2>How It Works</h2>
          <ol>
            <li>
              <strong>Sign Up:</strong>{" "}
              <Link to="/signup">Create an account</Link> to join the community.
            </li>
            <li>
              <strong>Ask a Question:</strong> Spend $5 to post a question.
            </li>
            <li>
              <strong>Receive Answers:</strong> Get insights from the community.
            </li>
            <li>
              <strong>Accept an Answer:</strong> Reward the most helpful
              response.
            </li>
            <li>
              <strong>Contribute:</strong> Help others and earn dollars.
            </li>
          </ol>
        </section>

        <section className="cta-section">
          <h2>Get Started</h2>
          <p>
            Ready to dive in? Visit the <Link to="/questions">Questions</Link>{" "}
            page or start by <Link to="/ask">asking your own question</Link>.
          </p>
          <p>
            If you're new, explore our <Link to="/guide">User Guide</Link> to
            learn how HandyHub works.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;
