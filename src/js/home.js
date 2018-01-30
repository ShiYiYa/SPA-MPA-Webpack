import sayHello from './common';
import '../css/home.css';

sayHello();
var node=document.createElement("h1");
var textnode=document.createTextNode("Home");
node.appendChild(textnode);
document.getElementById('root').appendChild(node)