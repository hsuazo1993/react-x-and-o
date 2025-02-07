import React from "react";
import "./SupportLinks.css";
import { FaGithub } from "react-icons/fa";
import { SiKofi } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";
import { SiUpwork } from "react-icons/si";

function SupportLinks() {
  return (
    <div className="support-links">
      <a
        href="https://github.com/hsuazo1993/react-x-and-o"
        target="_blank"
        rel="noopener noreferrer"
        className="support-link github-link"
        aria-label="Visit GitHub Repository"
      >
        <FaGithub />
        <span>GitHub</span>
      </a>
      <a
        href="https://ko-fi.com/hosnisuazo"
        target="_blank"
        rel="noopener noreferrer"
        className="support-link kofi-link"
        aria-label="Support me on Ko-fi"
      >
        <SiKofi />
        <span>Ko-fi</span>
      </a>
      <a
        href="https://www.linkedin.com/in/hosni-suazo-863b69267/"
        target="_blank"
        rel="noopener noreferrer"
        className="support-link linkedin-link"
        aria-label="Visit LinkedIn Profile"
      >
        <SiLinkedin />
        <span>LinkedIn</span>
      </a>
      <a
        href="https://www.upwork.com/fl/~011269cc1f82138d19"
        target="_blank"
        rel="noopener noreferrer"
        className="support-link upwork-link"
        aria-label="Visit Upwork Profile"
      >
        <SiUpwork />
        <span>Upwork</span>
      </a>
    </div>
  );
}

export default SupportLinks;
