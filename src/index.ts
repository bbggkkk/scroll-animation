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
const hi  = () => { return (document.querySelector('#height') as HTMLElement).offsetHeight - document.documentElement.offsetHeight; }
const box = document.querySelector('.box') as HTMLElement;
const ani = getCSSAttribute(box);
console.log(ani, animation);
const [updator2, getKeyframe2] = createKeyframes(ani, hi);
// const [updator2, getKeyframe2] = createKeyframes(ani, hi, op);
let data;


const res = () => {
    updator2().then(val => {
        data = val;
        gotoAndStop(box, data, Math.round(document.documentElement.scrollTop));
        const range = document.querySelector('input');
        range.setAttribute('max', String(data.length - 1));
        window.addEventListener('scroll', (e) => {
            const i = Math.round(document.documentElement.scrollTop) > hi() ? hi() : Math.round(document.documentElement.scrollTop);
            gotoAndStop(box, data, i);
            range.value = String(i);
        })
    
        range.addEventListener('input', (e) => {
            gotoAndStop(box, data, Number((e.target as HTMLInputElement).value));
            window.scroll(0, Number((e.target as HTMLInputElement).value) );
        });
    });

}   

const ro = new ResizeObserver(res);
ro.observe(document.documentElement);
// res();
// window.addEventListener('resize', res)


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



