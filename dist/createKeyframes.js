import { colors, colorReg } from './colorMap.js';
export const createKeyframes = (animation, length, option) => {
    const result = new Array(length); //최종적으로 반환될 애니메이션 키프레임
    const animationKeys = Object.keys(animation); //키프레임 목록
    const { fnKeys, colorKeys } = option === undefined || option.fnKeys === undefined || option.colorKeys === undefined
        ? findSpcKeys(animation, option)
        : option;
    //option에 함수밸류를 가진 속성을 명시하지 않으면, 자동으로 찾습니다.
    Object.keys(fnKeys).forEach((item) => {
        fnKeys[item].forEach((prop) => {
            animation[item][prop] = animation[item][prop]();
            // const fn:Function = animation[item][prop] as Function;
        });
    });
    //함수 실행행
    Object.keys(colorKeys).forEach((item) => {
        colorKeys[item].forEach((prop) => {
            animation[item][prop] = colorRGBLize(animation[item][prop]);
        });
    });
    //색깔 변경
    console.log(animation);
    return [];
};
export const findSpcKeys = (animation, { fnKeys, colorKeys }) => {
    const result = Object.keys(animation).reduce((acc, item) => {
        const thisAnimation = animation[item];
        const fnKeys = findFnKeys(thisAnimation);
        const colorKeys = findColorKeys(thisAnimation);
        if (fnKeys.length > 0)
            acc.fnKeys[item] = fnKeys;
        if (colorKeys.length > 0)
            acc.colorKeys[item] = colorKeys;
        return acc;
    }, { fnKeys: {}, colorKeys: {} });
    return result;
};
export const findFnKeys = (animationValue) => {
    return Object.keys(animationValue).filter($item => {
        return typeof animationValue[$item] === 'function';
    });
};
export const findColorKeys = (animationValue) => {
    return Object.keys(animationValue).filter($item => {
        return typeof animationValue[$item] === 'string' && animationValue[$item].match(colorReg).length > 0;
    });
};
export const colorRGBLize = ($color) => {
    let str = $color.replace(colorReg, (match, p1) => {
        if (match.substring(0, 1) === '#') {
            let color = '';
            switch (match.length) {
                case 4:
                    const cs = match.split('').splice(1, 4);
                    color = (cs.reduce((acc, item) => {
                        acc += (item.repeat(2));
                        return acc;
                    }, '')) + 'ff';
                    break;
                case 7:
                    color = (match.replace('#', '')) + 'ff';
                    break;
                case 9:
                    color = (match.replace('#', ''));
                    break;
                default:
                    color = 'ffffffff';
            }
            const rgba = [parseInt(color.substring(0, 2), 16), parseInt(color.substring(2, 4), 16), parseInt(color.substring(4, 6), 16), parseInt(color.substring(6, 8), 16)];
            return 'rgba(' + rgba.join(',') + ')';
        }
        else if (match.substring(0, 3) === 'rgb') {
            if (match.substring(3, 4) === 'a')
                return match;
            else
                return match.replace(/\((.*?)\)/, '($1,1)').replace('rgb', 'rgba');
        }
        else {
            return colors[$color] === undefined ? 'rgba(255,255,255,0.5)' : colors[$color];
        }
    });
    return str;
};
const animation = {
    '0': {
        opacity: 0,
        transform: () => `matrix(${-50}%, -50%)`,
        color: '#fff'
    },
    '100': {
        opacity: 1,
        transform: () => `matrix(${0}%, 0%)`,
        color: '#111'
    }
};
createKeyframes(animation, 100, {
    fnKeys: {
        '0': ['transform']
    }
});
// .match(/[^)^\s]*\(.*?\)/g)
//# sourceMappingURL=createKeyframes.js.map