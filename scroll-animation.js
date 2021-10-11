(function(){
    class ScrollAnimation {
        constructor(element,animation,{
            easing = 'linear'
        } = {}){
            this.element   = element;
            this.animation = animation;
            this.easing    = easing;
        }
    }

    window.ScrollAnimation = ScrollAnimation;
})();