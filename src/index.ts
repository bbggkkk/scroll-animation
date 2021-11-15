import { createKeyframes } from "./createKeyframes";

const animation = {
    '0' : {
        transform:'translate(0px, 0px)',
        opacity:0,
        background:'#f2f2f2'
    },
    '50'  : {
        transform:() => `translate(0px, ${document.documentElement.offsetHeight-300}px)`,
        background:'blue'
    },
    '100' : {
        transform:'translate(0px, 0px)',
        opacity:1,
        background:'#1a1a1a'
    }
}
const op = {
    fnKeys : {
        '50' : [ 'transform' ]
    }
    ,colorKeys : {
        '0'   : [ 'background' ],
        '50'  : [ 'background' ],
        '100' : [ 'background' ]
    }
};
const [updator, getKeyframe] = createKeyframes(animation, document.documentElement.scrollHeight - document.documentElement.offsetHeight, op);

const box = document.querySelector('.box');
let val;

updator().then(data => val=data);
window.addEventListener('scroll', () => {
    Object.keys(val[0]).forEach(item => {
        (box as HTMLElement).style[item] = val[document.documentElement.scrollTop][item];
    })
})

// import { ScrollAnimation } from "./scrollAnimation";

// new ScrollAnimation(document.querySelector('.box') as HTMLElement, window, 0, 120);