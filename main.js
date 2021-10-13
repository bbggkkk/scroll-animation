(function(){
    const element   = document.querySelector('.box');
    const start     = 0;
    const end       = () => document.documentElement.scrollHeight - document.documentElement.offsetHeight;
    const animation = 'profile';
    
    element.scrollElement = new ScrollAnimation(element,window,animation,start,end);
    console.log(element.scrollElement);
})();
(function(){
    const element   = document.querySelector('.box > p');
    const start     = 0;
    const end       = () => document.documentElement.scrollHeight - document.documentElement.offsetHeight;
    const animation = 'hello';
    
    element.scrollElement = new ScrollAnimation(element,window,animation,start,end);
})();

(function(){
    const element   = document.querySelector('#title');
    const start     = 0;
    const end       = () => (document.documentElement.scrollHeight - document.documentElement.offsetHeight)/2;
    const animation = 'title';
    
    element.scrollElement = new ScrollAnimation(element,window,animation,start,end);
})();