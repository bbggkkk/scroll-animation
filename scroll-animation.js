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
            
            this.init();
            
            this.resizeObserver = new ResizeObserver(this.init.bind(this));
            this.resizeObserver.observe(this.body);
    
            this.scrollTarget.addEventListener('scroll', this.goToAndStop.bind(this), { passive:true });
            this.goToAndStop();


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
            const color   = this.getColor();
            for(let i=0; i<animation.length; i++){
                const style = [...animation[i].style];
                const kt = animation[i].keyText;
                setProp[kt] = {};
                props.forEach(item => {
                    const stl = /color/.test(item) && color[animation[i].style[item]] !== undefined ? color[animation[i].style[item]] : animation[i].style[item];
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
                    return [getComputedStyle(element)[value], id[idx]];
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
                    return [getComputedStyle(element)[value], id[idx]];
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
                        return [getComputedStyle(element)[value], map[i]];
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
                        return [getComputedStyle(element)[value], map[i]];
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
            const color = this.getColor();
            return [...keyframe.style].filter(item => {
                const val = /color/.test(item) && color[keyframe.style[item]] !== undefined ? color[keyframe.style[item]] : keyframe.style[item]
                return /\d/.test(val);
            });
        }
        getColor(name){
            const colors = {
                "black": "rgb(0,0,0)",
                "white": "rgb(255,255,255)",
                "red": "rgb(255,0,0)",
                "lime": "rgb(0,255,0)",
                "blue": "rgb(0,0,255)",
                "yellow": "rgb(255,255,0)",
                "cyan": "rgb(0,255,255)",
                "aqua": "rgb(0,255,255)",
                "magenta": "rgb(255,0,255)",
                "fuchsia": "rgb(255,0,255)",
                "silver": "rgb(192,192,192)",
                "gray": "rgb(128,128,128)",
                "maroon": "rgb(128,0,0)",
                "olive": "rgb(128,128,0)",
                "green": "rgb(0,128,0)",
                "purple": "rgb(128,0,128)",
                "teal": "rgb(0,128,128)",
                "navy": "rgb(0,0,128)",
                "darkred": "rgb(139,0,0)",
                "brown": "rgb(165,42,42)",
                "firebrick": "rgb(178,34,34)",
                "crimson": "rgb(220,20,60)",
                "tomato": "rgb(255,99,71)",
                "coral": "rgb(255,127,80)",
                "indianred": "rgb(205,92,92)",
                "lightcoral": "rgb(240,128,128)",
                "darksalmon": "rgb(233,150,122)",
                "salmon": "rgb(250,128,114)",
                "lightsalmon": "rgb(255,160,122)",
                "orangered": "rgb(255,69,0)",
                "darkorange": "rgb(255,140,0)",
                "orange": "rgb(255,165,0)",
                "gold": "rgb(255,215,0)",
                "darkgoldenrod": "rgb(184,134,11)",
                "goldenrod": "rgb(218,165,32)",
                "palegoldenrod": "rgb(238,232,170)",
                "darkkhaki": "rgb(189,183,107)",
                "khaki": "rgb(240,230,140)",
                "yellowgreen": "rgb(154,205,50)",
                "darkolivegreen": "rgb(85,107,47)",
                "olivedrab": "rgb(107,142,35)",
                "lawngreen": "rgb(124,252,0)",
                "chartreuse": "rgb(127,255,0)",
                "greenyellow": "rgb(173,255,47)",
                "darkgreen": "rgb(0,100,0)",
                "forestgreen": "rgb(34,139,34)",
                "limegreen": "rgb(50,205,50)",
                "lightgreen": "rgb(144,238,144)",
                "palegreen": "rgb(152,251,152)",
                "darkseagreen": "rgb(143,188,143)",
                "mediumspringgreen": "rgb(0,250,154)",
                "springgreen": "rgb(0,255,127)",
                "seagreen": "rgb(46,139,87)",
                "mediumaquamarine": "rgb(102,205,170)",
                "mediumseagreen": "rgb(60,179,113)",
                "lightseagreen": "rgb(32,178,170)",
                "darkslategray": "rgb(47,79,79)",
                "darkcyan": "rgb(0,139,139)",
                "lightcyan": "rgb(224,255,255)",
                "darkturquoise": "rgb(0,206,209)",
                "turquoise": "rgb(64,224,208)",
                "mediumturquoise": "rgb(72,209,204)",
                "paleturquoise": "rgb(175,238,238)",
                "aquamarine": "rgb(127,255,212)",
                "powderblue": "rgb(176,224,230)",
                "cadetblue": "rgb(95,158,160)",
                "steelblue": "rgb(70,130,180)",
                "cornflowerblue": "rgb(100,149,237)",
                "deepskyblue": "rgb(0,191,255)",
                "dodgerblue": "rgb(30,144,255)",
                "lightblue": "rgb(173,216,230)",
                "skyblue": "rgb(135,206,235)",
                "lightskyblue": "rgb(135,206,250)",
                "midnightblue": "rgb(25,25,112)",
                "darkblue": "rgb(0,0,139)",
                "mediumblue": "rgb(0,0,205)",
                "royalblue": "rgb(65,105,225)",
                "blueviolet": "rgb(138,43,226)",
                "indigo": "rgb(75,0,130)",
                "darkslateblue": "rgb(72,61,139)",
                "slateblue": "rgb(106,90,205)",
                "mediumslateblue": "rgb(123,104,238)",
                "mediumpurple": "rgb(147,112,219)",
                "darkmagenta": "rgb(139,0,139)",
                "darkviolet": "rgb(148,0,211)",
                "darkorchid": "rgb(153,50,204)",
                "mediumorchid": "rgb(186,85,211)",
                "thistle": "rgb(216,191,216)",
                "plum": "rgb(221,160,221)",
                "violet": "rgb(238,130,238)",
                "orchid": "rgb(218,112,214)",
                "mediumvioletred": "rgb(199,21,133)",
                "palevioletred": "rgb(219,112,147)",
                "deeppink": "rgb(255,20,147)",
                "hotpink": "rgb(255,105,180)",
                "lightpink": "rgb(255,182,193)",
                "pink": "rgb(255,192,203)",
                "antiquewhite": "rgb(250,235,215)",
                "beige": "rgb(245,245,220)",
                "bisque": "rgb(255,228,196)",
                "blanchedalmond": "rgb(255,235,205)",
                "wheat": "rgb(245,222,179)",
                "cornsilk": "rgb(255,248,220)",
                "lemonchiffon": "rgb(255,250,205)",
                "lightgoldenrodyellow": "rgb(250,250,210)",
                "lightyellow": "rgb(255,255,224)",
                "saddlebrown": "rgb(139,69,19)",
                "sienna": "rgb(160,82,45)",
                "chocolate": "rgb(210,105,30)",
                "peru": "rgb(205,133,63)",
                "sandybrown": "rgb(244,164,96)",
                "burlywood": "rgb(222,184,135)",
                "tan": "rgb(210,180,140)",
                "rosybrown": "rgb(188,143,143)",
                "moccasin": "rgb(255,228,181)",
                "navajowhite": "rgb(255,222,173)",
                "peachpuff": "rgb(255,218,185)",
                "mistyrose": "rgb(255,228,225)",
                "lavenderblush": "rgb(255,240,245)",
                "linen": "rgb(250,240,230)",
                "oldlace": "rgb(253,245,230)",
                "papayawhip": "rgb(255,239,213)",
                "seashell": "rgb(255,245,238)",
                "mintcream": "rgb(245,255,250)",
                "slategray": "rgb(112,128,144)",
                "lightslategray": "rgb(119,136,153)",
                "lightsteelblue": "rgb(176,196,222)",
                "lavender": "rgb(230,230,250)",
                "floralwhite": "rgb(255,250,240)",
                "aliceblue": "rgb(240,248,255)",
                "ghostwhite": "rgb(248,248,255)",
                "honeydew": "rgb(240,255,240)",
                "ivory": "rgb(255,255,240)",
                "azure": "rgb(240,255,255)",
                "snow": "rgb(255,250,250)",
                "dimgray": "rgb(105,105,105)",
                "dimgrey": "rgb(105,105,105)",
                "grey": "rgb(128,128,128)",
                "darkgray": "rgb(169,169,169)",
                "darkgrey": "rgb(169,169,169)",
                "lightgray": "rgb(211,211,211)",
                "lightgrey": "rgb(211,211,211)",
                "gainsboro": "rgb(220,220,220)",
                "whitesmoke": "rgb(245,245,245)"
            };
        
            return name === undefined ? colors : colors[name];
        }
    }
    window.ScrollAnimation = ScrollAnimation;
})();