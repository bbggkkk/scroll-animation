const element   = document.querySelector('.box');
const start     = 0;
const end       = () => document.documentElement.scrollHeight - document.documentElement.offsetHeight;
const animation = 'profile';

window.scrollElement = new ScrollAnimation(element,window,animation,start,end);
console.log(window.scrollElement);