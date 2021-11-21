
import { createKeyframes, gotoAndStop } from "./createKeyframes";
import { getCSSAttribute, isEval } from "./inlineAnimationParser";

export class ScrollAnimation {
    scrollBody          : any;
    scrollEle           : HTMLElement;
    children            : Array<ScrollAnimationItem>;

    scrollFunctionFunction : Function;
    
    resizeObserver      : ResizeObserver;
    constructor(scrollBody:any, targetQuery:string){
        this.scrollBody = scrollBody;
        this.scrollEle  = scrollBody === window ? document.documentElement : scrollBody as HTMLElement;
        this.children   = Array.from(document.querySelectorAll(targetQuery)).map(item => new ScrollAnimationItem(item as HTMLElement));

        this.onResizeFunction();
        this.load();
    }
    bindEvent(){
        this.scrollFunctionFunction = this.scrollFunction.bind(this);
        this.scrollBody.addEventListener('scroll', this.scrollFunctionFunction); 
    }
    scrollFunction(){
        requestAnimationFrame(() => {
        this.children.forEach((item:ScrollAnimationItem) => {
                item.onAnimation(Math.round(this.scrollEle.scrollTop));
            });
        });
    }
    onResize(){
        this.resizeObserver = new ResizeObserver(this.onResizeFunction.bind(this));
        this.resizeObserver.observe(this.scrollEle);
    }
    onResizeFunction(){
        requestAnimationFrame(() => {
            this.children.forEach((item:ScrollAnimationItem) => {
                item.onResize();
                item.onAnimation(Math.round(this.scrollEle.scrollTop));
            });
        });
    }

    load(){
        this.onResize();
        this.bindEvent();
    }
    destroy(){
        this.scrollBody.removeEventListener('scroll', this.scrollFunctionFunction);
        this.resizeObserver.unobserve(this.scrollEle);
        this.resizeObserver = undefined;
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

    timer       : any;
    constructor(element:HTMLElement){
        this.element     = element;
        this.animation   = undefined;
        this.setAttributeValue();
    }

    onResize(){
        this.setLength();
        [this.updator, this.getKeyframe] = createKeyframes(getCSSAttribute(this.element.getAttribute('data-animation-bind') ? document.querySelector(this.element.getAttribute('data-animation-bind')) : this.element, this.element), this.length);
        this.updator().then((data:Array<animationValue>) => {
            this.animation = data;
        });
    }

    setAttributeValue():void{
        this.scrollStart = isEval(this.element.getAttribute('data-animation-start'), this.element);
        this.scrollEnd   = isEval(this.element.getAttribute('data-animation-end'), this.element);
    }
    setLength():void {
        this.length      = () => {
            return this.getLngResult(this.scrollEnd) - this.getLngResult(this.scrollStart);
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
    isWillChange(i:number):Boolean{
        if(this.getLngResult(this.scrollStart)-50 <= i && this.getLngResult(this.scrollEnd)+50 >= i) {
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

    onAnimation(frame:number):void {
        const i = this.limitFrameSet(frame);
        // this.onWillChange(i);
        this.setAnimationFrame(i);
    }
    async onWillChange(frame:number){
        if(this.isWillChange(frame)){
            clearTimeout(this.timer);
            if(this.animation !== undefined){
                this.element.style.willChange = Object.keys(this.animation[0]).join(',');
            }else{
                this.element.style.willChange = Object.keys(await this.getKeyframe(frame)).join(',');
            }

            this.timer = setTimeout(() => {
                this.element.style.willChange = 'auto';
            }, 1000);
        }else{
            this.element.style.willChange = 'auto';
        }
    }

}