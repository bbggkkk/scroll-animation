export class ScrollAnimation {
    scrollBody : HTMLElement|Object;
    scrollEle  : HTMLElement;
    children   : Object;
    constructor(scrollBody:HTMLElement|Object, targetQuery:string){
        this.scrollBody = scrollBody;
        this.scrollEle  = scrollBody === window ? document.documentElement : scrollBody as HTMLElement;
        this.children   = document.querySelector(targetQuery);
    }
}

interface animation {
    [index:string] : animationValue
}
interface animationValue {
    [index:string] : number|string|Function
}

export class ScrollAnimationItem {
    element     : HTMLElement;
    animation   : Array<animationValue>;
    updator     : Function;
    getKeyframe : Function;
    scrollStart : number;
    scrollEnd   : number;
    constructor(element:HTMLElement, updator:Function, getKeyframe:Function){
        this.element     = element;
        this.updator     = updator;
        this.getKeyframe = getKeyframe;
        this.animation   = undefined;
        this.updator().then((data:Array<animationValue>) => this.animation = data);
        this.setAttributeValue();
    }

    setAttributeValue():void{
        this.scrollStart = Number(this.element.getAttribute('data-animation-start'));
        this.scrollEnd   = Number(this.element.getAttribute('data-animation-end'));
    }

    isScroll(i:number):Boolean{
        if(this.scrollStart > i && this.scrollEnd < i) {
            return true;
        }else{
            return false;
        }
    }
    limitFrameSet(i:number):number{
        if(this.scrollStart < i) {
            return this.scrollStart;
        }else if(this.scrollEnd > i){
            return this.scrollEnd;
        }
    }
}