import { createKeyframes } from "./createKeyframes";
import { getCSSAttribute } from "./inlineAnimationParser";

import { play, gotoAndStop } from "./createKeyframes";
import { ScrollAnimation, ScrollAnimationItem } from "./scrollAnimation";

// const animation = {
//     '0' : {
//         transform:'translate(0px, 0px)',
//         opacity:0.5,
//         background:'blue'
//     },
//     '50'  : {
//         transform:() => `translate(0px, ${document.documentElement.offsetHeight-300}px)`,
//         background:'red'
//     },
//     '100' : {
//         transform:'translate(0px, 0px)',
//         opacity:1,
//         background:'#1a1a1a'
//     }
// }
// const op = {
//     fnKeys : {
//         '50' : [ 'transform' ]
//     }
//     ,colorKeys : {
//         '0'   : [ 'background' ],
//         '50'  : [ 'background' ],
//         '100' : [ 'background' ]
//     }
// };

const target     = document.querySelectorAll('.box');
const scrollBody = window;
const scrollEle  = scrollBody === window ? document.documentElement : scrollBody;

const targets    = [...target];
const ups        = targets.map(item => {
    const [updator, getKeyframe] = createKeyframes(getCSSAttribute(item as HTMLElement), 10);
    console.log(new ScrollAnimationItem(item as HTMLElement));
    // return createKeyframes(getCSSAttribute(item as HTMLElement), 10);
});


// console.log(new ScrollAnimation(window, 'div'));