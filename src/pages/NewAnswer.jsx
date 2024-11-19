// Imports necessary modules and components, including Supabase for database operations.
import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/NewAnswer.css";

const NewAnswer = () => {
  const navigate = useNavigate();
  const { id: param_id, user_id: param_user_id } = useParams(); // Destructure parameters
  const [question, setQuestion] = useState(null); // Store question details
  const [answer, setAnswer] = useState(""); // Store answer content
  const [error, setError] = useState(null); // Handle errors

  // Fetch the question data when the component mounts
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("id", param_id)
          .single();

        if (error) throw error;

        setQuestion(data);
      } catch (err) {
        console.error("Error fetching question:", err);
        setError("Failed to load question. Please try again later.");
      }
    };

    fetchQuestion();
  }, [param_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!answer) {
      alert("Please provide your answer content.");
      return;
    }

    const currentDateTime = new Date().toISOString();

    try {
      const { error } = await supabase.from("answers").insert([
        {
          question_id: param_id,
          user_id: param_user_id,
          content: answer,
          upvotes: 0,
          created_at: currentDateTime,
        },
      ]);

      if (error) throw error;

      alert("Answer submitted successfully!");
      navigate(`/answer-page/${param_id}`);
    } catch (err) {
      console.error("Error submitting answer:", err);
      alert("Failed to submit answer. Please try again.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!question) return <p>Loading question...</p>;

  return (
    <div className="new-answer-container">
      <h1>Submit Your Answer</h1>
      <div className="question-details">
        <h2>Question: {question.title}</h2>
        <p>{question.description}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="answer">Your Answer:</label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            required
          />
        </div>
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
};

export default NewAnswer;
