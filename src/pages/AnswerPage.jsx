// AnswerPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../client";
import "./page-styles.css";
import "./answer-page.css";
import { format, compareAsc } from "date-fns";
import Answer from "../components/Answer";
import { id } from "date-fns/locale";

const AnswerPage = (props) => {
  const formatTime = function (time) {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      timeStyle: "short",
    }).format(date);
  };
  const { id: param_id } = useParams();
  const [question_with_answers_and_users, setQuestion_with_answers_and_users] =
    useState(null);
  //   const [answerData, setAnswersData] = useState([]);
  //   const [usersData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Question
        const { data, error } = await supabase
          .from("question_with_answers_and_users")
          .select("*")
          .eq("question_id", param_id);
        //   .order("question_created_at", { ascending: false });

        if (error) console.error("Error fetching view:", error);
        else console.log("View Data:", data);
        setQuestion_with_answers_and_users(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="master-answer-page-container">
        <h1>Answer Page:</h1>
        <Link
          to={
            "/new-answer/" +
            param_id +
            "/" +
            "bcb12489-9986-4ad6-a9b3-9fb503eb16d5"
          }
        >
          Submit Your Own Answer
        </Link>
        <div className="question-container">
          {question_with_answers_and_users ? (
            <>
              <h1>{question_with_answers_and_users[0].question_title}</h1>
              <h2>{question_with_answers_and_users[0].question_description}</h2>
              <h3></h3>
            </>
          ) : (
            <p>Loading ...</p>
          )}
        </div>
        <div className="answer-container">
          <h2>Answers:</h2>
          {question_with_answers_and_users.length > 0 ? (
            <>
              {question_with_answers_and_users.map((row, index) => (
                <Answer
                  key={index}
                  answerId={row.answer_id}
                  content={row.answer_content}
                  created_at={row.answer_created_at}
                  upvotes={row.answer_upvotes}
                  accepted={row.answer_is_accepted}
                  name={row.answer_username} // Ensure `usersData` exists
                />
              ))}
            </>
          ) : (
            <p>No answers yet. Be the first to answer!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AnswerPage;
