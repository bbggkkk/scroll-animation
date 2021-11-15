interface animation {
    [index:string] : animationValue
}
interface animationValue {
    [index:string] : number|string|Function
}

export class ScrollAnimation {
    element:HTMLElement;
    scrollTarget:HTMLElement|Window;
    start:number;
    end:number;

    cssStringList:animation

    constructor(element:HTMLElement, scrollTarget:HTMLElement|Window, start:number|Function, end:number|Function){
        this.element       = element;
        this.scrollTarget  = scrollTarget;
        this.cssStringList = Array.from(this.element.attributes).reduce((acc, item) => {
            console.log(item);
            return acc;
        }, {});
    }

    parseCSS($css:string){
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
    isEval(val:string){
        if(/^\$\{.*\}$/.test(val)){
            return new Function(val).bind(this);
        }else{
            return val;
        }
    }
}