import { createKeyframes } from "./createKeyframes";
import { getCSSAttribute } from "./scrollAnimation";

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
// const [updator, getKeyframe] = createKeyframes(animation, 1000, op);
// const [updator, getKeyframe] = createKeyframes(animation, document.documentElement.scrollHeight - document.documentElement.offsetHeight, op);
// const box = document.querySelector('.box');

let val;
// const target = document.querySelector('#target') as HTMLElement;

const box = document.querySelector('.box') as HTMLElement;
const [updator, getKeyframe] = createKeyframes(getCSSAttribute(box), ()=>document.documentElement.scrollHeight - document.documentElement.offsetHeight);
updator().then(data => val=data);

window.addEventListener('scroll', async () => {
    requestAnimationFrame(async () => {
        const idx = document.documentElement.scrollTop;
        let style = val === undefined ? await getKeyframe(idx) : val[idx];
        Object.keys(style).forEach(async item => {
            box.style[item] = style[item];
        });
    });
})
window.addEventListener('resize', async () => {
    requestAnimationFrame(async () => {
        val = undefined;
        updator().then(data => val=data);
    });
})



