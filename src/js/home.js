import sayHello from './common';

sayHello();
var node=document.createElement("h1");
var textnode=document.createTextNode("Home");
node.appendChild(textnode);
document.getElementById('root').appendChild(node)