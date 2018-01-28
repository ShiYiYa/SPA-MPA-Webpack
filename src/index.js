import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './author.jpg';

const Hello = () =><h1>The First React Webpack.</h1>;

ReactDOM.render(
  <Hello />,
  document.getElementById('root')
);

module.hot.accept();