import React from "react";
import { Link } from "react-router-dom";
import "./page-styles.css";
import "./home.css";
import background from "../assets/Home-Backdrop.webp";
import colorPallete from "../assets/Color Palette.webp";
// import backgroundLong from "../assets/BackDropCask.webp";
import "./page-styles.css";

function Home() {
  // const backgroundStyle = {
  //   // backgroundImage: `url(${background})`, // Use template literal to wrap the path in url()
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   height: "100vh", // Covers full viewport height
  //   width: "100%", // Covers full width
  //   // display: "flex",
  // };
  return (
    <>
      <div className="home-master-container">
        {/* <img src={backgroundLong} alt="Background" className="header-image" /> */}
        <header className="home-header">
          <div className="home-title">
            <h1>Welcome to HandyHub!</h1>
            <h3>
              <button className="home-title-btn">
                <Link to="/account">Login/Sign Up Here</Link>
              </button>{" "}
            </h3>
          </div>

          <p className="intro-text">
            HandyHub is the ultimate platform for DIY enthusiasts and
            professional handymen. Whether you're tackling a project or seeking
            expert advice, HandyHub connects you with a supportive community
            ready to help.
          </p>
        </header>

        <main className="home-content">
          <section className="about-section">
            <div className="title-background">
              <h2>About HandyHub</h2>
            </div>
            <p>
              Our mission is to create a collaborative environment where users
              share knowledge, ask questions, and connect with professionals in
              carpentry, plumbing, electrical work, and more.
            </p>
          </section>
          <section className="mission-section">
            <div className="title-background">
              <h2>Mission:</h2>{" "}
            </div>

            <p>
              Our mission is to create a collaborative environment where users
              share knowledge, ask questions, and connect with professionals in
              carpentry, plumbing, electrical work, and more.
            </p>
          </section>

          <section className="features-section">
            <div className="title-background">
              <h2>Key Features</h2>
            </div>
            <div className="features-container">
              <div className="features-container-left">
                <div className="feature-item">
                  <h3>Ask and Answer Questions</h3>
                  <p>Post your questions and get expert advice.</p>
                  <p>Explore a community-driven Q&A system.</p>
                </div>
                <div className="feature-item">
                  <h3>Customizable Profiles</h3>
                  <p>Showcase your skills and connect with others.</p>
                  <p>View profiles of contributors to find trusted advice.</p>
                </div>
                <div className="feature-item">
                  <h3>Voting System</h3>
                  <p>
                    Upvote helpful answers to highlight the best contributions.
                  </p>
                  <p>Earn rewards for providing valuable insights.</p>
                </div>
              </div>
              <div className="features-container-right">
                <div className="feature-item">
                  <h3>Easy-to-Use Platform</h3>
                  <p>
                    Enjoy a clean, responsive design for effortless navigation.
                  </p>
                  <p>Learn and share through an intuitive interface.</p>
                </div>
                <div className="feature-item">
                  <h3>Earn and Spend</h3>
                  <p>
                    Post questions with small incentives to get better answers.
                  </p>
                  <p>Earn rewards for sharing your expertise.</p>
                </div>
                <div className="feature-item">
                  <h3>Collaborative Learning</h3>
                  <p>
                    Connect with a supportive network of DIYers and
                    professionals.
                  </p>
                  <p>
                    Share knowledge in carpentry, plumbing, electrical work, and
                    more.
                  </p>
                </div>
                <div className="feature-item">
                  <h3>Modern Technology</h3>
                  <p>
                    Fast and reliable with a secure backend for smooth
                    interactions.
                  </p>
                  <p>Scalable for future growth and new features.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="how-it-works-section">
            <div className="title-background">
              <h2>How It Works</h2>
            </div>
            <ol>
              <li>
                <strong>Sign Up:&nbsp;</strong>{" "}
                <Link to="/account">&nbsp;Create an account</Link> &nbsp;to join
                the community.
              </li>
              <li>
                <strong>Ask a Question:</strong> Spend $5 to post a question.
              </li>
              <li>
                <strong>Receive Answers:</strong> Get insights from the
                community.
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
            <div className="title-background">
              <h2>Get Started</h2>
            </div>
            <p>
              Ready to dive in? Visit the <Link to="/feed">Questions</Link> page
              or start by{" "}
              <Link to="/new-question">asking your own question</Link>.
            </p>
            <p>
              If you're new, explore our <Link to="/">User Guide</Link> to learn
              how HandyHub works.
            </p>
          </section>
        </main>
      </div>
      {/* <img src={colorPallete} alt="" /> */}
    </>
  );
}

export default Home;
