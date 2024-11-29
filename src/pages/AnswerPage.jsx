import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import Answer from "../components/Answer";
import { Link } from "react-router-dom";

const AnswerPage = () => {
  const { id: param_id } = useParams(); // Get question ID from URL params
  const [question, setQuestion] = useState(null); // Store question details
  const [answers, setAnswers] = useState([]); // Store answers with author info
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        setLoading(true);

        // Fetch the question
        const { data: questionData, error: questionError } = await supabase
          .from("questions")
          .select("*")
          .eq("id", param_id)
          .single();

        if (questionError) throw questionError;
        setQuestion(questionData);

        // Fetch answers with author info (LEFT JOIN equivalent)
        const { data: answersData, error: answersError } = await supabase
          .from("answers")
          .select("*, profiles(full_name, email)") // Join profiles table to fetch full_name
          .eq("question_id", param_id)
          .order("upvotes", { ascending: false });

        if (answersError) throw answersError;
        setAnswers(answersData); // Store answers with author info
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [param_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log(answers);
  return (
    <div className="answer-page-container">
      <h1>Answers for: {question?.title}</h1>
      <p>{question?.description}</p>
      <div className="submit-answer-container">
        <Link to={`/new-answer/${param_id}/${question.user_id}`}>
          <button className="submit-answer-btn">Submit Your Answer</button>
        </Link>
      </div>

      <div className="answers-section">
        {answers.length > 0 ? (
          answers.map((answer) => (
            <Answer
              key={answer.id}
              answerId={answer.id}
              name={answer.profiles?.full_name || "Unknown User"} // Use joined full_name
              author={answer.profiles?.email || "Unknown User"} // Use joined full_name
              content={answer.content}
              created_at={answer.created_at}
              accepted={answer.is_accepted}
            />
          ))
        ) : (
          <p>No answers yet. Be the first to answer!</p>
        )}
      </div>
    </div>
  );
};

export default AnswerPage;
