import React from 'react';
import ReactDom from 'react-dom';
import App from './component/app';
import { test } from './notUse';

test();
ReactDom.render(<App/>, document.getElementById('root'));
