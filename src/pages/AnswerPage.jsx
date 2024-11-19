import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../client";
// import "../styles/answer-page.css";

const AnswerPage = () => {
  const { id: param_id } = useParams();
  const [question, setQuestion] = useState(null); // Store question details
  const [answers, setAnswers] = useState([]); // Store list of answers
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        setLoading(true);

        // Fetch question
        const { data: questionData, error: questionError } = await supabase
          .from("questions")
          .select("*")
          .eq("id", param_id)
          .single();

        if (questionError) throw questionError;

        setQuestion(questionData);

        // Fetch answers
        const { data: answersData, error: answersError } = await supabase
          .from("answers")
          .select("*")
          .eq("question_id", param_id)
          .order("upvotes", { ascending: false });

        if (answersError) throw answersError;

        setAnswers(answersData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [param_id]);

  const handleDeleteAnswer = async (answerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this answer? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("answers")
        .delete()
        .eq("id", answerId);

      if (error) throw error;

      // Remove the answer from local state
      setAnswers(answers.filter((answer) => answer.id !== answerId));
      alert("Answer deleted successfully.");
    } catch (err) {
      console.error("Error deleting answer:", err);
      alert("Failed to delete answer. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="answer-page-container">
      <h1>Answers for: {question.title}</h1>
      <p>{question.description}</p>
      <Link to={`/new-answer/${param_id}/${question.user_id}`}>
        Submit Your Answer
      </Link>
      <div className="answers-section">
        {answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.id} className="answer-card">
              <p>{answer.content}</p>
              <p>Upvotes: {answer.upvotes}</p>
              <button onClick={() => handleDeleteAnswer(answer.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No answers yet. Be the first to answer!</p>
        )}
      </div>
    </div>
  );
};

export default AnswerPage;
