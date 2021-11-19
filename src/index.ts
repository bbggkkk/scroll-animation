import { createKeyframes } from "./createKeyframes";
import { getCSSAttribute } from "./inlineAnimationParser";

import { play, gotoAndStop } from "./createKeyframes";

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

const target = document.querySelectorAll('.box');
const lg     = [...target];

lg.forEach(item => {
    createKeyframes(getCSSAttribute(item as HTMLElement), 10)[0]().then(data => {
        console.log(data);
    });
});
