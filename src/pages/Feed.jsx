import React, { useState, useEffect } from "react";
import Postcard from "../components/Postcard";
import { supabase } from "../client";
import "./feed.css";

const Feed = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("created_at"); // Default sort by time
  const [searchTerm, setSearchTerm] = useState(""); // Default search term is empty

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
            <Postcard
              key={index}
              id={question.id}
              time={question.created_at}
              title={question.title}
              description={question.description}
              url={question.image_url || null}
              upvotes={question.upvotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
