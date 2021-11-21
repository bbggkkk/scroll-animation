import { createKeyframes, gotoAndStop } from "./createKeyframes";
import { getCSSAttribute, isEval } from "./inlineAnimationParser";

export class ScrollAnimation {
    scrollBody  : HTMLElement|Object;
    scrollEle   : HTMLElement;
    children    : Object;
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
    scrollStart : number|Function;
    scrollEnd   : number|Function;
    length      : Function;
    constructor(element:HTMLElement){
        this.element     = element;
        this.animation   = undefined;
        this.setAttributeValue();

        [this.updator, this.getKeyframe] = createKeyframes(getCSSAttribute(element), this.length);
        this.updator().then((data:Array<animationValue>) => this.animation = data);
    }

    setAttributeValue():void{
        this.scrollStart = isEval(this.element.getAttribute('data-animation-start'), this.element);
        this.scrollEnd   = isEval(this.element.getAttribute('data-animation-end'), this.element);

        this.setLength();
    }
    setLength():void {
        this.length      = () => {
            return this.getLngResult(this.scrollEnd) - this.getLngResult(this.scrollStart) + 1;
        }
    }

    getLngResult(fn:number|Function):number {
        if(typeof fn === 'function'){
            return Number(fn());
        }else{
            return Number(fn);
        }
    }

    async setAnimationFrame(frame:number){
        if(this.animation !== undefined) {
            gotoAndStop(this.element, this.animation, frame);
        }else{
            gotoAndStop(this.element, [await this.getKeyframe(frame)], 0);  
        }
        return undefined;
    }
    isScroll(i:number):Boolean{
        if(this.getLngResult(this.scrollStart) <= i && this.getLngResult(this.scrollEnd) >= i) {
            return true;
        }else{
            return false;
        }
    }
    limitFrameSet(i:number):number{
        if(this.getLngResult(this.scrollStart) > i) {
            return this.getLngResult(this.scrollStart);
        }else if(this.getLngResult(this.scrollEnd) < i){
            return this.getLngResult(this.scrollEnd);
        }else{
            return i;
        }
    }

}