// AllTables.js

import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import "./page-styles.css";
import "./all-tables.css";
import Table from "../components/Table";

function AllTables() {
  // State variables for storing data for each table from the database.
  const [usersData, setUsersData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [answersData, setAnswersData] = useState([]);

  useEffect(() => {
    // Function to fetch data from Supabase for each table and set it in the corresponding state variable.
    const fetchData = async () => {
      const fetchTableData = async (tableName, setDataFunction) => {
        const { data, error } = await supabase.from(tableName).select("*");
        if (error) console.error(`Error fetching ${tableName}: `, error);
        else setDataFunction(data);
      };

      // Fetch data for each table
      fetchTableData("users", setUsersData);
      fetchTableData("questions", setQuestionsData);
      fetchTableData("answers", setAnswersData);
    };

    // Calls fetchData when the component mounts
    fetchData();
  }, []);

  // Column definitions for each table, specifying the keys to display.
  const usersColumns = [
    { key: "id", label: "User ID" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "balance", label: "Balance" },
    { key: "created_at", label: "Created At" },
  ];

  const questionsColumns = [
    { key: "id", label: "Question ID" },
    { key: "user_id", label: "User ID" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "image_url", label: "Image URL" },
    { key: "created_at", label: "Created At" },
    { key: "upvotes", label: "Upvotes" },
  ];

  const answersColumns = [
    { key: "id", label: "Answer ID" },
    { key: "question_id", label: "Question ID" },
    { key: "user_id", label: "User ID" },
    { key: "content", label: "Content" },
    { key: "created_at", label: "Created At" },
    { key: "is_accepted", label: "Is Accepted" },
    { key: "upvotes", label: "Upvotes" },
  ];

  return (
    <>
      <div className="all-tables-master-container">
        <div className="all-tables-container">
          <h2>Users:</h2>
          <Table columns={usersColumns} data={usersData} />

          <h2>Questions:</h2>
          <Table columns={questionsColumns} data={questionsData} />

          <h2>Answers:</h2>
          <Table columns={answersColumns} data={answersData} />
        </div>
      </div>
    </>
  );
}

export default AllTables;
