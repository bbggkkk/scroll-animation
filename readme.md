# Scroll Animation

스크롤에 따라 애니메이션 키프레임으로 렌더링되는 라이브러리입니다.<br/>

---

## 데모
[데모페이지](https://bbggkkk.github.io/scroll-animation/)

---

## 사용방법

Scroll Animation 클래스는 window 객체 안에 ScrollAnimation 이라는 이름으로 정의되어 있습니다.<br/>
입력 파라미터는 아래와 같습니다.

```js
new ScrollAnimation(element, scrollTarget, animationName, scrollStartPosition, scrollEndPosition);
```
|항목 이름|설명|형식|비고|
|-|-|-|-|
|scrollTarget|스크롤 이벤트를 받을 엘리먼트입니다.|`Window` `HTMLElement`||
|element|애니메이션을 적용받을 엘리먼트를 선택하기위해 querySelector 함수에 들어갈 문자열입니다.|`string`||

---

## 예제

1. 먼저 애니메이션을 정의해야 합니다.
```html
<div id="animation" data-animation-0="color:red;"
                    data-animation-100="color:blud;">
    <p>HELLO</p>
</div>
```

2. 자바스크립트에서 애니메이션을 생성합니다. 여기서는 window 스크롤에 따라 배경화면과 글자색깔이 바뀌는 애니메이션을 생성합니다.
```js
const element = '#animation';
const scrollTarget = window;

const animation = new ScrollAnimation(element, scrollTarget);
```

4. 이제 스크롤을 하면 #animation 엘리먼트의 글자색이 바뀝니다.

---
## Animation 정의하기

### 필수 입력값값
|항목 이름|설명|비고|
|-|-|-|
|data-animation-0|애니메이션의 처음 값 입니다.||
|data-animation-100|애니메이션의 마지막막 값 입니다.||
|data-animation-start|애니메이션을 적용받을 스크롤 범위를 정의합니다. 시작위치입니다.||
|data-animation-end|애니메이션을 적용받을 스크롤 범위를 정의합니다. 끝 위치입니다.||

### 선택적 입력값
|항목 이름|설명|비고|
|-|-|-|
|data-animation-[n]|애니메이션의 중간값을 정의합니다.||
|data-animation-bind|쿼리셀렉터 문자열을 입력하면 그 엘리먼트에 적용된 애니메이션을 적용받습니다.||
|data-animation-start|애니메이션을 적용받을 스크롤 범위를 정의합니다. 시작위치입니다.||
|data-animation-end|애니메이션을 적용받을 스크롤 범위를 정의합니다. 끝 위치입니다.||

#### data-animation-[n]
CSS에서 javascript를 사용할 수 있는 문법을 제공합니다. CSS속성의 값으로 javascript를 넘길 수 있습니다. javascript는 *<\$* *\$*> 사이에 작성합니다. 넘기는 javascript는 CSS 속성의 값을 반환해야 합니다.
```html
<div id="animation" style="width:50px; height:100px;"
                    data-animation-0="color:red; transform:translate(0px, 0px);"
                    data-animation-100="color:blud; transform:<$ return `translate(${this.offsetWidth}px, ${this.offsetHeight}px)` $>;">
    <p>HELLO</p>
</div>
```
위처럼 작성한 코드는 함수 실행 후 아래처럼 인식합니다.
```html
<div id="animation" style="width:50px; height:100px;"
                    data-animation-0="color:red; transform:translate(0px, 0px);"
                    data-animation-100="color:blud; transform:translate(50px, 100px);">
    <p>HELLO</p>
</div>
```