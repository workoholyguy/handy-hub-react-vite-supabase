// Feed.jsx

import React from "react";
import Postcard from "../components/Postcard";
import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom"; // Hook to define our application's routes.
import { Link } from "react-router-dom"; // Link component for navigation.
import "./feed.css";
import { supabase } from "../client";

const Feed = () => {
  //   const [posts, setPosts] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);

  // const postsData = [
  //   {
  //     time: "2024-11-01T10:30:00Z",
  //     title: "Exploring JavaScript ES6 Features",
  //     description:
  //       "An in-depth guide on the new features of ES6 and how they improve JavaScript development.",
  //     url: "https://www.contractortalk.com/cdn-cgi/image/format=auto,onerror=redirect,width=640,height=640,fit=scale-down//media/tub-to-shower-okc-1.24873/full",
  //     upvotes: 120,
  //     comments: 45,
  //   },
  //   {
  //     time: "2024-11-02T15:45:00Z",
  //     title: "Understanding React Hooks",
  //     description:
  //       "A beginner's guide to understanding React Hooks and how to implement them in your projects.",
  //     url: "https://www.contractortalk.com/d3/xfmg/album_thumbnail/4/4915-fb05e2623315bfcf79aeff881614d487.jpg?1730204570",
  //     upvotes: 200,
  //     comments: 70,
  //   },
  //   {
  //     time: "2024-11-03T08:15:00Z",
  //     title: "CSS Grid vs. Flexbox: When to Use Each",
  //     description:
  //       "A comparative analysis of CSS Grid and Flexbox with practical examples and use cases.",
  //     url: "https://www.contractortalk.com/d3/xfmg/album_thumbnail/4/4909-96bf12ef7436a18d9c1a72381d1cdac0.jpg?1712518976",
  //     upvotes: 85,
  //     comments: 20,
  //   },
  //   {
  //     time: "2024-11-04T12:00:00Z",
  //     title: "Building Accessible Websites",
  //     description:
  //       "Learn the fundamentals of web accessibility and how to make your websites usable for all.",
  //     url: "https://www.contractortalk.com/d3/xfmg/album_thumbnail/4/4908-80fd0e23be9d163dc78f918371d6e355.jpg?1707969247",
  //     upvotes: 150,
  //     comments: 33,
  //   },
  //   {
  //     time: "2024-11-05T09:00:00Z",
  //     title: "Introduction to Node.js and Express",
  //     description:
  //       "Get started with backend development by learning Node.js and Express in this beginner's tutorial.",
  //     url: "https://www.contractortalk.com/d3/xfmg/album_thumbnail/4/4882-809562a2f2ea5c2ca95013d65bc444af.jpg?1652035941",
  //     upvotes: 95,
  //     comments: 28,
  //   },
  // ];

  useEffect(() => {
    // setPosts(postsData);

    const fetchData = async () => {
      const fetchTableData = async (tableName, setDataFunction) => {
        const { data, error } = await supabase.from(tableName).select("*");
        if (error) console.error(`Error Fetching ${tableName}: `, error);
        else setDataFunction(data);
      };

      fetchTableData("questions", setQuestionsData);
    };

    fetchData();
  }, []);

  //   console.log(questionsData);

  return (
    <div>
      <>
        <div className="feed-master-container">
          <div className="new-question-submission-container">
            <button>Submit a New Question</button>
          </div>
          <div className="questions-container">
            {questionsData.map((question, index) => {
              return (
                <Postcard
                  key={index}
                  id={question.id}
                  time={question.created_at}
                  title={question.title}
                  description={question.description}
                  url={question.image_url ? question.image_url : null}
                  upvotes={question.upvotes}
                  comments={question.comments ? question.comments : null}
                />
              );
            })}
            {/* {posts.map((posts, index) => (
              <Postcard
                key={index}
                time={posts.time}
                title={posts.title}
                description={posts.description}
                url={posts.url}
                upvotes={posts.upvotes}
                comments={posts.comments}
              />
            ))} */}
          </div>
        </div>
      </>
    </div>
  );
};

export default Feed;
