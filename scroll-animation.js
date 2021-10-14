(function(){
    class ScrollAnimation {
        constructor(element, scrollTarget, animationName, start, end){
            this.element        = element;
            this.scrollTarget   = scrollTarget;
            this.animationName  = animationName;

            this.dataScrollStart = start;
            this.dataScrollEnd   = end;
    
            this.body           = this.scrollTarget.constructor.name === 'Window' ? document.documentElement : this.scrollTarget
    
            this.animationCss   = this.getAllAnimations()[this.animationName];
            this.props          = this.getAnimationProps(this.animationCss);
            
            // this.init();
            this.load();


            setTimeout(() => {
                for(let i=0; i<=this.scrollEnd; i++){
                    if(this.animation[i] === undefined){
                        setTimeout(() => {
                            this.animation[i] = this.fillUndefinedSingle(this.animation[i], this.element, this.animationMap, this.aniMapKeys, i, this.props);
                        },0);
                    }
                }
            },0);

        }
        load() {
            this.resizeObserver = new ResizeObserver(this.init.bind(this));
            this.resizeObserver.observe(this.body);
            this.scrollTarget.addEventListener('scroll', this.goToAndStopWrap, { passive:true });
        }
        unload(){
            this.resizeObserver.unobserve(this.body);
            this.scrollTarget.removeEventListener('scroll',this.goToAndStopWrap);
        }
        goToAndStopWrap = () => {
            this.goToAndStop();
        }
        goToAndStop(keyframe){
            if(this.scrolling)  return;
            this.scrolling = true;
            requestAnimationFrame(
                () => {

                    let Y = Math.round(this.body.scrollTop);
                    if(keyframe !== undefined && typeof keyframe === 'number')  Y = keyframe;

                    if(Y < this.scrollStart)    Y = this.scrollStart;
                    if(Y > this.scrollEnd)      Y = this.scrollEnd;
                    Y = Y - this.scrollStart;
                    if(this.prevScroll === Y) {
                        this.element.style.willChange = 'auto';
                        this.scrolling = false;
                        return;
                    }

                    // console.time('scroll');
                    if(this.element.style.willChange === 'auto'){
                        this.element.style.willChange = this.props.join(',');
                    }
    

                    this.prevScroll = Y;
                    if(this.animation[Y] === undefined){
                        this.animation[Y] = this.fillUndefinedSingle(this.animation[Y], this.element, this.animationMap, this.aniMapKeys, Y, this.props);
                    }
                    if(this.animation[Y] !== undefined){
                        const keys = this.props;
                        keys.forEach(item => {
                            this.element.style[item] = this.animation[Y][item];
                        });
                    }

                    // console.timeEnd('scroll');

                    this.scrolling = false;
                }
            );
        }
        goToAndPlay(keyframe){
            this.goToAndStop(keyframe);
            this.body.scrollTo({top : this.scrollEnd, behavior:'smooth'});
        }
        init(){
            this.prevScroll   = undefined;
            this.scrollStart  = this.dataScrollStart !== null ? Math.round(+this.isEval(this.dataScrollStart)) : Math.round(this.body.offsetTop);
            this.scrollEnd    = this.dataScrollEnd !== null ? Math.round(+this.isEval(this.dataScrollEnd)) : Math.round(this.body.offsetTop + this.body.scrollHeight - this.body.offsetHeight);
            this.scrollDiff   = this.scrollEnd - this.scrollStart;
    
    
            this.animationMap = this.propsKeyNumlize(this.propsNormalize(this.element,this.animationCss,this.props),this.scrollStart,this.scrollEnd);
            
            this.aniMapKeys   = Object.keys(this.animationMap);
            this.binMap       = this.createAnimationKeyframe(this.animationMap,this.scrollStart,this.scrollEnd);
            this.animation    = JSON.parse(JSON.stringify(this.animationMap));

            this.scrolling = false;
            this.element.style.willChange = 'auto';
            this.goToAndStop();
        }

        isEval(string){

            if(typeof string === 'function') {
                return string();
            }
            const parseCode = (string) => {
                const $parse = [
                    [new RegExp('#\\(this\\)','g'),'_this.body'],
                    [new RegExp('#\\(de\\)','g'),'document.documentElement'],
                    [new RegExp('#\\(qs=(.*?)\\)','g'),'document.querySelector("$1")'],
                ];
                const val = $parse.reduce((acc, item) => {
                    acc = acc.replace(item[0],item[1]);
                    return acc;
                },''+string);
                return val
            }

            const _this = this;
            string = parseCode(string);

            const psCode = string.match(/\$\{(.*?)\}/g);
            if(psCode !== null){
                if(/^\$\{.*\}/.test(string)) {
                    return new Function('_this','return '+string.substring(2,string.length-1))(_this);
                }else{
                    return string.replace(/\$\{(.*?)\}/g,(match,p1) => {
                        return new Function('_this','return '+p1)(_this);
                    });
                }
            }else{
                return string;
            }

        }
    
        createAnimationKeyframe(numProps,scrollStart,scrollEnd){
            const lng = scrollEnd - scrollStart;
            const keys = Object.keys(Object.values(numProps)[0]);
            const props = {};
            for(let i=0; i<=lng; i++){
                if(numProps[i] !== undefined){
                    props[i] = numProps[i];
                }else{
                    props[i] = keys.reduce((acc,item) => {
                        acc[item] = undefined;
                        return acc;
                    },{});
                }
            }
            // console.log(props);
            return props;
        }
    
        propsKeyNumlize(normalProp,scrollStart,scrollEnd){
            const diff = scrollEnd - scrollStart;
            // console.log(scrollEnd,scrollStart);
            const percent = (diff/100);
            const numProp = Object.keys(normalProp).reduce((acc,item) => {
                acc[Math.round(parseInt(item)*percent)] = normalProp[item];
                return acc;
            },{});
            return numProp;
        }
    
        propsNormalize(element, animation, props){
            const setProp = {};
            for(let i=0; i<animation.length; i++){
                // const style = this.parseCSS(animation[i].cssText);
                // const styleKeys = Object.keys(style);
                const style = [...animation[i].style];
                const kt = animation[i].keyText;
                setProp[kt] = {};
                props.forEach(item => {
                    const isColor = this.isColor(animation[i].style[item]);
                    const stl = isColor ? this.getColor(animation[i].style[item]) : animation[i].style[item];
                    if(style.includes(item)){
                        setProp[kt][item] = stl.replace(/\-?\d{0,}\.?\d+/g,(match, idx) => {
                            return parseFloat(parseFloat(match).toFixed(2));
                        }); 
                    }else{
                        setProp[kt][item] = undefined;
                    }
                });
            }
        
            // console.log(setProp);
            const compProp = this.fillUndefined(setProp, element);
            return compProp;
        }
    
        fillUndefined(props, element){
            const origin = props;
            const ele    = element;
            return Object.keys(origin).reduce((acc, item, idx) => {
                const undfKeys = this.hasUndefined(origin[item]);
                undfKeys.forEach(key => {
                    const [prev, prevKey] = this.findPrevValue(origin, ele, key, idx);
                    const [next, nextKey] = this.findNextValue(origin, ele, key, idx);
                    const [prevNum, nextNum] = [parseInt(prevKey), parseInt(nextKey)];
                    const diff = nextNum - prevNum;
        
                    if(parseInt(item) === 0){
                        acc[item][key] = prev;
                    }else if(parseInt(item) === 100){
                        acc[item][key] = next;
                    }else{
                        const pn = prev.match(/\-?\d{0,}\.?\d+/g).map(item => +item);
                        const nn = next.match(/\-?\d{0,}\.?\d+/g).map(item => +item);
                        let cnt    = 0;
                        acc[item][key] = next.replace(/\-?\d{0,}\.?\d+/g,(match, idx) => {
                            const dif = pn[cnt] + ((nn[cnt]-pn[cnt])*(parseInt(item)-prevNum)/diff);
                            cnt++;
                            return parseFloat(dif.toFixed(2));
                        })
                    }
                });
                return acc;
            },JSON.parse(JSON.stringify(origin)));
        }
        findPrevValue(props,element,value,idx){
            const id = Object.keys(props);
            const prev = id[idx-1];
            if(idx === 0){
                if(props[id[idx]][value] !== undefined){
                    return [props[id[idx]][value], id[idx]];
                }else{
                    const style = getComputedStyle(element)[value];
                    const isColor = this.isColor(style);
                    const set     = isColor ? this.getColor(style) : style;
                    return [set, id[idx]];
                }
            }
            if(props[prev][value] !== undefined){
                return [props[prev][value], prev];
            }
            return this.findPrevValue(props, element, value, idx-1);
        }
        findNextValue(props,element,value,idx){
            const id = Object.keys(props);
            const next = id[idx+1];
            if(idx === id.length-1){
                if(props[id[idx]][value] !== undefined){
                    return [props[id[idx]][value], id[idx]];
                }else{
                    const style = getComputedStyle(element)[value];
                    const isColor = this.isColor(style);
                    const set     = isColor ? this.getColor(style) : style;
                    return [set, id[idx]];
                }
            }
            if(props[next][value] !== undefined){
                return [props[next][value], next];
            }
            return this.findNextValue(props, element, value, idx+1);
        }
        fillUndefinedSingle(props, element, animationMap, map, idx, $props){
            const origin = map;
            const ele    = element;

            const val = $props.reduce((acc,key) => {
                // const $key = this.cssNameJavascriptlize(key);
                const [prev, prevKey] = this.findPrevValueSingle(origin, ele, key, idx, animationMap, map);
                const [next, nextKey] = this.findNextValueSingle(origin, ele, key, idx, animationMap, map);
                const [prevNum, nextNum] = [parseInt(prevKey), parseInt(nextKey)];
                const diff = nextNum - prevNum;

                if(parseInt(idx) === 0){
                    acc[key] = prev;
                }else if(parseInt(idx) === Object.keys(acc).length-1){
                    acc[key] = next;
                }else{
                    const pn = prev.match(/\-?\d{0,}\.?\d+/g).map(item => +item);
                    const nn = next.match(/\-?\d{0,}\.?\d+/g).map(item => +item);

                    let cnt    = 0;
                    acc[key] = next.replace(/\-?\d{0,}\.?\d+/g,(match, $idx) => {
                        const dif = pn[cnt] + ((nn[cnt]-pn[cnt])*(parseInt(idx)-prevNum)/diff);
                        cnt++;
                        return parseFloat(dif.toFixed(2));
                    });
                }
                return acc
            },{});
            // console.log(val);
            return val;

        }
        findPrevValueSingle(props,element,value,idx,animationMap,map){
            for(let i=map.length-1; i>=0; i--){
                if(idx > map[i]){
                    if(animationMap[map[i]][value] !== undefined){
                        return [animationMap[map[i]][value], map[i]];
                    }else{
                        const style = getComputedStyle(element)[value];
                        const isColor = this.isColor(style);
                        const set     = isColor ? this.getColor(style) : style;
                        return [set, map[i]];
                    }
                }else{
                    continue;
                }
            }
            return [animationMap[map[0]][value], map[0]];
        }
        findNextValueSingle(props,element,value,idx,animationMap,map){
            for(let i=0; i<map.length; i++){
                if(idx < map[i]){
                    if(animationMap[map[i]][value] !== undefined){
                        return [animationMap[map[i]][value], map[i]];
                    }else{
                        const style = getComputedStyle(element)[value];
                        const isColor = this.isColor(style);
                        const set     = isColor ? this.getColor(style) : style;
                        return [set, map[i]];
                    }
                }else{
                    continue;
                }
            }
            return [animationMap[map[props.length-1]][value], map[props.length-1]];
        }
    
        hasUndefined(frame){
            if(frame === undefined) return undefined;
            const undf = Object.keys(frame).filter(item => {
                return frame[item] === undefined;
            });
            return undf;
        }
    
        getAllAnimations(name){
            const styleSheets = [...document.styleSheets].reduce((acc,item) => {
                try{    
                    const rules = item.cssRules;
                    const animations = [...rules].filter(item => item.constructor.name === 'CSSKeyframesRule');
                    acc.push(animations);
                    return acc;
                }catch{
                    return acc;
                }
            },[]).flat().reduce((acc,item) => {
                const {name,cssRules} = item;
                acc[name] = cssRules;
                return acc;
            },{});
            return name === undefined ? styleSheets : styleSheets[name];
        }
        cssNameJavascriptlize(css){
            return css.replace(/\-([a-z])/g, (match, p1) => {
                return p1.toUpperCase();
            });
        }
        getAnimationProps(animation){
            const ani = [...animation];
            return [...new Set(ani.map(item => this.getKeyframeProps(item)).flat())];
        }
        getKeyframeProps(keyframe){
            return [...keyframe.style].filter(item => {
                const isColor = this.isColor(keyframe.style[item]);
                const val = isColor ? this.getColor(keyframe.style[item]) : keyframe.style[item];
                return /\d/.test(val);
            });
        }
        parseCSS($css){
            const css       = $css.replace(/;$/,"").match(/\{(.*?)\}/)[1].trim();
            console.log(css);
            const cssJS     = css.replace(/\n|(;)$/g,"")
                .split(";")
                .map(item => item.replace(/\-([a-z])/g,(match,p1)=>p1.toUpperCase()))
                .reduce( (acc,item) => {
                    acc[item.split(":")[0].trim()] = this.isEval(item.split(":")[1].replace(/ +/g," ").trim());
                    return acc;
                },{});
            return cssJS;
        }
        isColor(val){
            const reg = new RegExp('rgba?\\(.*?\\)\|#[0-9a-fA-F]{3}\|#[0-9a-fA-F]{6}\|#[0-9a-fA-F]{8}\|black\|white\|red\|lime\|blue\|yellow\|cyan\|aqua\|magenta\|fuchsia\|silver\|gray\|maroon\|olive\|green\|purple\|teal\|navy\|darkred\|brown\|firebrick\|crimson\|tomato\|coral\|indianred\|lightcoral\|darksalmon\|salmon\|lightsalmon\|orangered\|darkorange\|orange\|gold\|darkgoldenrod\|goldenrod\|palegoldenrod\|darkkhaki\|khaki\|yellowgreen\|darkolivegree\| olivedrab\|lawngreen\|chartreuse\|greenyellow\|darkgreen\|forestgreen\|limegreen\|lightgreen\|palegreen\|darkseagreen\|mediumspringg\|springgreen\|seagreen\|mediumaquamar\|mediumseagree\|lightseagreen\|darkslategray\|darkcyan\|lightcyan\|darkturquoise\|turquoise\|mediumturquoi\|paleturquoise\|aquamarine\|powderblue\|cadetblue\|steelblue\|cornflowerblu\|deepskyblue\|dodgerblue\|lightblue\|skyblue\|lightskyblue\|midnightblue\|darkblue\|mediumblue\|royalblue\|blueviolet\|indigo\|darkslateblue\|slateblue\|mediumslatebl\|mediumpurple\|darkmagenta\|darkviolet\|darkorchid\|mediumorchid\|thistle\|plum\|violet\|orchid\|mediumvioletr\|palevioletred\|deeppink\|hotpink\|lightpink\|pink\|antiquewhite\|beige\|bisque\|blanchedalmon\|wheat\|cornsilk\|lemonchiffon\|lightgoldenro\|lightyellow\|saddlebrown\|sienna\|chocolate\|peru\|sandybrown\|burlywood\|tan\|rosybrown\|moccasin\|navajowhite\|peachpuff\|mistyrose\|lavenderblush\|linen\|oldlace\|papayawhip\|seashell\|mintcream\|slategray\|lightslategra\|lightsteelblu\|lavender\|floralwhite\|aliceblue\|ghostwhite\|honeydew\|ivory\|azure\|snow\|dimgray\|dimgrey\|grey\|darkgray\|darkgrey\|lightgray\|lightgrey\|gainsboro\|whitesmoke','g');
            return reg.test(val);
        }
        getColor(name){
            const reg = new RegExp('rgba?\\(.*?\\)\|#[0-9a-fA-F]{3}\|#[0-9a-fA-F]{6}\|#[0-9a-fA-F]{8}\|black\|white\|red\|lime\|blue\|yellow\|cyan\|aqua\|magenta\|fuchsia\|silver\|gray\|maroon\|olive\|green\|purple\|teal\|navy\|darkred\|brown\|firebrick\|crimson\|tomato\|coral\|indianred\|lightcoral\|darksalmon\|salmon\|lightsalmon\|orangered\|darkorange\|orange\|gold\|darkgoldenrod\|goldenrod\|palegoldenrod\|darkkhaki\|khaki\|yellowgreen\|darkolivegree\| olivedrab\|lawngreen\|chartreuse\|greenyellow\|darkgreen\|forestgreen\|limegreen\|lightgreen\|palegreen\|darkseagreen\|mediumspringg\|springgreen\|seagreen\|mediumaquamar\|mediumseagree\|lightseagreen\|darkslategray\|darkcyan\|lightcyan\|darkturquoise\|turquoise\|mediumturquoi\|paleturquoise\|aquamarine\|powderblue\|cadetblue\|steelblue\|cornflowerblu\|deepskyblue\|dodgerblue\|lightblue\|skyblue\|lightskyblue\|midnightblue\|darkblue\|mediumblue\|royalblue\|blueviolet\|indigo\|darkslateblue\|slateblue\|mediumslatebl\|mediumpurple\|darkmagenta\|darkviolet\|darkorchid\|mediumorchid\|thistle\|plum\|violet\|orchid\|mediumvioletr\|palevioletred\|deeppink\|hotpink\|lightpink\|pink\|antiquewhite\|beige\|bisque\|blanchedalmon\|wheat\|cornsilk\|lemonchiffon\|lightgoldenro\|lightyellow\|saddlebrown\|sienna\|chocolate\|peru\|sandybrown\|burlywood\|tan\|rosybrown\|moccasin\|navajowhite\|peachpuff\|mistyrose\|lavenderblush\|linen\|oldlace\|papayawhip\|seashell\|mintcream\|slategray\|lightslategra\|lightsteelblu\|lavender\|floralwhite\|aliceblue\|ghostwhite\|honeydew\|ivory\|azure\|snow\|dimgray\|dimgrey\|grey\|darkgray\|darkgrey\|lightgray\|lightgrey\|gainsboro\|whitesmoke','g');
            let str = name.replace(reg,(match, p1) => {
                if(match.substr(0,1) === '#'){
                    let color = '';
                    switch (match.length){
                        case 4 :
                            const cs = match.split('').splice(1,4);
                            color = (cs.reduce((acc,item) => {
                                acc+=(item.repeat(2));
                                return acc;
                            }))+'ff';
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
                    const rgba = [parseInt(color.substr(0,2)), parseInt(color.substr(2,2)), parseInt(color.substr(4,2)), parseInt(color.substr(6,2))];
                    return 'rgba('+rgba.join(',')+')';
                }else if(match.substr(0,3) === 'rgb'){
                    if(match.substr(3,1) === 'a')   return match;
                    else                            return match.replace(/\((.*?)\)/,'($1,1)').replace('rgb','rgba');
                }else{
                    const colors = {
                        "black": "rgba(0,0,0,1)",
                        "white": "rgba(255,255,255,1)",
                        "red": "rgba(255,0,0,1)",
                        "lime": "rgba(0,255,0,1)",
                        "blue": "rgba(0,0,255,1)",
                        "yellow": "rgba(255,255,0,1)",
                        "cyan": "rgba(0,255,255,1)",
                        "aqua": "rgba(0,255,255,1)",
                        "magenta": "rgba(255,0,255,1)",
                        "fuchsia": "rgba(255,0,255,1)",
                        "silver": "rgba(192,192,192,1)",
                        "gray": "rgba(128,128,128,1)",
                        "maroon": "rgba(128,0,0,1)",
                        "olive": "rgba(128,128,0,1)",
                        "green": "rgba(0,128,0,1)",
                        "purple": "rgba(128,0,128,1)",
                        "teal": "rgba(0,128,128,1)",
                        "navy": "rgba(0,0,128,1)",
                        "darkred": "rgba(139,0,0,1)",
                        "brown": "rgba(165,42,42,1)",
                        "firebrick": "rgba(178,34,34,1)",
                        "crimson": "rgba(220,20,60,1)",
                        "tomato": "rgba(255,99,71,1)",
                        "coral": "rgba(255,127,80,1)",
                        "indianred": "rgba(205,92,92,1)",
                        "lightcoral": "rgba(240,128,128,1)",
                        "darksalmon": "rgba(233,150,122,1)",
                        "salmon": "rgba(250,128,114,1)",
                        "lightsalmon": "rgba(255,160,122,1)",
                        "orangered": "rgba(255,69,0,1)",
                        "darkorange": "rgba(255,140,0,1)",
                        "orange": "rgba(255,165,0,1)",
                        "gold": "rgba(255,215,0,1)",
                        "darkgoldenrod": "rgba(184,134,11,1)",
                        "goldenrod": "rgba(218,165,32,1)",
                        "palegoldenrod": "rgba(238,232,170,1)",
                        "darkkhaki": "rgba(189,183,107,1)",
                        "khaki": "rgba(240,230,140,1)",
                        "yellowgreen": "rgba(154,205,50,1)",
                        "darkolivegreen": "rgba(85,107,47,1)",
                        "olivedrab": "rgba(107,142,35,1)",
                        "lawngreen": "rgba(124,252,0,1)",
                        "chartreuse": "rgba(127,255,0,1)",
                        "greenyellow": "rgba(173,255,47,1)",
                        "darkgreen": "rgba(0,100,0,1)",
                        "forestgreen": "rgba(34,139,34,1)",
                        "limegreen": "rgba(50,205,50,1)",
                        "lightgreen": "rgba(144,238,144,1)",
                        "palegreen": "rgba(152,251,152,1)",
                        "darkseagreen": "rgba(143,188,143,1)",
                        "mediumspringgreen": "rgba(0,250,154,1)",
                        "springgreen": "rgba(0,255,127,1)",
                        "seagreen": "rgba(46,139,87,1)",
                        "mediumaquamarine": "rgba(102,205,170,1)",
                        "mediumseagreen": "rgba(60,179,113,1)",
                        "lightseagreen": "rgba(32,178,170,1)",
                        "darkslategray": "rgba(47,79,79,1)",
                        "darkcyan": "rgba(0,139,139,1)",
                        "lightcyan": "rgba(224,255,255,1)",
                        "darkturquoise": "rgba(0,206,209,1)",
                        "turquoise": "rgba(64,224,208,1)",
                        "mediumturquoise": "rgba(72,209,204,1)",
                        "paleturquoise": "rgba(175,238,238,1)",
                        "aquamarine": "rgba(127,255,212,1)",
                        "powderblue": "rgba(176,224,230,1)",
                        "cadetblue": "rgba(95,158,160,1)",
                        "steelblue": "rgba(70,130,180,1)",
                        "cornflowerblue": "rgba(100,149,237,1)",
                        "deepskyblue": "rgba(0,191,255,1)",
                        "dodgerblue": "rgba(30,144,255,1)",
                        "lightblue": "rgba(173,216,230,1)",
                        "skyblue": "rgba(135,206,235,1)",
                        "lightskyblue": "rgba(135,206,250,1)",
                        "midnightblue": "rgba(25,25,112,1)",
                        "darkblue": "rgba(0,0,139,1)",
                        "mediumblue": "rgba(0,0,205,1)",
                        "royalblue": "rgba(65,105,225,1)",
                        "blueviolet": "rgba(138,43,226,1)",
                        "indigo": "rgba(75,0,130,1)",
                        "darkslateblue": "rgba(72,61,139,1)",
                        "slateblue": "rgba(106,90,205,1)",
                        "mediumslateblue": "rgba(123,104,238,1)",
                        "mediumpurple": "rgba(147,112,219,1)",
                        "darkmagenta": "rgba(139,0,139,1)",
                        "darkviolet": "rgba(148,0,211,1)",
                        "darkorchid": "rgba(153,50,204,1)",
                        "mediumorchid": "rgba(186,85,211,1)",
                        "thistle": "rgba(216,191,216,1)",
                        "plum": "rgba(221,160,221,1)",
                        "violet": "rgba(238,130,238,1)",
                        "orchid": "rgba(218,112,214,1)",
                        "mediumvioletred": "rgba(199,21,133,1)",
                        "palevioletred": "rgba(219,112,147,1)",
                        "deeppink": "rgba(255,20,147,1)",
                        "hotpink": "rgba(255,105,180,1)",
                        "lightpink": "rgba(255,182,193,1)",
                        "pink": "rgba(255,192,203,1)",
                        "antiquewhite": "rgba(250,235,215,1)",
                        "beige": "rgba(245,245,220,1)",
                        "bisque": "rgba(255,228,196,1)",
                        "blanchedalmond": "rgba(255,235,205,1)",
                        "wheat": "rgba(245,222,179,1)",
                        "cornsilk": "rgba(255,248,220,1)",
                        "lemonchiffon": "rgba(255,250,205,1)",
                        "lightgoldenrodyellow": "rgba(250,250,210,1)",
                        "lightyellow": "rgba(255,255,224,1)",
                        "saddlebrown": "rgba(139,69,19,1)",
                        "sienna": "rgba(160,82,45,1)",
                        "chocolate": "rgba(210,105,30,1)",
                        "peru": "rgba(205,133,63,1)",
                        "sandybrown": "rgba(244,164,96,1)",
                        "burlywood": "rgba(222,184,135,1)",
                        "tan": "rgba(210,180,140,1)",
                        "rosybrown": "rgba(188,143,143,1)",
                        "moccasin": "rgba(255,228,181,1)",
                        "navajowhite": "rgba(255,222,173,1)",
                        "peachpuff": "rgba(255,218,185,1)",
                        "mistyrose": "rgba(255,228,225,1)",
                        "lavenderblush": "rgba(255,240,245,1)",
                        "linen": "rgba(250,240,230,1)",
                        "oldlace": "rgba(253,245,230,1)",
                        "papayawhip": "rgba(255,239,213,1)",
                        "seashell": "rgba(255,245,238,1)",
                        "mintcream": "rgba(245,255,250,1)",
                        "slategray": "rgba(112,128,144,1)",
                        "lightslategray": "rgba(119,136,153,1)",
                        "lightsteelblue": "rgba(176,196,222,1)",
                        "lavender": "rgba(230,230,250,1)",
                        "floralwhite": "rgba(255,250,240,1)",
                        "aliceblue": "rgba(240,248,255,1)",
                        "ghostwhite": "rgba(248,248,255,1)",
                        "honeydew": "rgba(240,255,240,1)",
                        "ivory": "rgba(255,255,240,1)",
                        "azure": "rgba(240,255,255,1)",
                        "snow": "rgba(255,250,250,1)",
                        "dimgray": "rgba(105,105,105,1)",
                        "dimgrey": "rgba(105,105,105,1)",
                        "grey": "rgba(128,128,128,1)",
                        "darkgray": "rgba(169,169,169,1)",
                        "darkgrey": "rgba(169,169,169,1)",
                        "lightgray": "rgba(211,211,211,1)",
                        "lightgrey": "rgba(211,211,211,1)",
                        "gainsboro": "rgba(220,220,220,1)",
                        "whitesmoke": "rgba(245,245,245,1)"
                    };
                    return colors[name] === undefined ? 'rgba(255,255,255,0.5)' : colors[name];
                }
            });

            return str;

            console.log(str);

            if(name.substr(0,1) === '#'){
                switch (name.length){
                    case 4 :
                        const cs = name.split('').splice(0,1);
                        color = '#'+(cs.reduce((acc,item) => acc+=(item.repeat(2))))+'ff';
                        break;
                    case 7 :
                        color = name+'ff';
                        break;
                    case 9 :
                        color = name;
                        break;
                    default :
                        color = '#ffffffff';
                }
                // console.log(color);
            }else if(name.substr(0,3) === 'rgb'){
                if(name.substr(3,4) === 'a')    return name;
                else                            return name.replace(/\((.*)\)/,'($1,1)').replace('rgb','rgba');
            }else{
                const colors = {
                    "black": "rgba(0,0,0,1)",
                    "white": "rgba(255,255,255,1)",
                    "red": "rgba(255,0,0,1)",
                    "lime": "rgba(0,255,0,1)",
                    "blue": "rgba(0,0,255,1)",
                    "yellow": "rgba(255,255,0,1)",
                    "cyan": "rgba(0,255,255,1)",
                    "aqua": "rgba(0,255,255,1)",
                    "magenta": "rgba(255,0,255,1)",
                    "fuchsia": "rgba(255,0,255,1)",
                    "silver": "rgba(192,192,192,1)",
                    "gray": "rgba(128,128,128,1)",
                    "maroon": "rgba(128,0,0,1)",
                    "olive": "rgba(128,128,0,1)",
                    "green": "rgba(0,128,0,1)",
                    "purple": "rgba(128,0,128,1)",
                    "teal": "rgba(0,128,128,1)",
                    "navy": "rgba(0,0,128,1)",
                    "darkred": "rgba(139,0,0,1)",
                    "brown": "rgba(165,42,42,1)",
                    "firebrick": "rgba(178,34,34,1)",
                    "crimson": "rgba(220,20,60,1)",
                    "tomato": "rgba(255,99,71,1)",
                    "coral": "rgba(255,127,80,1)",
                    "indianred": "rgba(205,92,92,1)",
                    "lightcoral": "rgba(240,128,128,1)",
                    "darksalmon": "rgba(233,150,122,1)",
                    "salmon": "rgba(250,128,114,1)",
                    "lightsalmon": "rgba(255,160,122,1)",
                    "orangered": "rgba(255,69,0,1)",
                    "darkorange": "rgba(255,140,0,1)",
                    "orange": "rgba(255,165,0,1)",
                    "gold": "rgba(255,215,0,1)",
                    "darkgoldenrod": "rgba(184,134,11,1)",
                    "goldenrod": "rgba(218,165,32,1)",
                    "palegoldenrod": "rgba(238,232,170,1)",
                    "darkkhaki": "rgba(189,183,107,1)",
                    "khaki": "rgba(240,230,140,1)",
                    "yellowgreen": "rgba(154,205,50,1)",
                    "darkolivegreen": "rgba(85,107,47,1)",
                    "olivedrab": "rgba(107,142,35,1)",
                    "lawngreen": "rgba(124,252,0,1)",
                    "chartreuse": "rgba(127,255,0,1)",
                    "greenyellow": "rgba(173,255,47,1)",
                    "darkgreen": "rgba(0,100,0,1)",
                    "forestgreen": "rgba(34,139,34,1)",
                    "limegreen": "rgba(50,205,50,1)",
                    "lightgreen": "rgba(144,238,144,1)",
                    "palegreen": "rgba(152,251,152,1)",
                    "darkseagreen": "rgba(143,188,143,1)",
                    "mediumspringgreen": "rgba(0,250,154,1)",
                    "springgreen": "rgba(0,255,127,1)",
                    "seagreen": "rgba(46,139,87,1)",
                    "mediumaquamarine": "rgba(102,205,170,1)",
                    "mediumseagreen": "rgba(60,179,113,1)",
                    "lightseagreen": "rgba(32,178,170,1)",
                    "darkslategray": "rgba(47,79,79,1)",
                    "darkcyan": "rgba(0,139,139,1)",
                    "lightcyan": "rgba(224,255,255,1)",
                    "darkturquoise": "rgba(0,206,209,1)",
                    "turquoise": "rgba(64,224,208,1)",
                    "mediumturquoise": "rgba(72,209,204,1)",
                    "paleturquoise": "rgba(175,238,238,1)",
                    "aquamarine": "rgba(127,255,212,1)",
                    "powderblue": "rgba(176,224,230,1)",
                    "cadetblue": "rgba(95,158,160,1)",
                    "steelblue": "rgba(70,130,180,1)",
                    "cornflowerblue": "rgba(100,149,237,1)",
                    "deepskyblue": "rgba(0,191,255,1)",
                    "dodgerblue": "rgba(30,144,255,1)",
                    "lightblue": "rgba(173,216,230,1)",
                    "skyblue": "rgba(135,206,235,1)",
                    "lightskyblue": "rgba(135,206,250,1)",
                    "midnightblue": "rgba(25,25,112,1)",
                    "darkblue": "rgba(0,0,139,1)",
                    "mediumblue": "rgba(0,0,205,1)",
                    "royalblue": "rgba(65,105,225,1)",
                    "blueviolet": "rgba(138,43,226,1)",
                    "indigo": "rgba(75,0,130,1)",
                    "darkslateblue": "rgba(72,61,139,1)",
                    "slateblue": "rgba(106,90,205,1)",
                    "mediumslateblue": "rgba(123,104,238,1)",
                    "mediumpurple": "rgba(147,112,219,1)",
                    "darkmagenta": "rgba(139,0,139,1)",
                    "darkviolet": "rgba(148,0,211,1)",
                    "darkorchid": "rgba(153,50,204,1)",
                    "mediumorchid": "rgba(186,85,211,1)",
                    "thistle": "rgba(216,191,216,1)",
                    "plum": "rgba(221,160,221,1)",
                    "violet": "rgba(238,130,238,1)",
                    "orchid": "rgba(218,112,214,1)",
                    "mediumvioletred": "rgba(199,21,133,1)",
                    "palevioletred": "rgba(219,112,147,1)",
                    "deeppink": "rgba(255,20,147,1)",
                    "hotpink": "rgba(255,105,180,1)",
                    "lightpink": "rgba(255,182,193,1)",
                    "pink": "rgba(255,192,203,1)",
                    "antiquewhite": "rgba(250,235,215,1)",
                    "beige": "rgba(245,245,220,1)",
                    "bisque": "rgba(255,228,196,1)",
                    "blanchedalmond": "rgba(255,235,205,1)",
                    "wheat": "rgba(245,222,179,1)",
                    "cornsilk": "rgba(255,248,220,1)",
                    "lemonchiffon": "rgba(255,250,205,1)",
                    "lightgoldenrodyellow": "rgba(250,250,210,1)",
                    "lightyellow": "rgba(255,255,224,1)",
                    "saddlebrown": "rgba(139,69,19,1)",
                    "sienna": "rgba(160,82,45,1)",
                    "chocolate": "rgba(210,105,30,1)",
                    "peru": "rgba(205,133,63,1)",
                    "sandybrown": "rgba(244,164,96,1)",
                    "burlywood": "rgba(222,184,135,1)",
                    "tan": "rgba(210,180,140,1)",
                    "rosybrown": "rgba(188,143,143,1)",
                    "moccasin": "rgba(255,228,181,1)",
                    "navajowhite": "rgba(255,222,173,1)",
                    "peachpuff": "rgba(255,218,185,1)",
                    "mistyrose": "rgba(255,228,225,1)",
                    "lavenderblush": "rgba(255,240,245,1)",
                    "linen": "rgba(250,240,230,1)",
                    "oldlace": "rgba(253,245,230,1)",
                    "papayawhip": "rgba(255,239,213,1)",
                    "seashell": "rgba(255,245,238,1)",
                    "mintcream": "rgba(245,255,250,1)",
                    "slategray": "rgba(112,128,144,1)",
                    "lightslategray": "rgba(119,136,153,1)",
                    "lightsteelblue": "rgba(176,196,222,1)",
                    "lavender": "rgba(230,230,250,1)",
                    "floralwhite": "rgba(255,250,240,1)",
                    "aliceblue": "rgba(240,248,255,1)",
                    "ghostwhite": "rgba(248,248,255,1)",
                    "honeydew": "rgba(240,255,240,1)",
                    "ivory": "rgba(255,255,240,1)",
                    "azure": "rgba(240,255,255,1)",
                    "snow": "rgba(255,250,250,1)",
                    "dimgray": "rgba(105,105,105,1)",
                    "dimgrey": "rgba(105,105,105,1)",
                    "grey": "rgba(128,128,128,1)",
                    "darkgray": "rgba(169,169,169,1)",
                    "darkgrey": "rgba(169,169,169,1)",
                    "lightgray": "rgba(211,211,211,1)",
                    "lightgrey": "rgba(211,211,211,1)",
                    "gainsboro": "rgba(220,220,220,1)",
                    "whitesmoke": "rgba(245,245,245,1)"
                };
            
                return colors[name] === undefined ? 'rgba(255,255,255,0.5)' : colors[name];
            }
        }
    }
    window.ScrollAnimation = ScrollAnimation;
})();