import React from "react";
import { format, compareAsc } from "date-fns";

const formatTime = (time) => {
  const date = new Date(time);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export default formatTime;
