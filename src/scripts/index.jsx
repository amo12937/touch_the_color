import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import preventZoom from "./prevent_zoom"

document.addEventListener("DOMContentLoaded", () => {
  preventZoom(document);

  ReactDOM.render(
    <App />,
    document.getElementById("root")
  );
});

document.addEventListener("touchmove", (e) => {
  e.preventDefault();
});
