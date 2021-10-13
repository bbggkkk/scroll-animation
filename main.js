(function(){
    const element   = document.querySelector('.box');
    const start     = 0;
    const end       = () => document.documentElement.scrollHeight - document.documentElement.offsetHeight;
    const animation = 'profile';
    
    window.scrollElement = new ScrollAnimation(element,window,animation,start,end);
    console.log(window.scrollElement);
})();

(function(){
    const element   = document.querySelector('#title');
    const start     = 0;
    const end       = () => document.documentElement.scrollHeight - document.documentElement.offsetHeight;
    const animation = 'title';
    
    element.scrollElement = new ScrollAnimation(element,window,animation,start,end);
})();