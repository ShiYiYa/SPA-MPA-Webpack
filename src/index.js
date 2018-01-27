import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

const Hello = () =><h1>The First React Webpack.</h1>;

ReactDOM.render(
  <Hello />,
  document.getElementById('app')
);

module.hot.accept();