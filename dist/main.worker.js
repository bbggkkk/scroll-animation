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

/***/ "./node_modules/ts-loader/index.js!./src/animation.worker.ts":
/*!*******************************************************************!*\
  !*** ./node_modules/ts-loader/index.js!./src/animation.worker.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// import { colors, colorReg } from './colorMap';\r\nconst numeric = new RegExp('\\\\-?\\\\d{0,}\\\\.?\\\\d+', 'g');\r\nconst getAnimationProps = (animation) => {\r\n    const ani = Object.values(animation);\r\n    return [...new Set(ani.map(item => Object.keys(item)).flat())];\r\n};\r\nconst fillUndefinedProp = (animation, baseKeyframe, keyframeKeys, props) => {\r\n    return keyframeKeys.reduce((acc, item, idx) => {\r\n        acc[item] = props.reduce(($acc, $item) => {\r\n            $acc[$item] = animation[item][$item];\r\n            if ($acc[$item] === undefined) {\r\n                const [prev, pv] = findPrev(animation, idx, $item, keyframeKeys);\r\n                const [next, nv] = findNext(animation, idx, $item, keyframeKeys);\r\n                const pa = animation[prev][$item];\r\n                const na = animation[next][$item];\r\n                const prevMatch = String(pa).match(numeric);\r\n                const dval = String(na).match(numeric).map(($$item, $$idx) => {\r\n                    return parseFloat((parseFloat(prevMatch[$$idx]) + ((parseFloat($$item) - parseFloat(prevMatch[$$idx])) / ((baseKeyframe[nv] - baseKeyframe[pv]) / baseKeyframe[idx]))).toFixed(3));\r\n                });\r\n                let cnt = 0;\r\n                const aval = String(na).replace(numeric, () => {\r\n                    const returnValue = dval[cnt];\r\n                    cnt++;\r\n                    return String(returnValue);\r\n                });\r\n                $acc[$item] = isNaN(Number(aval)) ? aval : Number(aval);\r\n            }\r\n            return $acc;\r\n        }, {});\r\n        return acc;\r\n    }, {});\r\n};\r\nconst fillProps = (animation, animationKeyframe, keyframeKeys, baseKeyframe, props) => {\r\n    const result = animationKeyframe.map((item, idx) => {\r\n        return fillOneProp(item, animationKeyframe, keyframeKeys, baseKeyframe, props, idx);\r\n    });\r\n    return result;\r\n};\r\nconst fillOneProp = (animationValue, animationKeyframe, keyframeKeys, baseKeyframe, props, idx) => {\r\n    if (animationValue[props[0]] !== undefined) {\r\n        return animationValue;\r\n    }\r\n    const [pk, nk] = findPrevNext(idx, baseKeyframe);\r\n    const pr = animationKeyframe[pk], nr = animationKeyframe[nk];\r\n    const row = props.reduce((acc, $item) => {\r\n        const pv = pr[$item], nv = nr[$item];\r\n        const pn = String(pv).match(numeric).map($$item => Number($$item)), nn = String(nv).match(numeric).map($$item => Number($$item));\r\n        const dv = nn.map(($nv, $idx) => {\r\n            return parseFloat((pn[$idx] + (($nv - pn[$idx]) / (nk - pk) * (idx - pk))).toFixed(3));\r\n        });\r\n        let cnt = 0;\r\n        const av = String(nv).replace(numeric, () => {\r\n            const returnValue = dv[cnt];\r\n            cnt++;\r\n            return String(returnValue);\r\n        });\r\n        acc[$item] = isNaN(Number(av)) ? av : Number(av);\r\n        return acc;\r\n    }, {});\r\n    return row;\r\n};\r\nconst findPrevNext = (idx, baseKeyframe) => {\r\n    const nk = baseKeyframe.findIndex((item, $idx) => {\r\n        return Number(item) >= idx;\r\n    });\r\n    const pk = nk - 1;\r\n    return [baseKeyframe[pk], baseKeyframe[nk]];\r\n};\r\nconst findPrev = (animation, idx, prop, keyframeKeys) => {\r\n    const val = idx - 1;\r\n    if (animation[keyframeKeys[val]][prop] !== undefined) {\r\n        return [keyframeKeys[val], val];\r\n    }\r\n    else {\r\n        findPrev(animation, val, prop, keyframeKeys);\r\n    }\r\n};\r\nconst findNext = (animation, idx, prop, keyframeKeys) => {\r\n    const val = idx + 1;\r\n    if (animation[keyframeKeys[val]][prop] !== undefined) {\r\n        return [keyframeKeys[val], val];\r\n    }\r\n    else {\r\n        findNext(animation, val, prop, keyframeKeys);\r\n    }\r\n};\r\nconst getPropValue = () => {\r\n};\r\nonmessage = ({ data }) => {\r\n    const { animation, length, idx } = data;\r\n    const base = (length) / 100;\r\n    const keyframeKeys = Object.keys(animation);\r\n    const baseKeyframe = keyframeKeys.map(item => Math.round(base * parseInt(item)));\r\n    const props = getAnimationProps(animation);\r\n    const baseProp = props.reduce((acc, item) => {\r\n        acc[item] = undefined;\r\n        return acc;\r\n    }, {});\r\n    let animationKeyframe = new Array(length).fill(baseProp);\r\n    const undefinedAnimation = fillUndefinedProp(animation, baseKeyframe, keyframeKeys, props);\r\n    keyframeKeys.forEach((item, idx) => {\r\n        animationKeyframe[baseKeyframe[idx]] = undefinedAnimation[item];\r\n    });\r\n    if (idx === undefined) {\r\n        animationKeyframe = fillProps(animation, animationKeyframe, keyframeKeys, baseKeyframe, props);\r\n        postMessage(animationKeyframe);\r\n    }\r\n    else {\r\n        postMessage(fillOneProp(animation, animationKeyframe, keyframeKeys, baseKeyframe, props, idx));\r\n    }\r\n    // close();\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (null);\r\n\n\n//# sourceURL=webpack:///./src/animation.worker.ts?./node_modules/ts-loader/index.js");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./node_modules/ts-loader/index.js!./src/animation.worker.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;