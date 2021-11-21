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

const fillUndefinedProp = (animation:animation, baseKeyframe:Array<number>, keyframeKeys:Array<string>, props:Array<string>) => {
    return keyframeKeys.reduce((acc:animation, item:string, idx:number) => {
        acc[item] = props.reduce(($acc:animationValue, $item:string) => {
            $acc[$item] = animation[item][$item];
            if($acc[$item] === undefined){
                const [prev, pv] = findPrev(animation, idx, $item, keyframeKeys);
                const [next, nv] = findNext(animation, idx, $item, keyframeKeys);

                const pa         = animation[prev][$item];
                const na         = animation[next][$item];

                const prevMatch = String(pa).match(numeric);
                const dval = prevMatch !== null ? String(na).match(numeric).map(($$item, $$idx) => {
                    return parseFloat((parseFloat(prevMatch[$$idx]) + ((parseFloat($$item) - parseFloat(prevMatch[$$idx]))/((baseKeyframe[nv] - baseKeyframe[pv])/baseKeyframe[idx]))).toFixed(3));
                }) : pa;

                let cnt = 0;
                const aval = String(pa).replace(numeric, () => {
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

const fillProps = (animation:animation, animationKeyframe:Array<animationValue>, keyframeKeys:Array<string>, baseKeyframe:Array<number>, props:Array<string>):Array<animationValue> => {
    
    const result = animationKeyframe.map((item:animationValue, idx:number) => {
        return fillOneProp(item, animationKeyframe, keyframeKeys, baseKeyframe, props, idx);
    });

    return result;
}

const fillOneProp = (animationValue:animationValue, animationKeyframe:Array<animationValue>, keyframeKeys:Array<string>, baseKeyframe:Array<number>, props:Array<string>, idx:number) => {

    if(animationValue[props[0]] !== undefined)    {
        return animationValue;
    }

    const [pk, nk] = findPrevNext(idx, baseKeyframe);
    const pr       = animationKeyframe[pk],
          nr       = animationKeyframe[nk];
    const row = props.reduce((acc:animationValue, $item:string) => {
        const pv   = pr[$item],
              nv   = nr[$item];

        const isString = String(pv).match(numeric) === null;
        const pn   = !isString ? String(pv).match(numeric).map($$item => Number($$item)) : [],
              nn   = !isString ? String(nv).match(numeric).map($$item => Number($$item)) : [];
        const dv   = !isString ? nn.map(($nv, $idx) => {
            return parseFloat((pn[$idx] + (($nv - pn[$idx]) / (nk - pk) * (idx - pk))).toFixed(3));
        }) : pv;

        let cnt = 0;
        const av = String(pv).replace(numeric, () => {
            const returnValue = dv[cnt];
            cnt++;
            return String(returnValue);
        });
        acc[$item] = isNaN(Number(av)) ? av : Number(av);

        return acc;
    }, {});
    return row;
}

const findPrevNext = (idx:number, baseKeyframe:Array<number>) => {
    const nk = baseKeyframe.findIndex((item, $idx) => {
        return Number(item) >= idx;
    });
    const pk = nk - 1;

    return [baseKeyframe[pk], baseKeyframe[nk]];
}


const findPrev = (animation:animation, idx:number, prop:string, keyframeKeys:Array<string>) => {
    const val = idx-1;
    if(animation[keyframeKeys[val]][prop] !== undefined){
        return [keyframeKeys[val], val];
    }else{
        return findPrev(animation, val, prop, keyframeKeys);
    }
}
const findNext = (animation:animation, idx:number, prop:string, keyframeKeys:Array<string>) => {
    const val = idx+1;
    if(animation[keyframeKeys[val]][prop] !== undefined){
        return [keyframeKeys[val], val];
    }else{
        return findNext(animation, val, prop, keyframeKeys);
    }
}


const getPropValue = () => {
    
}


onmessage = ({data}) => {
    const {animation, length, idx} = data;
    const base         = (length)/100;
    const keyframeKeys = Object.keys(animation);
    const baseKeyframe = keyframeKeys.map(item => Math.round(base * parseInt(item)));
    const props = getAnimationProps(animation);
    const baseProp = props.reduce((acc:animationValue, item:string) => {
        acc[item] = undefined;
        return acc;
    },{});
    
    let animationKeyframe = new Array(length).fill(baseProp);

    const undefinedAnimation = fillUndefinedProp(animation, baseKeyframe, keyframeKeys, props);
    keyframeKeys.forEach((item, idx) => {
        animationKeyframe[baseKeyframe[idx]] = undefinedAnimation[item];
    });
    if(idx === undefined){
        animationKeyframe = fillProps(animation, animationKeyframe, keyframeKeys, baseKeyframe, props);
    
        postMessage(animationKeyframe);
    }else{
        if(idx === 0){
            postMessage(animation[0]);
        }else if(idx === length){
            postMessage(animation[100]);
        }else{
            postMessage(fillOneProp(animation, animationKeyframe, keyframeKeys, baseKeyframe, props, idx));
        }
    }
    close();
}

export default null as any;