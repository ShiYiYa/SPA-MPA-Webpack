import React from "react";
import ReactDom from "react-dom";
import "./app.css";
import img from "../../img/hello.png";

const App = () => (
  <div>
    <img src={img} alt="hello" />
    <a href="about.html">
      <h1>React App!</h1>
    </a>
  </div>
);

export default App;
