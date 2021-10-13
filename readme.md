# Scroll Animation

스크롤에 따라 애니메이션 키프레임으로 렌더링되는 라이브러리입니다.<br/>

---

## 사용방법

Scroll Animation 클래스는 window 객체 안에 ScrollAnimation 이라는 이름으로 정의되어 있습니다.<br/>
입력 파라미터는 아래와 같습니다.

```js
new ScrollAnimation(element, scrollTarget, animationName, scrollStartPosition, scrollEndPosition);
```
|항목 이름|설명|형식|비고|
|-|-|-|-|
|element|애니메이션을 적용받을 엘리먼트입니다.|`HTMLElement`||
|scrollTarget|스크롤 이벤트를 받을 엘리먼트입니다.|`Window` `HTMLElement`||
|animationName|CSS에 정의된 애니메이션 이름입니다.|`string`||
|scrollStartPosition|스크롤이 시작될 지점을 지정합니다.|`number` `function`|고정된 값과, 함수를 받을 수 있습니다. 함수를 전달할 경우, `number`형식의 값을 리턴해야 합니다.|
|scrollEndPosition|스크롤이 끝날 지점을 지정합니다.|`number` `function`|고정된 값과, 함수를 받을 수 있습니다. 함수를 전달할 경우, `number`형식의 값을 리턴해야 합니다.|

---

## 예제

1. 먼저 애니메이션을 정의해야 합니다. CSS에 사용하려는 애니메이션을 정의합니다.
```css
@keyframe animation-name {
    from { color:red; background:rgb(0,0,0); }
    50%  { background:rgba(128,2555,128,1); }
    to   { color:blue; background:#fff; }
}
```

2. 애니메이션을 적용받을 마크업을 작성합니다.
```html
<div id="animation">
    <p>HELLO</p>
</div>
```

3. 자바스크립트에서 애니메이션을 생성합니다. 여기서는 window 스크롤에 따라 배경화면과 글자색깔이 바뀌는 애니메이션을 생성합니다.
```js
const element = document.querySelector('#animation');
const scrollTarget = window;
const animationName = 'animation-name';
const start = 0;
const end = () => document.documentElement.scrollHeight - document.documentElement.offsetHeight;

const animation = new ScrollAnimation(element, scrollTarget, animation, start, end);
```

4. 이제 스크롤을 하면 #animation 엘리먼트의 배경색과 글자색이 바뀝니다.