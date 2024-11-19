// NewAnswer.jsx
// Imports necessary modules and components, including Supabase for database operations.
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { format, compareAsc } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { id } from "date-fns/locale";

const NewAnswer = () => {
  const navigate = useNavigate();
  const { id: param_id } = useParams();
  const { user_id: param_user_id } = useParams();
  const [questionToBeAnswered, setQuestionToBeAnswered] = useState([]);
  const [answer, setAnswer] = useState({
    question_id: "",
    user_id: "", // Use Alice's user ID
    content: "",
    upvotes: 0,
  });

  // State to store Alice's user ID
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch Alice's user ID when the component mounts
  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const { data, error } = await supabase
          .from("question_with_answers_and_users")
          .select("*")
          .eq("question_id", param_id);

        if (error) console.error("Error fetching view:", error);
        else console.log("View Data:", data);
        setQuestionToBeAnswered(data);
        // Temporarily setting the username of an answering person to the owner of the question
        setUserId(param_user_id);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchQuestionData();
  }, [param_id]);

  const createAnswer = async (event) => {
    event.preventDefault();

    console.log(answer);
    // Validate required fields
    if (!answer.content) {
      alert("Please provide an Answer");
      return; // Stop form submission
    }

    // Get the current date and time
    const currentDateTime = new Date();

    const { data, error } = await supabase
      .from("answers")
      .insert([
        {
          question_id: param_id,
          user_id: userId, // Use Alice's user ID
          content: answer.content,
          upvotes: 0,
          created_at: currentDateTime.toISOString(),
        },
      ])
      .select();

    // window.location = `/answer-page/${param_id}`;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnswer((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="create-master-container">
        <h1>Submit a New answer !</h1>
        <h2>
          Question: <br />
        </h2>
        {questionToBeAnswered.length > 0 ? (
          <>
            <h3>{questionToBeAnswered[0].question_title}</h3>
          </>
        ) : (
          <h3>Loading The Question...</h3>
        )}
        {/* {questionToBeAnswered[0].question_title} */}

        <form>
          <div className="form-container">
            <div className="mini-container">
              <label htmlFor="content">What Do You Have to Say?</label>
              <br />
              <input
                required
                type="text"
                id="content"
                name="content"
                placeholder="Enter Your Response"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" onClick={createAnswer}>
            Submit a answer!
          </button>
        </form>
      </div>
    </>
  );
};

export default NewAnswer;
