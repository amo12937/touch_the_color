import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  );
});

document.addEventListener("touchmove", (e) => {
  e.preventDefault();
});
