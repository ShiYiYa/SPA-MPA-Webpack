import React from 'react';
import ReactDom from 'react-dom';
import './app.css';
import img from '../../img/hello.png'


const App = () =>(
  <div>
    <img src={img} alt='hello'/>
    <h1>React App!</h1>
  </div>
)

export default App;