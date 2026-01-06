import React from "react";
import { useParams } from "react-router-dom";

function Topic({ title }) {
  const params = useParams();

  let displayTitle = title;
  if (!displayTitle && params.challenge) {
    displayTitle = params.challenge
      .replace(/-/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>{displayTitle || "Topic"}</h1>
      <p>Questions and practice content will appear here.</p>
    </div>
  );
}

export default Topic;
