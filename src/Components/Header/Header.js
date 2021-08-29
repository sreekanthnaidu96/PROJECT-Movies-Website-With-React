import React from "react";
import "./Header.css";

function Header() {
  return (
    <div>
      <span onClick={() => window.scrollTo(0, 0)} className="header">
        🎦 Movies Hub 📽
      </span>
    </div>
  );
}

export default Header;
