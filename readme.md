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

---

## 알아 두면 좋은 사항

- 애니메이션에서 사용되는 CSS속성은 애니메이션의 처음과 끝에 초기값과 마지막값이 정의되어 있으면 좋습니다. 작성되어있지 않을 경우 라이브러리에서 추측한 값을 사용합니다.
- 애니메이션을 작성할 때, 각 CSS에서 작성한 순서와 형식을 지키는 것이 좋습니다. 아직 라이브러리의 파싱이 완벽하지 않아서이며, 추후 개선할 예정입니다.
    - 좋은 예시)
    ```css
    0%   { transform:scale(calc(50% + 50vw)); }
    100% { transform:scale(calc(0% + 0vw));   }
    ```
    - 좋지 않은 예시)
    ```css
    0%   { transform:scale(calc(50vw + 50%)); }
    100% { transform:scale(calc(0% + 0vw));   }
    ```