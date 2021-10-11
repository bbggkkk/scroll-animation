const element = document.querySelectorAll('[data-scroll-animation]');
for(let i=0; i<element.length; i++){
    element[i].scrollAnimation = new ScrollAnimation(element[i],window,element[i].getAttribute('data-scroll-animation'));
}