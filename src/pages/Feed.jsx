import React, { useState, useEffect } from "react";
import Postcard from "../components/Postcard";
import { supabase } from "../client";
import "./feed.css";

const Feed = ({ session }) => {
  const [questionsData, setQuestionsData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("created_at"); // Default sort by time
  const [searchTerm, setSearchTerm] = useState(""); // Default search term is empty
  const [votedQuestions, setVotedQuestions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order(sortCriteria, { ascending: false })
        .ilike("title", `%${searchTerm}%`); // Filter by search term and sort dynamically

      if (error) {
        console.error(`Error fetching questions:`, error);
      } else {
        setQuestionsData(data);

        // Fetch user votes for questions to set initial voting state
        if (session) {
          const { data: votes, error: votesError } = await supabase
            .from("question_votes")
            .select("question_id")
            .eq("user_id", session.user.id);

          if (votesError) {
            console.error("Error Fetching Votes: ", votesError);
          } else {
            // Create a map of question IDs the user has voted for
            const initialVotedState = votes.reduce((acc, vote) => {
              acc[vote.question_id] = true;
              return acc;
            }, {});
            setVotedQuestions(initialVotedState);
          }
        }
      }
    };

    fetchData();
  }, [sortCriteria, searchTerm]); // Re-fetch whenever sort criteria or search term changes

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteQuestion = async (questionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("id", questionId);

      if (error) throw error;

      // Remove the question from local state
      setQuestionsData(questionsData.filter((q) => q.id !== questionId));
      alert("Question deleted successfully.");
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("Failed to delete question. Please try again.");
    }
  };

  // Get the current date and time
  const currentDateTime = new Date();
  // Check if the user has already upvoted this question
  const handleUpvote = async (questionId, currentUpvotes) => {
    try {
      // Check if the user has already upvoted this question
      if (votedQuestions[questionId]) {
        // User is Unvoting
        const { error: removeError } = await supabase
          .from("question_votes")
          .delete()
          .eq("user_id", session?.user?.id)
          .eq("question_id", questionId);

        if (removeError) throw removeError;

        // Update local State
        setQuestionsData(
          questionsData.map((question) =>
            question.id === questionId
              ? { ...question, upvotes: currentUpvotes - 1 }
              : question
          )
        );
        setVotedQuestions((prev) => ({ ...prev, [questionId]: false }));
      } else {
        // User is Upvoting
        const { error: insertError } = await supabase
          .from("question_votes")
          .insert([
            {
              user_id: session?.user?.id,
              question_id: questionId,
              // created_at: currentDateTime.toISOString(),
            },
          ])
          .select();

        if (insertError) throw insertError;

        // Update local state (Increment)
        setQuestionsData(
          questionsData.map((question) =>
            question.id === questionId
              ? { ...question, upvotes: currentUpvotes + 1 }
              : question
          )
        );
        // Convert the upvote text from "Upvote" to "Unvote"
        setVotedQuestions((prev) => ({ ...prev, [questionId]: true }));
      }
      // const { data: existingVote, error: checkError } = await supabase
      //   .from("question_votes")
      //   .select("*")
      //   .eq("user_id", session?.user?.id)
      //   .eq("question_id", questionId)
      //   .single();

      // if (checkError && checkError.code !== "PGRST116") {
      //   throw checkError;
      // }

      // if (existingVote) {
      //   // alert("You have already upvoted this question.");
      //   const { error: removeError } = await supabase
      //     .from("question_votes")
      //     .delete()
      //     .eq("user_id", session?.user?.id)
      //     .eq("question_id", questionId);

      //   if (removeError) throw removeError;
      //   // Update local state
      //   setQuestionsData(
      //     questionsData.map((question) =>
      //       question.id === questionId
      //         ? { ...question, upvotes: currentUpvotes - 1 }
      //         : question
      //     )
      //   );
      //   // Convert the upvote text from "Unvote" to "Upvote"
      //   setVotedQuestions(false);
      //   return;
      // }
    } catch (err) {
      console.error("Error upvoting question:", err);
      alert("Failed to upvote. Please try again.");
    }
  };

  return (
    <div>
      <div className="feed-master-container">
        <div className="control-container">
          <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortCriteria} onChange={handleSortChange}>
              <option value="created_at">Created Time</option>
              <option value="upvotes">Upvotes</option>
            </select>
          </div>
          <div className="search-container">
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="questions-container">
          {questionsData.map((question, index) => (
            <div key={index} className="post-container">
              <Postcard
                id={question.id}
                time={question.created_at}
                title={question.title}
                description={question.description}
                url={question.image_url || null}
                upvotes={question.upvotes}
                onUpvote={session ? handleUpvote : null} // Only allow upvoting for logged-in users
                with_upvote={true}
                has_voted={!!votedQuestions[question.id]}
              />
              {/* <button
                className="delete-btn btn-logout"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                Delete Question
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
