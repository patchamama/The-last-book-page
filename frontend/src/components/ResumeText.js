// React / router
import React, { useState } from "react";
// Styles
import styles from "../styles/ResumeText.module.css";

const ResumeText = ({ text, size = 300 }) => {
  const [textResume, setTextResume] = useState(text.slice(0, size));
  const [textExpanded, setTextExpanded] = useState(text.length > size);

  const handleLink = () => {
    setTextResume(text);
    setTextExpanded(!textExpanded);
  };

  return (
    <>
      {textResume}
      {textExpanded && "..."}
      {textExpanded && (
        <span className={styles.Link} onClick={handleLink}>
          Continue reading
        </span>
      )}
    </>
  );
};

export default ResumeText;
