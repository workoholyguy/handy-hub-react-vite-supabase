// Account.jsx
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { format, compareAsc } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { id } from "date-fns/locale";

const Account = () => {
  return (
    <>
      <div className="master-account-container">Account Home Page</div>
    </>
  );
};

export default Account;
