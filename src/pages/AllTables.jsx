// AllTables.js

import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import "./page-styles.css";
import "./all-tables.css";
import Table from "../components/Table";
import { Link, useParams } from "react-router-dom";

function AllTables() {
  // State variables for storing data for each table from the database.
  const [profilesData, setProfilesData] = useState([]);
  // const [usersData, setUsersData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [answersData, setAnswersData] = useState([]);
  const [questionUpvotesData, setQuestionUpvotesData] = useState([]);

  useEffect(() => {
    // Function to fetch data from Supabase for each table and set it in the corresponding state variable.
    const fetchData = async () => {
      const fetchTableData = async (tableName, setDataFunction) => {
        const { data, error } = await supabase.from(tableName).select("*");
        if (error) console.error(`Error fetching ${tableName}: `, error);
        else setDataFunction(data);
      };

      // Fetch data for each table
      fetchTableData("profiles", setProfilesData);
      // fetchTableData("users", setUsersData);
      fetchTableData("questions", setQuestionsData);
      fetchTableData("answers", setAnswersData);
      fetchTableData("question_votes", setQuestionUpvotesData);
    };

    // Calls fetchData when the component mounts
    fetchData();
  }, []);

  // Column definitions for each table, specifying the keys to display.

  // const usersColumns = [
  //   { key: "id", label: "User ID" },
  //   { key: "username", label: "Username" },
  //   { key: "email", label: "Email" },
  //   { key: "balance", label: "Balance" },
  //   { key: "created_at", label: "Created At" },
  // ];

  const questionsColumns = [
    { key: "id", label: "Question ID" },
    { key: "user_email", label: "User Email" },
    // { key: "user_id", label: "User ID" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    // { key: "image_url", label: "Image URL" },
    { key: "created_at", label: "Created At" },
    { key: "upvotes", label: "Upvotes" },
  ];

  const answersColumns = [
    { key: "id", label: "Answer ID" },
    { key: "question_id", label: "Question ID" },
    // { key: "user_id", label: "User ID" },
    { key: "user_email", label: "User Email" },
    // { key: "user_id", label: "User ID" },
    { key: "content", label: "Content" },
    { key: "created_at", label: "Created At" },
    { key: "is_accepted", label: "Is Accepted" },
    { key: "upvotes", label: "Upvotes" },
  ];

  // Modify AllTables.js to Handle Null Values
  const profilesColumns = [
    { key: "id", label: "User ID" },
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "created_at", label: "Created At" },
  ];

  const questionUpvotesColumns = [
    { key: "id", label: "Vote Id " },
    { key: "user_id", label: "User Id " },
    { key: "question_id", label: "Question Id " },
    { key: "created_at", label: "Created At" },
  ];

  const renderCell = (key, row) => {
    if (!row[key]) {
      return <span style={{ color: "gray" }}>Unavailable</span>;
    }
    return row[key];
  };

  // console.log("Profiles Data:", profilesData);
  // // console.log("User Metadata:", session?.user?.user_metadata);
  // console.log(
  //   "Profiles Phone Column:",
  //   profilesData.map((row) => row.phone)
  // );

  const formatTime = (time) => {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <>
      {/* {console.log(profilesData)} */}
      <div className="all-tables-master-container">
        <div className="all-tables-container">
          <h2>
            Pick a Username from the table Below. Or SignUp Here{" "}
            <button>
              <Link to="/account"> Click here</Link>
            </button>
          </h2>
          <h3>Use: 'admin@example.com' as a login</h3>
          <h3>Use: 'admin' as a password</h3>
          <h3>Or Create a New User.</h3>
          <h2>Profiles:</h2>
          {/* <Table columns={profilesColumns} data={profilesData} /> */}
          <Table
            columns={profilesColumns}
            data={profilesData.map(
              (row) => ({
                ...row,
                full_name: row.full_name || "Default Name",
                email: row.email || "Unavailable",
                phone: row.phone || "N/A",
                created_at: formatTime(row.created_at) || "N/A",
              })
              // console.log(row)
            )}
          />
          {/* <h2>Users:</h2>
          <Table
            columns={usersColumns}
            data={usersData.map((row) => ({
              ...row,
              created_at: formatTime(row.created_at) || "N/A",
            }))}
          /> */}
          <h2>Questions:</h2>
          <Table
            columns={questionsColumns}
            data={questionsData.map((row) => ({
              ...row,
              created_at: formatTime(row.created_at) || "N/A",
            }))}
          />
          <h2>Answers:</h2>
          <Table
            columns={answersColumns}
            data={answersData.map((row) => ({
              ...row,
              created_at: formatTime(row.created_at) || "N/A",
            }))}
          />
          <h2>Question Upvotes:</h2>
          <Table
            columns={questionUpvotesColumns}
            data={questionUpvotesData.map((row) => ({
              ...row,
              created_at: formatTime(row.created_at) || "N/A",
            }))}
          />
        </div>
      </div>
    </>
  );
}

export default AllTables;
