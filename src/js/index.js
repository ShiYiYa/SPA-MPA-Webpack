import '../css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import '../img/author.jpg';
import sayHello from './common';

const Hello = () =><h1>The First React Webpack.</h1>;
sayHello();


ReactDOM.render(
  <Hello />,
  document.getElementById('root')
);

/**以下为热加载配置 */
module.hot.accept();