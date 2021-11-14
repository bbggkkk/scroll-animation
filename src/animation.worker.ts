// import { colors, colorReg } from './colorMap';

interface option {
    fnKeys?:fnKeys,
    colorKeys?:colorKeys
}
interface fnKeys {
    [index:string] : Array<string>
}
interface colorKeys {
    [index:string] : Array<string>
}

interface animation {
    [index:string] : animationValue|undefined
}
interface animationValue {
    [index:string] : number|string|Function
}


const getAnimationProps = (animation:animation) => {
    const ani = Object.values(animation);
    return [...new Set(ani.map(item => Object.keys(item)).flat())];
}

const fillUndefinedProp = (animation:animation, baseProp:animationValue, keyframeKeys:Array<string>, props:Array<string>) => {
    return keyframeKeys.reduce((acc:animation, item:string) => {
        acc[item] = Object.assign({}, baseProp, animation[item]);
        return acc;
    },{});
}


onmessage = ({data}) => {
    const {animation, length, fnKeys, colorKeys} = data;
    const base         = length/100;
    const keyframeKeys = Object.keys(animation);
    const baseKeyframe = keyframeKeys.map(item => Math.round(base * parseInt(item)));
    const props = getAnimationProps(animation);
    const baseProp = props.reduce((acc:animationValue, item:string) => {
        acc[item] = undefined;
        return acc;
    },{})
    
    const animationKeyframe = new Array(length).fill(baseProp);

    const undefinedAnimation = fillUndefinedProp(animation, baseProp, keyframeKeys, props);
    keyframeKeys.forEach((item, idx) => {
        animationKeyframe[baseKeyframe[idx]] = undefinedAnimation[item];
    });
    // console.log(animationKeyframe);

    postMessage(animationKeyframe);
    // close();
}