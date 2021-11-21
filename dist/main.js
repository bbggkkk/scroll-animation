/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/colorMap.ts":
/*!*************************!*\
  !*** ./src/colorMap.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"colors\": () => (/* binding */ colors),\n/* harmony export */   \"colorReg\": () => (/* binding */ colorReg)\n/* harmony export */ });\nconst colors = {\r\n    \"black\": \"rgba(0,0,0,1)\",\r\n    \"white\": \"rgba(255,255,255,1)\",\r\n    \"red\": \"rgba(255,0,0,1)\",\r\n    \"lime\": \"rgba(0,255,0,1)\",\r\n    \"blue\": \"rgba(0,0,255,1)\",\r\n    \"yellow\": \"rgba(255,255,0,1)\",\r\n    \"cyan\": \"rgba(0,255,255,1)\",\r\n    \"aqua\": \"rgba(0,255,255,1)\",\r\n    \"magenta\": \"rgba(255,0,255,1)\",\r\n    \"fuchsia\": \"rgba(255,0,255,1)\",\r\n    \"silver\": \"rgba(192,192,192,1)\",\r\n    \"gray\": \"rgba(128,128,128,1)\",\r\n    \"maroon\": \"rgba(128,0,0,1)\",\r\n    \"olive\": \"rgba(128,128,0,1)\",\r\n    \"green\": \"rgba(0,128,0,1)\",\r\n    \"purple\": \"rgba(128,0,128,1)\",\r\n    \"teal\": \"rgba(0,128,128,1)\",\r\n    \"navy\": \"rgba(0,0,128,1)\",\r\n    \"darkred\": \"rgba(139,0,0,1)\",\r\n    \"brown\": \"rgba(165,42,42,1)\",\r\n    \"firebrick\": \"rgba(178,34,34,1)\",\r\n    \"crimson\": \"rgba(220,20,60,1)\",\r\n    \"tomato\": \"rgba(255,99,71,1)\",\r\n    \"coral\": \"rgba(255,127,80,1)\",\r\n    \"indianred\": \"rgba(205,92,92,1)\",\r\n    \"lightcoral\": \"rgba(240,128,128,1)\",\r\n    \"darksalmon\": \"rgba(233,150,122,1)\",\r\n    \"salmon\": \"rgba(250,128,114,1)\",\r\n    \"lightsalmon\": \"rgba(255,160,122,1)\",\r\n    \"orangered\": \"rgba(255,69,0,1)\",\r\n    \"darkorange\": \"rgba(255,140,0,1)\",\r\n    \"orange\": \"rgba(255,165,0,1)\",\r\n    \"gold\": \"rgba(255,215,0,1)\",\r\n    \"darkgoldenrod\": \"rgba(184,134,11,1)\",\r\n    \"goldenrod\": \"rgba(218,165,32,1)\",\r\n    \"palegoldenrod\": \"rgba(238,232,170,1)\",\r\n    \"darkkhaki\": \"rgba(189,183,107,1)\",\r\n    \"khaki\": \"rgba(240,230,140,1)\",\r\n    \"yellowgreen\": \"rgba(154,205,50,1)\",\r\n    \"darkolivegreen\": \"rgba(85,107,47,1)\",\r\n    \"olivedrab\": \"rgba(107,142,35,1)\",\r\n    \"lawngreen\": \"rgba(124,252,0,1)\",\r\n    \"chartreuse\": \"rgba(127,255,0,1)\",\r\n    \"greenyellow\": \"rgba(173,255,47,1)\",\r\n    \"darkgreen\": \"rgba(0,100,0,1)\",\r\n    \"forestgreen\": \"rgba(34,139,34,1)\",\r\n    \"limegreen\": \"rgba(50,205,50,1)\",\r\n    \"lightgreen\": \"rgba(144,238,144,1)\",\r\n    \"palegreen\": \"rgba(152,251,152,1)\",\r\n    \"darkseagreen\": \"rgba(143,188,143,1)\",\r\n    \"mediumspringgreen\": \"rgba(0,250,154,1)\",\r\n    \"springgreen\": \"rgba(0,255,127,1)\",\r\n    \"seagreen\": \"rgba(46,139,87,1)\",\r\n    \"mediumaquamarine\": \"rgba(102,205,170,1)\",\r\n    \"mediumseagreen\": \"rgba(60,179,113,1)\",\r\n    \"lightseagreen\": \"rgba(32,178,170,1)\",\r\n    \"darkslategray\": \"rgba(47,79,79,1)\",\r\n    \"darkcyan\": \"rgba(0,139,139,1)\",\r\n    \"lightcyan\": \"rgba(224,255,255,1)\",\r\n    \"darkturquoise\": \"rgba(0,206,209,1)\",\r\n    \"turquoise\": \"rgba(64,224,208,1)\",\r\n    \"mediumturquoise\": \"rgba(72,209,204,1)\",\r\n    \"paleturquoise\": \"rgba(175,238,238,1)\",\r\n    \"aquamarine\": \"rgba(127,255,212,1)\",\r\n    \"powderblue\": \"rgba(176,224,230,1)\",\r\n    \"cadetblue\": \"rgba(95,158,160,1)\",\r\n    \"steelblue\": \"rgba(70,130,180,1)\",\r\n    \"cornflowerblue\": \"rgba(100,149,237,1)\",\r\n    \"deepskyblue\": \"rgba(0,191,255,1)\",\r\n    \"dodgerblue\": \"rgba(30,144,255,1)\",\r\n    \"lightblue\": \"rgba(173,216,230,1)\",\r\n    \"skyblue\": \"rgba(135,206,235,1)\",\r\n    \"lightskyblue\": \"rgba(135,206,250,1)\",\r\n    \"midnightblue\": \"rgba(25,25,112,1)\",\r\n    \"darkblue\": \"rgba(0,0,139,1)\",\r\n    \"mediumblue\": \"rgba(0,0,205,1)\",\r\n    \"royalblue\": \"rgba(65,105,225,1)\",\r\n    \"blueviolet\": \"rgba(138,43,226,1)\",\r\n    \"indigo\": \"rgba(75,0,130,1)\",\r\n    \"darkslateblue\": \"rgba(72,61,139,1)\",\r\n    \"slateblue\": \"rgba(106,90,205,1)\",\r\n    \"mediumslateblue\": \"rgba(123,104,238,1)\",\r\n    \"mediumpurple\": \"rgba(147,112,219,1)\",\r\n    \"darkmagenta\": \"rgba(139,0,139,1)\",\r\n    \"darkviolet\": \"rgba(148,0,211,1)\",\r\n    \"darkorchid\": \"rgba(153,50,204,1)\",\r\n    \"mediumorchid\": \"rgba(186,85,211,1)\",\r\n    \"thistle\": \"rgba(216,191,216,1)\",\r\n    \"plum\": \"rgba(221,160,221,1)\",\r\n    \"violet\": \"rgba(238,130,238,1)\",\r\n    \"orchid\": \"rgba(218,112,214,1)\",\r\n    \"mediumvioletred\": \"rgba(199,21,133,1)\",\r\n    \"palevioletred\": \"rgba(219,112,147,1)\",\r\n    \"deeppink\": \"rgba(255,20,147,1)\",\r\n    \"hotpink\": \"rgba(255,105,180,1)\",\r\n    \"lightpink\": \"rgba(255,182,193,1)\",\r\n    \"pink\": \"rgba(255,192,203,1)\",\r\n    \"antiquewhite\": \"rgba(250,235,215,1)\",\r\n    \"beige\": \"rgba(245,245,220,1)\",\r\n    \"bisque\": \"rgba(255,228,196,1)\",\r\n    \"blanchedalmond\": \"rgba(255,235,205,1)\",\r\n    \"wheat\": \"rgba(245,222,179,1)\",\r\n    \"cornsilk\": \"rgba(255,248,220,1)\",\r\n    \"lemonchiffon\": \"rgba(255,250,205,1)\",\r\n    \"lightgoldenrodyellow\": \"rgba(250,250,210,1)\",\r\n    \"lightyellow\": \"rgba(255,255,224,1)\",\r\n    \"saddlebrown\": \"rgba(139,69,19,1)\",\r\n    \"sienna\": \"rgba(160,82,45,1)\",\r\n    \"chocolate\": \"rgba(210,105,30,1)\",\r\n    \"peru\": \"rgba(205,133,63,1)\",\r\n    \"sandybrown\": \"rgba(244,164,96,1)\",\r\n    \"burlywood\": \"rgba(222,184,135,1)\",\r\n    \"tan\": \"rgba(210,180,140,1)\",\r\n    \"rosybrown\": \"rgba(188,143,143,1)\",\r\n    \"moccasin\": \"rgba(255,228,181,1)\",\r\n    \"navajowhite\": \"rgba(255,222,173,1)\",\r\n    \"peachpuff\": \"rgba(255,218,185,1)\",\r\n    \"mistyrose\": \"rgba(255,228,225,1)\",\r\n    \"lavenderblush\": \"rgba(255,240,245,1)\",\r\n    \"linen\": \"rgba(250,240,230,1)\",\r\n    \"oldlace\": \"rgba(253,245,230,1)\",\r\n    \"papayawhip\": \"rgba(255,239,213,1)\",\r\n    \"seashell\": \"rgba(255,245,238,1)\",\r\n    \"mintcream\": \"rgba(245,255,250,1)\",\r\n    \"slategray\": \"rgba(112,128,144,1)\",\r\n    \"lightslategray\": \"rgba(119,136,153,1)\",\r\n    \"lightsteelblue\": \"rgba(176,196,222,1)\",\r\n    \"lavender\": \"rgba(230,230,250,1)\",\r\n    \"floralwhite\": \"rgba(255,250,240,1)\",\r\n    \"aliceblue\": \"rgba(240,248,255,1)\",\r\n    \"ghostwhite\": \"rgba(248,248,255,1)\",\r\n    \"honeydew\": \"rgba(240,255,240,1)\",\r\n    \"ivory\": \"rgba(255,255,240,1)\",\r\n    \"azure\": \"rgba(240,255,255,1)\",\r\n    \"snow\": \"rgba(255,250,250,1)\",\r\n    \"dimgray\": \"rgba(105,105,105,1)\",\r\n    \"dimgrey\": \"rgba(105,105,105,1)\",\r\n    \"grey\": \"rgba(128,128,128,1)\",\r\n    \"darkgray\": \"rgba(169,169,169,1)\",\r\n    \"darkgrey\": \"rgba(169,169,169,1)\",\r\n    \"lightgray\": \"rgba(211,211,211,1)\",\r\n    \"lightgrey\": \"rgba(211,211,211,1)\",\r\n    \"gainsboro\": \"rgba(220,220,220,1)\",\r\n    \"whitesmoke\": \"rgba(245,245,245,1)\"\r\n};\r\nconst colorReg = new RegExp('rgba?\\\\(.*?\\\\)\\|#[0-9a-fA-F]{8}\\|#[0-9a-fA-F]{6}\\|#[0-9a-fA-F]{3}\\|black\\|white\\|red\\|lime\\|blue\\|yellow\\|cyan\\|aqua\\|magenta\\|fuchsia\\|silver\\|gray\\|maroon\\|olive\\|green\\|purple\\|teal\\|navy\\|darkred\\|brown\\|firebrick\\|crimson\\|tomato\\|coral\\|indianred\\|lightcoral\\|darksalmon\\|salmon\\|lightsalmon\\|orangered\\|darkorange\\|orange\\|gold\\|darkgoldenrod\\|goldenrod\\|palegoldenrod\\|darkkhaki\\|khaki\\|yellowgreen\\|darkolivegree\\| olivedrab\\|lawngreen\\|chartreuse\\|greenyellow\\|darkgreen\\|forestgreen\\|limegreen\\|lightgreen\\|palegreen\\|darkseagreen\\|mediumspringg\\|springgreen\\|seagreen\\|mediumaquamar\\|mediumseagree\\|lightseagreen\\|darkslategray\\|darkcyan\\|lightcyan\\|darkturquoise\\|turquoise\\|mediumturquoi\\|paleturquoise\\|aquamarine\\|powderblue\\|cadetblue\\|steelblue\\|cornflowerblu\\|deepskyblue\\|dodgerblue\\|lightblue\\|skyblue\\|lightskyblue\\|midnightblue\\|darkblue\\|mediumblue\\|royalblue\\|blueviolet\\|indigo\\|darkslateblue\\|slateblue\\|mediumslatebl\\|mediumpurple\\|darkmagenta\\|darkviolet\\|darkorchid\\|mediumorchid\\|thistle\\|plum\\|violet\\|orchid\\|mediumvioletr\\|palevioletred\\|deeppink\\|hotpink\\|lightpink\\|pink\\|antiquewhite\\|beige\\|bisque\\|blanchedalmon\\|wheat\\|cornsilk\\|lemonchiffon\\|lightgoldenro\\|lightyellow\\|saddlebrown\\|sienna\\|chocolate\\|peru\\|sandybrown\\|burlywood\\|tan\\|rosybrown\\|moccasin\\|navajowhite\\|peachpuff\\|mistyrose\\|lavenderblush\\|linen\\|oldlace\\|papayawhip\\|seashell\\|mintcream\\|slategray\\|lightslategra\\|lightsteelblu\\|lavender\\|floralwhite\\|aliceblue\\|ghostwhite\\|honeydew\\|ivory\\|azure\\|snow\\|dimgray\\|dimgrey\\|grey\\|darkgray\\|darkgrey\\|lightgray\\|lightgrey\\|gainsboro\\|whitesmoke', 'g');\r\n\n\n//# sourceURL=webpack:///./src/colorMap.ts?");

/***/ }),

/***/ "./src/createKeyframes.ts":
/*!********************************!*\
  !*** ./src/createKeyframes.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"delay\": () => (/* binding */ delay),\n/* harmony export */   \"play\": () => (/* binding */ play),\n/* harmony export */   \"gotoAndStop\": () => (/* binding */ gotoAndStop),\n/* harmony export */   \"createKeyframes\": () => (/* binding */ createKeyframes),\n/* harmony export */   \"updateAnimation\": () => (/* binding */ updateAnimation),\n/* harmony export */   \"getKeyframe\": () => (/* binding */ getKeyframe),\n/* harmony export */   \"colorRGBLize\": () => (/* binding */ colorRGBLize),\n/* harmony export */   \"findSpcKeys\": () => (/* binding */ findSpcKeys),\n/* harmony export */   \"findFnKeys\": () => (/* binding */ findFnKeys),\n/* harmony export */   \"findColorKeys\": () => (/* binding */ findColorKeys)\n/* harmony export */ });\n/* harmony import */ var _colorMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colorMap */ \"./src/colorMap.ts\");\n/* harmony import */ var _animation_worker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation.worker */ \"./src/animation.worker.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\nconst delay = (duration) => {\r\n    return new Promise((res, rej) => {\r\n        setTimeout(() => {\r\n            res(true);\r\n        }, duration);\r\n    });\r\n};\r\nconst play = (element, animation, fps = 60) => __awaiter(void 0, void 0, void 0, function* () {\r\n    const lng = animation.length;\r\n    const delayNum = 1000 / fps;\r\n    // let frame = 0;\r\n    for (let i = 0; i < lng; i++) {\r\n        gotoAndStop(element, animation, i);\r\n        yield delay(delayNum);\r\n    }\r\n});\r\nconst gotoAndStop = (element, animation, frame) => {\r\n    let style = animation[frame];\r\n    Object.keys(style).forEach((item) => __awaiter(void 0, void 0, void 0, function* () {\r\n        element.style[item] = style[item];\r\n    }));\r\n};\r\nconst createKeyframes = (animation, length, option) => {\r\n    const { fnKeys, colorKeys } = option === undefined || option.fnKeys === undefined || option.colorKeys === undefined\r\n        ? findSpcKeys(animation)\r\n        : option;\r\n    //option에 함수밸류를 가진 속성을 명시하지 않으면, 자동으로 찾습니다.\r\n    const updator = updateAnimation(animation, length, fnKeys, colorKeys);\r\n    const getKeyframor = getKeyframe(animation, length, fnKeys, colorKeys);\r\n    return [updator, getKeyframor]; //애니메이션 키프레임, 키프레임 재생성 함수, 특정 프레임 불러오는 함수 반환\r\n};\r\nconst updateAnimation = (animation, length, fnKeys, colorKeys) => {\r\n    //애니메이션 키프레임을 재생성합니다.\r\n    return () => {\r\n        const lng = typeof length === 'function' ? length() : length;\r\n        // const settedAnimation = ;\r\n        const worker = new _animation_worker__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        // const worker = new Worker(new URL('./animation.worker.ts', import.meta.url));\r\n        const promise = new Promise((res, rej) => {\r\n            worker.onmessage = ({ data }) => {\r\n                res(data);\r\n            };\r\n        });\r\n        worker.postMessage({\r\n            animation: setDefaultAnimation(animation, fnKeys, colorKeys),\r\n            length: lng\r\n        });\r\n        return promise;\r\n        // return settedAnimation;\r\n    };\r\n};\r\nconst getKeyframe = (animation, length, fnKeys, colorKeys) => {\r\n    return (idx) => {\r\n        const lng = typeof length === 'function' ? length() : length;\r\n        // const settedAnimation = ;\r\n        const worker = new _animation_worker__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        // const worker = new Worker(new URL('./animation.worker.ts', import.meta.url));\r\n        const promise = new Promise((res, rej) => {\r\n            worker.onmessage = ({ data }) => {\r\n                res(data);\r\n            };\r\n        });\r\n        worker.postMessage({\r\n            animation: setDefaultAnimation(animation, fnKeys, colorKeys),\r\n            length: lng,\r\n            idx: idx\r\n        });\r\n        return promise;\r\n    };\r\n};\r\nconst setDefaultAnimation = (animation, fnKeys, colorKeys) => {\r\n    //초기 함수 실행 후 값 변환, 색깔코드 변환\r\n    let ani = JSON.parse(JSON.stringify(animation));\r\n    Object.keys(fnKeys).forEach((item) => {\r\n        fnKeys[item].forEach((prop) => {\r\n            ani[item][prop] = animation[item][prop]();\r\n            // const fn:Function = animation[item][prop] as Function;\r\n        });\r\n    });\r\n    //함수 실행행\r\n    Object.keys(colorKeys).forEach((item) => {\r\n        colorKeys[item].forEach((prop) => {\r\n            ani[item][prop] = colorRGBLize(animation[item][prop]);\r\n        });\r\n    });\r\n    //색깔 변경\r\n    return ani;\r\n};\r\nconst colorRGBLize = ($color) => {\r\n    let str = $color.replace(_colorMap__WEBPACK_IMPORTED_MODULE_0__.colorReg, (match, p1) => {\r\n        if (match.substring(0, 1) === '#') {\r\n            let color = '';\r\n            switch (match.length) {\r\n                case 4:\r\n                    const cs = match.split('').splice(1, 4);\r\n                    color = (cs.reduce((acc, item) => {\r\n                        acc += (item + item);\r\n                        return acc;\r\n                    }, '')) + 'ff';\r\n                    break;\r\n                case 7:\r\n                    color = (match.replace('#', '')) + 'ff';\r\n                    break;\r\n                case 9:\r\n                    color = (match.replace('#', ''));\r\n                    break;\r\n                default:\r\n                    color = 'ffffffff';\r\n            }\r\n            const rgba = [parseInt(color.substring(0, 2), 16), parseInt(color.substring(2, 4), 16), parseInt(color.substring(4, 6), 16), (parseInt(color.substring(6, 8), 16) / 255)];\r\n            return 'rgba(' + rgba.join(',') + ')';\r\n        }\r\n        else if (match.substring(0, 3) === 'rgb') {\r\n            if (match.substring(3, 4) === 'a')\r\n                return match;\r\n            else\r\n                return match.replace(/\\((.*?)\\)/, '($1,1)').replace('rgb', 'rgba');\r\n        }\r\n        else {\r\n            return _colorMap__WEBPACK_IMPORTED_MODULE_0__.colors[$color] === undefined ? 'rgba(255,255,255,0.5)' : _colorMap__WEBPACK_IMPORTED_MODULE_0__.colors[$color];\r\n        }\r\n    });\r\n    return str;\r\n};\r\nconst findSpcKeys = (animation) => {\r\n    //색깔 속성을 가진 키프레임과 함수 속성을 가진 키프레임을 찾아냅니다.\r\n    const result = Object.keys(animation).reduce((acc, item) => {\r\n        const thisAnimation = animation[item];\r\n        const fnKeys = findFnKeys(thisAnimation);\r\n        const colorKeys = findColorKeys(thisAnimation);\r\n        if (fnKeys.length > 0)\r\n            acc.fnKeys[item] = fnKeys;\r\n        if (colorKeys.length > 0)\r\n            acc.colorKeys[item] = colorKeys;\r\n        return acc;\r\n    }, { fnKeys: {}, colorKeys: {} });\r\n    return result;\r\n};\r\nconst findFnKeys = (animationValue) => {\r\n    //함수 속성을 가진 키프레임을 반환합니다.\r\n    return Object.keys(animationValue).filter($item => {\r\n        return typeof animationValue[$item] === 'function';\r\n    });\r\n};\r\nconst findColorKeys = (animationValue) => {\r\n    //색깔 속성을 가진 키프레임을 반환합니다.\r\n    return Object.keys(animationValue).filter($item => {\r\n        return typeof animationValue[$item] === 'string' && String(animationValue[$item]).match(_colorMap__WEBPACK_IMPORTED_MODULE_0__.colorReg) !== null;\r\n    });\r\n};\r\n// .match(/[^)^\\s]*\\(.*?\\)/g)\r\n\n\n//# sourceURL=webpack:///./src/createKeyframes.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scrollAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scrollAnimation */ \"./src/scrollAnimation.ts\");\n\r\nif (!(typeof exports === 'object' && \"object\" !== 'undefined')) {\r\n    window.ScrollAnimation = _scrollAnimation__WEBPACK_IMPORTED_MODULE_0__.ScrollAnimation;\r\n}\r\nconsole.log(new _scrollAnimation__WEBPACK_IMPORTED_MODULE_0__.ScrollAnimation(window, '.target'));\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/inlineAnimationParser.ts":
/*!**************************************!*\
  !*** ./src/inlineAnimationParser.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCSSAttribute\": () => (/* binding */ getCSSAttribute),\n/* harmony export */   \"parseCSS\": () => (/* binding */ parseCSS),\n/* harmony export */   \"isEval\": () => (/* binding */ isEval)\n/* harmony export */ });\nconst getCSSAttribute = (element, elementReplace) => {\r\n    const attrs = Array.from(element.attributes).reduce((acc, item) => {\r\n        const key = item.name, val = item.value;\r\n        const rowname = key.match(/^data\\-animation\\-(\\d+)$/);\r\n        if (rowname === null) {\r\n            return acc;\r\n        }\r\n        else {\r\n            acc[rowname[1]] = parseCSS(val, element, elementReplace);\r\n            return acc;\r\n        }\r\n    }, {});\r\n    return attrs;\r\n};\r\nconst parseCSS = ($css, element, elementReplace) => {\r\n    const css = $css.replace(/;$/, \"\").trim();\r\n    const cssJS = css.replace(/\\n|(;)$/g, \"\").replace(/<\\$(.*)\\$>/g, (match, p1) => '<$' + encodeURIComponent(p1) + '$>')\r\n        .split(/;(?![^<$]*\\$>)/)\r\n        .map(item => item.replace(/\\-([a-z])/g, (match, p1) => p1.toUpperCase()))\r\n        .reduce((acc, item) => {\r\n        const i = item.indexOf(':');\r\n        const [val, key] = [item.substring(0, i), item.substring(i + 1).match(/<\\$.*\\$>/) ? decodeURIComponent(item.substring(i + 1)) : item.substring(i + 1)];\r\n        acc[val.trim()] = isEval(key.replace(/ +/g, \" \").trim(), element, elementReplace);\r\n        return acc;\r\n    }, {});\r\n    return cssJS;\r\n};\r\nconst isEval = (val, element, elementReplace) => {\r\n    if (elementReplace !== undefined)\r\n        element = elementReplace;\r\n    const rt = val.match(/^\\<\\$(.*)\\$\\>$/);\r\n    if (rt !== null) {\r\n        return new Function(rt[1]).bind(element);\r\n    }\r\n    else {\r\n        return val;\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/inlineAnimationParser.ts?");

/***/ }),

/***/ "./src/scrollAnimation.ts":
/*!********************************!*\
  !*** ./src/scrollAnimation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ScrollAnimation\": () => (/* binding */ ScrollAnimation),\n/* harmony export */   \"ScrollAnimationItem\": () => (/* binding */ ScrollAnimationItem)\n/* harmony export */ });\n/* harmony import */ var _createKeyframes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createKeyframes */ \"./src/createKeyframes.ts\");\n/* harmony import */ var _inlineAnimationParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inlineAnimationParser */ \"./src/inlineAnimationParser.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\nclass ScrollAnimation {\r\n    constructor(scrollBody, targetQuery) {\r\n        this.scrollBody = scrollBody;\r\n        this.scrollEle = scrollBody === window ? document.documentElement : scrollBody;\r\n        this.children = Array.from(document.querySelectorAll(targetQuery)).map(item => new ScrollAnimationItem(item));\r\n        this.onResizeFunction();\r\n        this.load();\r\n    }\r\n    bindEvent() {\r\n        this.scrollFunctionFunction = this.scrollFunction.bind(this);\r\n        this.scrollBody.addEventListener('scroll', this.scrollFunctionFunction);\r\n    }\r\n    scrollFunction() {\r\n        requestAnimationFrame(() => {\r\n            this.children.forEach((item) => {\r\n                item.onAnimation(Math.round(this.scrollEle.scrollTop));\r\n            });\r\n        });\r\n    }\r\n    onResize() {\r\n        this.resizeObserver = new ResizeObserver(this.onResizeFunction.bind(this));\r\n        this.resizeObserver.observe(this.scrollEle);\r\n    }\r\n    onResizeFunction() {\r\n        requestAnimationFrame(() => {\r\n            this.children.forEach((item) => {\r\n                item.onResize();\r\n                item.onAnimation(Math.round(this.scrollEle.scrollTop));\r\n            });\r\n        });\r\n    }\r\n    load() {\r\n        this.onResize();\r\n        this.bindEvent();\r\n    }\r\n    destroy() {\r\n        this.scrollBody.removeEventListener('scroll', this.scrollFunctionFunction);\r\n        this.resizeObserver.unobserve(this.scrollEle);\r\n        this.resizeObserver = undefined;\r\n    }\r\n}\r\nclass ScrollAnimationItem {\r\n    constructor(element) {\r\n        this.element = element;\r\n        this.animation = undefined;\r\n        this.setAttributeValue();\r\n    }\r\n    onResize() {\r\n        this.setLength();\r\n        [this.updator, this.getKeyframe] = (0,_createKeyframes__WEBPACK_IMPORTED_MODULE_0__.createKeyframes)((0,_inlineAnimationParser__WEBPACK_IMPORTED_MODULE_1__.getCSSAttribute)(this.element.getAttribute('data-animation-bind') ? document.querySelector(this.element.getAttribute('data-animation-bind')) : this.element, this.element), this.length);\r\n        this.updator().then((data) => {\r\n            this.animation = data;\r\n        });\r\n    }\r\n    setAttributeValue() {\r\n        this.scrollStart = (0,_inlineAnimationParser__WEBPACK_IMPORTED_MODULE_1__.isEval)(this.element.getAttribute('data-animation-start'), this.element);\r\n        this.scrollEnd = (0,_inlineAnimationParser__WEBPACK_IMPORTED_MODULE_1__.isEval)(this.element.getAttribute('data-animation-end'), this.element);\r\n    }\r\n    setLength() {\r\n        this.length = () => {\r\n            return this.getLngResult(this.scrollEnd) - this.getLngResult(this.scrollStart);\r\n        };\r\n    }\r\n    getLngResult(fn) {\r\n        if (typeof fn === 'function') {\r\n            return Number(fn());\r\n        }\r\n        else {\r\n            return Number(fn);\r\n        }\r\n    }\r\n    setAnimationFrame(frame) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (this.animation !== undefined) {\r\n                (0,_createKeyframes__WEBPACK_IMPORTED_MODULE_0__.gotoAndStop)(this.element, this.animation, frame);\r\n            }\r\n            else {\r\n                (0,_createKeyframes__WEBPACK_IMPORTED_MODULE_0__.gotoAndStop)(this.element, [yield this.getKeyframe(frame)], 0);\r\n            }\r\n            return undefined;\r\n        });\r\n    }\r\n    isWillChange(i) {\r\n        if (this.getLngResult(this.scrollStart) - 50 <= i && this.getLngResult(this.scrollEnd) + 50 >= i) {\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    }\r\n    limitFrameSet(i) {\r\n        if (this.getLngResult(this.scrollStart) > i) {\r\n            return this.getLngResult(this.scrollStart);\r\n        }\r\n        else if (this.getLngResult(this.scrollEnd) < i) {\r\n            return this.getLngResult(this.scrollEnd);\r\n        }\r\n        else {\r\n            return i;\r\n        }\r\n    }\r\n    onAnimation(frame) {\r\n        const i = this.limitFrameSet(frame);\r\n        // this.onWillChange(i);\r\n        this.setAnimationFrame(i);\r\n    }\r\n    onWillChange(frame) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (this.isWillChange(frame)) {\r\n                clearTimeout(this.timer);\r\n                if (this.animation !== undefined) {\r\n                    this.element.style.willChange = Object.keys(this.animation[0]).join(',');\r\n                }\r\n                else {\r\n                    this.element.style.willChange = Object.keys(yield this.getKeyframe(frame)).join(',');\r\n                }\r\n                this.timer = setTimeout(() => {\r\n                    this.element.style.willChange = 'auto';\r\n                }, 1000);\r\n            }\r\n            else {\r\n                this.element.style.willChange = 'auto';\r\n            }\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/scrollAnimation.ts?");

/***/ }),

/***/ "./src/animation.worker.ts":
/*!*********************************!*\
  !*** ./src/animation.worker.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Worker_fn)\n/* harmony export */ });\nfunction Worker_fn() {\n  return new Worker(__webpack_require__.p + \"main.worker.js\");\n}\n\n\n//# sourceURL=webpack:///./src/animation.worker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;