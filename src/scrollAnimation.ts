export const getCSSAttribute = (element:HTMLElement) => {
    const attrs = Array.from(element.attributes).reduce((acc, item) => {
        const key     = item.name, val = item.value;
        const rowname = key.match(/^data\-animation\-(\d+)$/);
        if(rowname === null){
            return acc;
        }else{
            acc[rowname[1]] = parseCSS(val);
            return acc;
        }
    },{});
    return attrs;
}

export const parseCSS = ($css:string) => {
    const css       = $css.replace(/;$/,"").trim();
    const cssJS     = css.replace(/\n|(;)$/g,"")
        .split(";")
        .map(item => item.replace(/\-([a-z])/g,(match,p1)=>p1.toUpperCase()))
        .reduce( (acc,item) => {
            acc[item.split(":")[0].trim()] = isEval(item.split(":")[1].replace(/ +/g," ").trim());
            return acc;
        },{});
    return cssJS;
}

export const isEval = (val:string) => {
    const rt = val.match(/^\$\{(.*)\}$/);
    if(rt !== null){
        return new Function('return '+rt[1])();
    }else{
        return val;
    }
}