import { createKeyframes } from "./createKeyframes";
import { getCSSAttribute } from "./scrollAnimation";

import { play, gotoAndStop } from "./createKeyframes";

const animation = {
    '0' : {
        transform:'translate(0px, 0px)',
        opacity:0.5,
        background:'blue'
    },
    '50'  : {
        transform:() => `translate(0px, ${document.documentElement.offsetHeight-300}px)`,
        background:'red'
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

let val;
const box = document.querySelector('.box') as HTMLElement;
const [updator2, getKeyframe2] = createKeyframes(animation, 1000, op);

updator2().then(data => {
    // play(box, data);
    console.log(data);
    const range = document.querySelector('input');
    range.setAttribute('max', String(data.length - 1));
    range.addEventListener('input', (e) => {
        gotoAndStop(box, data, Number((e.target as HTMLInputElement).value))
    });
});
// const [updator, getKeyframe] = createKeyframes(getCSSAttribute(box), ()=>document.documentElement.scrollHeight - document.documentElement.offsetHeight);
// updator().then(data => val = data );

// window.addEventListener('scroll', async () => {
//     requestAnimationFrame(async () => {
//         console.time('start');
//         const idx = val !== undefined ?
//                     document.documentElement.scrollTop < 0 ?
//                     0 : document.documentElement.scrollTop >= val.length ?
//                     val.length-1 : document.documentElement.scrollTop
//                     : document.documentElement.scrollTop;
//         const i = Math.round(idx);
//         let style = val !== undefined ? val[i] : await getKeyframe(i);
//         Object.keys(style).forEach(async item => {
//             box.style[item] = style[item];
//         });
//         console.timeEnd('start');
//     });
// });
// window.addEventListener('resize', async () => {
//     requestAnimationFrame(async () => {
//         updator().then(data => val = data );
//     });
// });



