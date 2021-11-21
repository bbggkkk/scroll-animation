export const getCSSAttribute = (element:HTMLElement, elementReplace?:HTMLElement) => {
    const attrs = Array.from(element.attributes).reduce((acc, item) => {
        const key     = item.name, val = item.value;
        const rowname = key.match(/^data\-animation\-(\d+)$/);
        if(rowname === null){
            return acc;
        }else{
            acc[rowname[1]] = parseCSS(val, element, elementReplace);
            return acc;
        }
    },{});
    return attrs;
}

export const parseCSS = ($css:string, element:HTMLElement, elementReplace?:HTMLElement):object => {
    const css       = $css.replace(/;$/,"").trim();
    const cssJS     = css.replace(/\n|(;)$/g,"").replace(/<\$(.*)\$>/g, (match, p1) => '<$'+encodeURIComponent(p1)+'$>')
        .split(/;(?![^<$]*\$>)/)
        .map(item => item.replace(/\-([a-z])/g,(match,p1)=>p1.toUpperCase()))
        .reduce( (acc,item) => {
            const i = item.indexOf(':');
            const [val, key] = [item.substring(0, i), decodeURIComponent(item.substring(i+1))];
            acc[val.trim()] = isEval(key.replace(/ +/g," ").trim(), element, elementReplace);
            return acc;
        },{});
    return cssJS;
}

export const isEval = (val:string, element:HTMLElement, elementReplace?:HTMLElement) => {
    if(elementReplace !== undefined)    element = elementReplace;
    const rt = val.match(/^\<\$(.*)\$\>$/);
    console.log(rt);
    if(rt !== null){
        console.log(new Function(rt[1]).bind(element));
        return new Function(rt[1]).bind(element);
    }else{
        return val;
    }
}