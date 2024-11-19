// Question.jsx
// Imports necessary modules and components, including Supabase for database operations.
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { format, compareAsc } from "date-fns";
import { useNavigate } from "react-router-dom";
import "../styles/NewQuestion.css";

const NewQuestion = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    image_url: "",
    upvotes: 0,
  });

  // State to store Alice's user ID
  const [userId, setUserId] = useState(null);

  // Fetch Alice's user ID when the component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("username", "alice")
        .single();

      if (error) {
        console.error("Error fetching user ID:", error);
      } else if (data) {
        setUserId(data.id);
      }
    };

    fetchUserId();
  }, []);

  const createQuestion = async (event) => {
    event.preventDefault();

    // Check if userId is available
    if (!userId) {
      alert("User ID not available.");
      return;
    }

    console.log(question);
    // Validate required fields
    if (!question.title || !question.description) {
      alert("Please provide both a title and a description.");
      return; // Stop form submission
    }

    // Get the current date and time
    const currentDateTime = new Date();

    const { data, error } = await supabase
      .from("questions")
      .insert([
        {
          user_id: userId, // Use Alice's user ID
          title: question.title,
          description: question.description,
          image_url: question.image_url,
          upvotes: 0,
          created_at: currentDateTime.toISOString(),
        },
      ])
      .select();

    window.location = "/feed";
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="create-master-container">
        <h1>Submit a New Question !</h1>

        <form>
          <div className="form-container">
            <div className="mini-container">
              <label htmlFor="title">Title:</label>
              <br />
              <input
                required
                type="text"
                id="title"
                name="title"
                placeholder="Enter CrewMates Name"
                onChange={handleChange}
              />
            </div>
            <div className="mini-container">
              <label htmlFor="description">Description:</label>
              <br />
              <input
                required
                type="text"
                id="description"
                name="description"
                placeholder="Insert description "
                onChange={handleChange}
              />
            </div>
            <div className="mini-container">
              <label htmlFor="image_url">Image (optional):</label>
              <br />
              <input
                type="url"
                id="image_url"
                name="image_url"
                placeholder="Insert Image Url "
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" onClick={createQuestion}>
            Submit a Question!
          </button>
        </form>
      </div>
    </>
  );
};

export default NewQuestion;
