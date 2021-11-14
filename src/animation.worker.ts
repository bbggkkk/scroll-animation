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

const numeric = new RegExp('\\-?\\d{0,}\\.?\\d+','g');

const getAnimationProps = (animation:animation) => {
    const ani = Object.values(animation);
    return [...new Set(ani.map(item => Object.keys(item)).flat())];
}

const fillUndefinedProp = (animation:animation, baseProp:animationValue, baseKeyframe:Array<number>, keyframeKeys:Array<string>, props:Array<string>) => {
    return keyframeKeys.reduce((acc:animation, item:string, idx:number) => {
        acc[item] = props.reduce(($acc:animationValue, $item:string) => {
            $acc[$item] = animation[item][$item];
            if($acc[$item] === undefined){
                const [prev, pv] = findPrev(animation, idx, $item, keyframeKeys);
                const [next, nv] = findNext(animation, idx, $item, keyframeKeys);

                const pa         = animation[prev][$item];
                const na         = animation[next][$item];

                const prevMatch = String(pa).match(numeric);
                const dval = String(na).match(numeric).map(($$item, $$idx) => {
                    return parseFloat((parseInt(prevMatch[$$idx]) + ((parseInt($$item) - parseInt(prevMatch[$$idx]))/((baseKeyframe[nv] - baseKeyframe[pv])/baseKeyframe[idx]))).toFixed(3));
                })
                let cnt = 0;
                const aval = String(na).replace(numeric, () => {
                    const returnValue = dval[cnt];
                    cnt++;
                    return String(returnValue);
                });
                $acc[$item] = isNaN(Number(aval)) ? aval : Number(aval);
            }
            return $acc;
        },{});
        return acc;
    },{});
}

const fillProps = (animation:animation, animationKeyframe:Array<animationValue>, keyframeKeys:Array<string>, props:Array<string>) => {
    // findPrevNext(animation, 20, keyframeKeys);
}
// const findPrevNext = (animation:animation, idx:number, keyframeKeys:Array<string>) => {

//     keyframeKeys.some((item, idx) => {

//     });
// }


const findPrev = (animation:animation, idx:number, prop:string, keyframeKeys:Array<string>) => {
    const val = idx-1;
    if(animation[keyframeKeys[val]][prop] !== undefined){
        return [keyframeKeys[val], val];
    }else{
        findPrev(animation, val, prop, keyframeKeys);
    }
}
const findNext = (animation:animation, idx:number, prop:string, keyframeKeys:Array<string>) => {
    const val = idx+1;
    if(animation[keyframeKeys[val]][prop] !== undefined){
        return [keyframeKeys[val], val];
    }else{
        findNext(animation, val, prop, keyframeKeys);
    }
}


const getPropValue = () => {
    
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
    },{});
    
    const animationKeyframe = new Array(length).fill(baseProp);

    const undefinedAnimation = fillUndefinedProp(animation, baseProp, baseKeyframe, keyframeKeys, props);
    keyframeKeys.forEach((item, idx) => {
        animationKeyframe[baseKeyframe[idx]] = undefinedAnimation[item];
    });
    fillProps(animation, animationKeyframe, keyframeKeys, props)
    // console.log(animationKeyframe);

    postMessage(animationKeyframe);
    // close();
}