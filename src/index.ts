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

declare global {
    interface Window {
        ScrollAnimation : Function;
    }
}

if(!(typeof exports === 'object' && typeof module !== 'undefined')){
    window.ScrollAnimation = ScrollAnimation;
}
console.log(new ScrollAnimation(window, '.target'));