import { colors, colorReg } from './colorMap';
import AnimationWorker from './animation.worker';

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
    [index:string] : animationValue
}
interface animationValue {
    [index:string] : number|string|Function
}

interface playOption {
    [index:string] : Function
}

export const delay = (duration:number) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(true);
        }, duration);
    });
}
export const play = async (element:HTMLElement, animation:Array<animationValue>, fps:number = 60) => {
    const lng      = animation.length;
    const delayNum = 1000/fps;
    // let frame = 0;
    for(let i=0; i<lng; i++){
        gotoAndStop(element, animation, i);
        await delay(delayNum);
    }
}
export const gotoAndStop = (element:HTMLElement, animation:Array<animationValue>, frame:number) => {
    let style = animation[frame];
    Object.keys(style).forEach(async item => {
        element.style[item] = style[item];
    });
}

export const createKeyframes = (animation:animation, length:number|Function, option?:option):Array<any> => {
    const {fnKeys, colorKeys}:option
                        = option === undefined || option.fnKeys === undefined || option.colorKeys === undefined
                        ? findSpcKeys(animation)
                        : option;
                        //option에 함수밸류를 가진 속성을 명시하지 않으면, 자동으로 찾습니다.
    
    const updator = updateAnimation(animation, length, fnKeys, colorKeys);
    const getKeyframor = getKeyframe(animation, length, fnKeys, colorKeys);
    return [updator, getKeyframor]; //애니메이션 키프레임, 키프레임 재생성 함수, 특정 프레임 불러오는 함수 반환
};

export const updateAnimation = (animation:animation, length:number|Function, fnKeys:fnKeys, colorKeys:colorKeys):Function => {
    //애니메이션 키프레임을 재생성합니다.
    return () => {
        const lng = typeof length === 'function' ? length() : length;
        // const settedAnimation = ;
        const worker = new AnimationWorker();
        // const worker = new Worker(new URL('./animation.worker.ts', import.meta.url));
        const promise = new Promise((res, rej) => {
            worker.onmessage = ({data}) => {
                res(data);
            }
        });
        worker.postMessage({
            animation:setDefaultAnimation(animation, fnKeys, colorKeys),
            length:lng
        });
        return promise;
        // return settedAnimation;
    }
}
export const getKeyframe = (animation:animation, length:number|Function, fnKeys:fnKeys, colorKeys:colorKeys) => {
    return (idx:number) => {
        const lng = typeof length === 'function' ? length() : length;
        // const settedAnimation = ;
        const worker = new AnimationWorker();
        // const worker = new Worker(new URL('./animation.worker.ts', import.meta.url));
        const promise = new Promise((res, rej) => {
            worker.onmessage = ({data}) => {
                res(data);
            }
        });
        worker.postMessage({
            animation:setDefaultAnimation(animation, fnKeys, colorKeys),
            length:lng,
            idx:idx
        });
        return promise;
    }
}

const setDefaultAnimation = (animation:animation, fnKeys:fnKeys, colorKeys:colorKeys):animation => {
    //초기 함수 실행 후 값 변환, 색깔코드 변환
    let ani = JSON.parse(JSON.stringify(animation));
    Object.keys(fnKeys).forEach((item) => {
        fnKeys[item].forEach((prop) => {
            ani[item][prop] = (animation[item][prop] as Function)();
            // const fn:Function = animation[item][prop] as Function;
        });
    });
    //함수 실행행

    Object.keys(colorKeys).forEach((item) => {
        colorKeys[item].forEach((prop) => {
            ani[item][prop] = colorRGBLize(animation[item][prop] as string);
        });
    });
    //색깔 변경

    return ani;
}
export const colorRGBLize = ($color:string):string => {
    let str = $color.replace(colorReg, (match, p1) => {
        if(match.substring(0,1) === '#'){
            let color = '';
            switch (match.length){
                case 4 :
                    const cs = match.split('').splice(1,4);
                    color = (cs.reduce((acc,item) => {
                        acc+=(item+item);
                        return acc;
                    },''))+'ff';
                    break;
                case 7 :
                    color = (match.replace('#',''))+'ff';
                    break;
                case 9 :
                    color = (match.replace('#',''));
                    break;
                default :
                    color = 'ffffffff';
            }
            const rgba = [parseInt(color.substring(0,2), 16), parseInt(color.substring(2,4), 16), parseInt(color.substring(4,6), 16), (parseInt(color.substring(6,8), 16)/255)];
            return 'rgba('+rgba.join(',')+')';
        }else if(match.substring(0,3) === 'rgb'){
            if(match.substring(3,4) === 'a')   return match;
            else                            return match.replace(/\((.*?)\)/,'($1,1)').replace('rgb','rgba');
        }else{
            return colors[$color] === undefined ? 'rgba(255,255,255,0.5)' : colors[$color];
        }
    });

    return str;
}

export const findSpcKeys = (animation:animation):option => {
    //색깔 속성을 가진 키프레임과 함수 속성을 가진 키프레임을 찾아냅니다.
    const result = Object.keys(animation).reduce((acc:option, item:string) => {
        const thisAnimation = animation[item];

        const fnKeys    = findFnKeys(thisAnimation);
        const colorKeys = findColorKeys(thisAnimation);

        if(fnKeys.length > 0)       acc.fnKeys[item]    = fnKeys;
        if(colorKeys.length > 0)     acc.colorKeys[item] = colorKeys;

        return acc;
    },{fnKeys:{},colorKeys:{}});
    return result;
}
export const findFnKeys = (animationValue:animationValue):Array<string> => {
    //함수 속성을 가진 키프레임을 반환합니다.
    return Object.keys(animationValue).filter($item => {
        return typeof animationValue[$item] === 'function';
    });
}

export const findColorKeys = (animationValue:animationValue):Array<string> => {
    //색깔 속성을 가진 키프레임을 반환합니다.
    return Object.keys(animationValue).filter($item => {
        return typeof animationValue[$item] === 'string' && String(animationValue[$item]).match(colorReg) !== null;
    });
}

// .match(/[^)^\s]*\(.*?\)/g)