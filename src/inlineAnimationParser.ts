export const getCSSAttribute = (element:HTMLElement) => {
    const attrs = Array.from(element.attributes).reduce((acc, item) => {
        const key     = item.name, val = item.value;
        const rowname = key.match(/^data\-animation\-(\d+)$/);
        if(rowname === null){
            return acc;
        }else{
            acc[rowname[1]] = parseCSS(val, element);
            return acc;
        }
    },{});
    return attrs;
}

export const parseCSS = ($css:string, element:HTMLElement):object => {
    const css       = $css.replace(/;$/,"").trim();
    const cssJS     = css.replace(/\n|(;)$/g,"")
        .split(/;(?![^<$]*\$>)/)
        .map(item => item.replace(/\-([a-z])/g,(match,p1)=>p1.toUpperCase()))
        .reduce( (acc,item) => {
            const i = item.indexOf(':');
            const [val, key] = [item.substring(0, i), item.substring(i+1)];
            acc[val.trim()] = isEval(key.replace(/ +/g," ").trim(), element);
            return acc;
        },{});
    return cssJS;
}

export const isEval = (val:string, element:HTMLElement) => {
    const rt = val.match(/^\<\$(.*)\$\>$/);
    if(rt !== null){
        return new Function(rt[1]).bind(element);
    }else{
        return val;
    }
}