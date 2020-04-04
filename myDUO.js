// ==UserScript==
// @name         Duolingo Improver
// @version      2.9.0.8
// @description  For description visit https://github.com/xeyqe/myDUO/blob/master/README.md
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @author       xeyqe
// @license      MIT
// @include      http://duolingo.com/*
// @include      https://duolingo.com/*
// @include      http://*.duolingo.com/*
// @include      https://*.duolingo.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.10.1/Sortable.min.js
// @resource     customCSS https://raw.githubusercontent.com/xeyqe/duolingo-style/master/darkDUO.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

let style;
let head;
let myArray = [];
let el;
let label;

const progressBar = "_1TkZD";
const hint = "XUDC1 _2nhHI _3ZTEO";
const coloredHint = "_1c_ny _1gjlS";
const father = '._2vedk';


Node.prototype.swiper = function(direction, func) {
    console.log('swiping to ' + direction);
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const gesuredZone = this;

    gesuredZone.addEventListener('touchstart', function(event) {
        touchstartX = event.touches[0].pageX;
        touchstartY = event.touches[0].pageY;
    });

    gesuredZone.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].pageX;
        touchendY = event.changedTouches[0].pageY;

        const absX = Math.abs(touchstartX - touchendX);
        const absY = Math.abs(touchstartY - touchendY);

        if (direction == "swipeRight") {
            if (touchstartX - touchendX < -25 &&
                absY < absX) {
                func(event);
            }
        }
        else if (direction == "swipeLeft") {
            if (touchstartX - touchendX > 25 &&
                absY < absX) {
                func(event);
            }
        }
        else if (direction == "swipeUp") {
            if (touchstartY - touchendY < -25 &&
                absY > absX) {
                func(event);
            }
        }
        else if (direction == "swipeUp") {
            if (touchstartY - touchendY > 25 &&
                absY > absX) {
                func(event);
            }
        }
    });
}

function swipeFunc(event) {
    if (mayISwipe(event)) {
        if (!document.querySelector('.hide')) {
            if (document.querySelector('[data-test="player-next"]')) {
                document.querySelector('[data-test="player-next"]').click();
            }
        }
        else if (!document.querySelector('.show')) {
            showHidePanel();
        }
    }
}

function createNumber() {
    let node = document.createElement("p");
    node.setAttribute("id", "counter");

    node.innerHTML =
        "<span id=\"wrong\" style=\"color:red\">0</span>/<span id=\"right\" style=\"color:#79c822\">0</span>";

    if (document.querySelector('._3-qon')) {
        document.querySelector('._3-qon').appendChild(node);
    }
}

function changeCounter(whichOne) {
    const first = parseInt(document.querySelector('#right').innerText);
    const second = parseInt(document.querySelector('#wrong').innerText);

    if (whichOne == 'right') {
        document.querySelector('#right').innerText = first + 1;
    } else {
        document.querySelector('#wrong').innerText = second + 1;
    }
}

let timeout;
function tempAlert(input) {
    if (timeout) {
        clearTimeout(timeout);
    }

    if (document.querySelector('#tempAlert')) document.querySelector('#tempAlert').remove();


    el = document.createElement("div");

    el.setAttribute('id', 'tempAlert');

    el.appendChild(input.cloneNode(true));

    removeTempAlert(3000);

    el.addEventListener("mouseenter", () => {
        if (document.querySelector('#tempAlert').style.border == "") {
            clearTimeout(timeout);
            timeout = null;
        }
    });

    el.addEventListener("mouseleave", () => {
        if (document.querySelector('#tempAlert').style.border == "") {
            removeTempAlert(3000);
        }
    });

    el.addEventListener("click", ()=>{
        if (document.querySelector('#tempAlert').style.border == "") {
            document.querySelector('#tempAlert').style.border = "3px solid white";
            clearTimeout(timeout);
        }
        else {
            document.querySelector('#tempAlert').style.border = "";
            removeTempAlert(0);
        }
    });
    if (el) {
        document.querySelector('body').appendChild(el);
        el = null;
    }
}

function removeTempAlert(num) {
    timeout = setTimeout(function() {
        const fadeTarget = document.getElementById("tempAlert");
        const fadeEffect = setInterval(function () {
            if (!fadeTarget) clearInterval(fadeEffect);
            else {
                if (!fadeTarget.style.opacity) {
                    fadeTarget.style.opacity = 1;
                }
                if (fadeTarget.style.opacity > 0) {
                    fadeTarget.style.opacity -= 0.01;
                } else {
                    fadeTarget.remove();
                    timeout = null;
                    clearInterval(fadeEffect);
                }
            }
        }, 20);
    }, num);
}

function autoClick() {
    if (document.querySelector('._1Ag8k._1p08S')) {
        if (document.querySelector('[data-test="player-next"]')) {
            document.querySelector('[data-test="player-next"]').click();
        }
    }
}

function reclick() {
    let clickedBtt = document.querySelectorAll('._3ysW7 button');
    let unclickedBtt = Array.from(document.querySelectorAll('._3OG7A button:disabled'));

    for (let i = 0; i < clickedBtt.length; i++) {
        clickedBtt[i].click();
        let el2Click = unclickedBtt.find(el => el.innerText.split('\n')[0] === clickedBtt[i].innerText);
        el2Click.click();
    }

}

function draggable() {
    const output = document.querySelector('._3ysW7');

    Sortable.create(output, {
        onEnd: function (evt){ reclick() },
        animation: 150
    });
}

function keyboardShortcuts() {
    const span = document.createElement('span');
    const list = document.querySelectorAll('[data-test="challenge-tap-token"]');

    const listOfCode = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU",
                      "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF",
                      "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX",
                      "KeyC", "KeyV", "KeyB", "KeyN", "KeyM"];

    for (let i=0; i<list.length; i++) {
        list[i].appendChild(span.cloneNode());
        list[i].querySelector('span').innerText = listOfCode[i][3].toLowerCase();
        list[i].querySelector('span').style.display = 'block';
    }

    document.onkeyup = function(e) {
        if (listOfCode.includes(e.code)) {
            let char = e.code[3].toLowerCase();
            list.forEach(el => {
                if (el.firstElementChild.innerText === char) {
                    el.click();
                }
            })
        } else if (e.code == "Backspace") {
            let node = document.querySelector('._3ysW7');
            if (node.children.length > 0) {
                node.childNodes[node.childNodes.length-1].firstElementChild.click();
            }
        }
    }

    window.addEventListener('resize', hideShowKey);
    hideShowKey();

}

function moveHintDiv(el) {
    let paddingLeft = window.getComputedStyle(document.querySelector('._2vedk')).paddingLeft;
    paddingLeft = parseInt(paddingLeft.substring(0, paddingLeft.length - 2));
    let paddingRight = window.getComputedStyle(document.querySelector('._2vedk')).paddingRight;
    paddingRight = parseInt(paddingRight.substring(0, paddingRight.length - 2));

    const arrow = document.querySelector('._3h4O4');
    const bubble = document.querySelector('._37FmC._2nhHI._3ZTEO');
    const err = (Math.floor(bubble.getBoundingClientRect().x) + Math.floor(bubble.getBoundingClientRect().width + paddingRight)) - (window.innerWidth - 5);

    if (bubble.getBoundingClientRect().x < 0) {
        const er = Math.floor((2*paddingLeft) - bubble.getBoundingClientRect().x)
        bubble.style.left = er + 'px';
        arrow.style.left = -er + bubble.getBoundingClientRect().width/2 + 'px';
    } else if (err > 0) {
        bubble.style.left = -err + 'px';
        document.querySelector('._3h4O4').style.left = (Math.floor(el.getBoundingClientRect().width/2) + err) + 'px';
    }

}

function createSlider() {
    const panel = document.createElement("div");

    panel.setAttribute('class','panel show');

    document.querySelector(father).appendChild(panel);

    document.querySelector(father).addEventListener('mousedown', function(event) {
        const isClickInside = document.querySelector('.panel').contains(event.target) || panel == event.target;

        if (!isClickInside) {
            if (document.querySelector('.hide')) {
                showHidePanel();
            }
        }
    });

    panel.addEventListener("click", function(e){
        e.preventDefault();
        if (document.querySelector('.show')) {
            showHidePanel();
        }
    });

}

function showHidePanel(event){
    if (mayISwipe(event)) {
        if (document.querySelector('.panel div')) {

            const el = document.querySelector('.panel');
            let pos = Math.floor(el.getBoundingClientRect().x);
            const hidePos = -1*(Math.floor(el.getBoundingClientRect().width)-20);

            let interval;
            if(document.querySelector('.panel.show')) {
                interval = setInterval(show, 10);
            } else {
                interval = setInterval(hide, 10);
            }

            function show() {
                if (pos >= 0) {
                    clearInterval(interval);
                    el.classList.remove("show");
                    el.classList.add("hide");
                } else {
                    pos = pos + 10;
                    el.style.left = pos + 'px';
                }
            }

            function hide() {
                if (pos <= hidePos) {
                    clearInterval(interval);
                    el.classList.remove("hide");
                    el.classList.add("show");
                } else {
                    pos = pos - 10;
                    el.style.left = pos + 'px';
                }
            }

        }
    }
}


function neco(color) {
    const promise = new Promise((resolve)=>{
        let question;
        let yourAnswer;
        let header;

        let div = document.createElement("div");
        div.classList.add("panelItem");
        div.classList.add(color);

        document.querySelector('.panel').appendChild(div);

        let emptyDiv = document.createElement("div");
        if (document.querySelector('[data-test="challenge-header"]')) {
            header = document.querySelector('[data-test="challenge-header"]').innerText;
        }

        if (header) {
            const div = emptyDiv.cloneNode();
            div.innerText = header;
            div.style.fontWeight = "900";
            document.querySelector('.panel').children[document.querySelector('.panel').children.length - 1].appendChild(div);
        }

        if (document.querySelector('[data-test="hint-sentence"]')) {
            question = document.querySelector('[data-test="hint-sentence"]').innerText;
        }

        if (document.querySelector('._13Ae5._1JtWw._1tY-d._66Mfn._2NQKM')) {
            question = document.querySelector('._13Ae5._1JtWw._1tY-d._66Mfn._2NQKM').innerText;
        }

        if (document.querySelector('[data-test="challenge-translate-input"]')) {
            yourAnswer = document.querySelector('[data-test="challenge-translate-input"]').innerHTML;
        }

        if (document.querySelector('[data-test="challenge-text-input"]')) {
            yourAnswer = document.querySelector('[data-test="challenge-text-input"]').value;
        }

        if (document.querySelector('._3ysW7')) {
            yourAnswer = document.querySelector('._3ysW7').innerText.replace(/\n/g, ' ');
        }

        const pictures = document.querySelectorAll('[data-test="challenge-choice-card"]');
        if (pictures) {
            for (let i = 0; i<pictures.length; i++) {
                if (!pictures[i].querySelector('._3IeVF.Nlbt5')) {
                    yourAnswer = pictures[i].innerText.split('\n')[0];
                }
            }
        }

        if (question) {
            const div = emptyDiv.cloneNode();
            div.innerText = question;
            div.style.color = 'black';
            document.querySelector('.panel').children[document.querySelector('.panel').children.length - 1].appendChild(div);
        }

        if (yourAnswer) {
            const div = emptyDiv.cloneNode();
            div.innerText = yourAnswer;
            div.style.color = '#589316';
            document.querySelector('.panel').children[document.querySelector('.panel').children.length - 1].appendChild(div);
        }

        const reviews = document.querySelectorAll('._1obm2 ._36Uyg');
        for (let i = 0; i < reviews.length; i ++) {
            document.querySelector('.panel')
                .children[document.querySelector('.panel').children.length - 1]
                .appendChild(reviews[i].cloneNode(true));
        }

         if (color === 'right') {
            if (document.querySelector('._1obm2 .TnCw3._11xjL')) {
                tempAlert(document.querySelector('._1obm2 .TnCw3._11xjL'));
            } else {
                tempAlert(document.querySelector('h2'));
            }
        }


        setTimeout(()=>{
            if (document.querySelector('.show')) {
                document.querySelector('.panel').style.left = -document.querySelector('.panel')
                    .getBoundingClientRect().width + 20 +'px';
            }
        },20);

        resolve();
    });
    return promise;

}

const css = [".switch {",
           "    position: relative;",
           "    display: inline-block;",
           "    width: 60px;",
           "    height: 34px;",
           "}",
           "",
           ".switch input { ",
           "    opacity: 0;",
           "    width: 0;",
           "    height: 0;",
           "}",
           "",
           ".slider {",
           "    position: absolute;",
           "    cursor: pointer;",
           "    top: 0;",
           "    left: 0;",
           "    right: 0;",
           "    bottom: 0;",
           "    background-color: #ccc;",
           "    -webkit-transition: .4s;",
           "    transition: .4s;",
           "}",
           "",
           ".slider:before {",
           "    position: absolute;",
           "    content: '';",
           "    height: 26px;",
           "    width: 26px;",
           "    left: 4px;",
           "    bottom: 4px;",
           "    background-color: white;",
           "    -webkit-transition: .4s;",
           "    transition: .4s;",
           "}",
           "",
           "input:checked + .slider {",
           "    background-color: #2196F3;",
           "}",
           "",
           "input:focus + .slider {",
           "    box-shadow: 0 0 1px #2196F3;",
           "}",
           "",
           "input:checked + .slider:before {",
           "    -webkit-transform: translateX(26px);",
           "    -ms-transform: translateX(26px);",
           "    transform: translateX(26px);",
           "}",
           "",
           ".slider.round {",
           "    border-radius: 34px;",
           "}",
           "",
           ".slider.round:before {",
           "    border-radius: 50%;",
           "}",
           ".panel::-webkit-scrollbar {",
           "	width:0 !important",
           "}",
           "",
           "._3B1cY:after, ._3B1cY:before {",
           "	display:none",
           "}",
           "",
           "textarea, input {",
           "	-moz-user-select: text;",
           "	direction: ltr;",
           "}",
           ".lnZE0 {",
           "    height: unset;",
           "}",
           "._1ttrU.Au17D._2CBTu {",
           "    margin-top: 0;",
           "}",
           "._1Y5M_ {",
           "    flex-grow: unset;",
           "}",
           ".panel {",
           "    line-height: 1.15;",
           "}",
           ".rotmp {",
           "    grid-row-gap: unset;",
           "}",
           ".panelItem {",
           "    box-sizing: border-box;",
           "    padding: 10px;",
           "    width: fit-content;",
           "    height: fit-content;",
           "    border-radius: 10px;",
           "    margin: 10px;",
           "}",
           ".panelItem.right {",
           "    background: #b8f28b;",
           "    color: #58a700;",
           "}",
           ".panelItem.wrong {",
           "    background: #ffc1c1;",
           "    color: #ea2b2b;",
           "}",
           "#counter {",
           "    position: relative;",
           "    right: 1%;",
           "    top: 1%;",
           "    padding-left: 3%;",
           "    font-size: 2rem;",
           "    margin-left: 20px;",
           "}",
           "#tempAlert {",
           "    padding: 0.2rem;",
           "    top:1.5rem;",
           "    left:50%;transform:translateX(-50%);",
           "    max-width:94%;",
           "    width:fit-content;",
           "    overflow:visible;",
           "    position:absolute;",
           "    color:#58a700;",
           "    background:#b8f28b;",
           "    z-index:900",
           "}",
           ".panel {",
           "    width: fit-content;",
           "    max-width: 95vw;",
           "    float: left;",
           "    height: fit-content;",
           "    position: absolute;",
           "    top: 8%;",
           "    overflow-y: scroll;",
           "    max-height: 92%;",
           "    z-index: 1000;",
           "    scrollbar-width: none;",
           "}",
           "@media (min-width: 700px) {",
           "    ._30i_q, ._1yghA {",
           "        display: block;",
           "    }",
           "}",
           "@media only screen and (orientation: portrait) {",
           "    @media (min-width: 700px) {",
           "        #tempAlert {",
           "            font-size: 2.5rem;",
           "            line-height: 1;",
           "        }",
           "        .panel * {",
           "            font-size: 2.5rem !important;",
           "        }",
           "    }",
           "}"
          ].join("\n");

function addThemes() {
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        const node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        const heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            document.documentElement.appendChild(node);
        }
    }

    const newCSS = GM_getResourceText("customCSS");

    style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(newCSS));
    head = document.getElementsByTagName("head");
    style.id = 'darkDUOmobile';
}

function createThemeSwitcherButton() {
    label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');

    label.append(input, span);
    label.setAttribute('class','switch');
    label.style.zIndex = '100';
    label.style.top = '0.8em';
    label.style.marginLeft = '9px';
    input.setAttribute('type','checkbox');
    input.id = 'checkbx';
    span.setAttribute('class','slider round');

    input.addEventListener('click', function(e){
        if (!document.querySelector('#checkbx').checked) {
            if (document.querySelector('#darkDUOmobile')) {
                document.querySelector('#darkDUOmobile').remove();
            }
            localStorage.setItem('themed', '0');
        } else {
            head[0].appendChild(style);
            localStorage.setItem('themed', '1');

        }
    });
}

function appendThemeSwitcher() {
    if (document.querySelector('._3F_8q')) {
        if (window.innerWidth < 700) {
            document.querySelector('._3F_8q').parentNode.parentNode.append(label);
            label.style.top = '4em';
        }
        else {
            document.querySelector('._3F_8q').append(label);
        }
        if (localStorage.getItem('themed') == '1') {
            document.querySelector('#checkbx').checked = true;
        }
    }
    else if (document.querySelector('._31whh')) {
        document.querySelector('._31whh').append(label);

        if (localStorage.getItem('themed') == '1') {
            document.querySelector('#checkbx').checked = true;
        }
    }

}

addThemes();

function mayISwipe(event) {
    if (event && document.querySelector('._3vVWl') &&
        document.querySelector('._3vVWl').contains(event.target)) {
        return false;
    } else {
        return true
    }
}

function hideShowKey() {
    if (window.innerWidth>700 && window.innerWidth>window.innerHeight) {
        document.querySelectorAll('._3uWfo button span').forEach(el => el.style.display = 'block');
    } else {
        document.querySelectorAll('._3uWfo button span').forEach(el => el.style.display = 'none');
    }

}

(function() {
    'use strict';

    if (document.querySelector(father)) {
        document.querySelector(father).swiper("swipeLeft", swipeFunc);
        document.querySelector(father).swiper("swipeRight", showHidePanel);
    } else if(document.querySelector('.story-page')) {
        document.querySelector('.story-page').swiper('swipeLeft', ()=>{
            document.querySelector('button.continue').click();
        });
    }

    createThemeSwitcherButton();
    setTimeout(() => appendThemeSwitcher(), 2000);

    if (localStorage.getItem('themed') == "1") {
        head[0].appendChild(style);
        if (document.querySelector('#checkbx')) {
            document.querySelector('#checkbx').checked = true;
        }
    }

    const counterBool = true;

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {

            if (mutation.addedNodes.length && mutation.addedNodes[0].className) {
                if (document.querySelector('.blame-wrap.grade-correct-footer')) {
                    document.querySelector('button.continue').click();
                }

                if (mutation.addedNodes[0].contains(document.querySelector('._1bfyi'))) {
                    document.querySelector('._1bfyi').swiper('swipeLeft', () => {
                        document.querySelector('._1fURZ, ._3JkvC').click()});
                }

                // takes care of skipping
                if (mutation.addedNodes[0].contains(document.querySelector('[data-test="player-skip"]'))) {
                    setTimeout(()=>{
                        if (document.querySelector('._1uJnx') || document.querySelector('[data-test="challenge-speak-button"]')) {
                            document.querySelector('[data-test="player-skip"]').addEventListener('click', function() {
                                counterBool = false;
                            });
                        }
                    },200);
                }


                if (mutation.addedNodes[0].contains(document.querySelector('._3F_8q')) ||
                    mutation.addedNodes[0].contains(document.querySelector('._31whh'))) {
                    appendThemeSwitcher()
                }



                if (mutation.addedNodes[0].className == "_37FmC _2nhHI _3ZTEO") {
                    moveHintDiv(mutation.target.firstElementChild);
                    mutation.target.style.background = 'purple';
                    mutation.target.style.color = 'white';
                }

                if (mutation.addedNodes[0].className == '_1Ag8k _1p08S _1WH_r') {
                    neco('right').then(()=>{
                        autoClick();
                        if (counterBool) {
                            changeCounter('right');
                        } else {
                            counterBool = true;
                        }
                    });
                } else if (mutation.addedNodes[0].className === '') {

                }
                else if (mutation.addedNodes[0].className == '_1Ag8k _1p08S _1S5ta') {
                    neco('wrong').then(()=> {
                        if (counterBool) {
                            changeCounter('bad');
                        } else {
                            counterBool = true;
                        }
                    });
                }
                else if (mutation.addedNodes[0].contains(document.querySelector('._3ysW7'))) {
                    draggable();
                    keyboardShortcuts();
                }

                if (mutation.addedNodes[0].contains(document.querySelector('textarea')) ||
                    mutation.addedNodes[0].contains(document.querySelector('input'))) {
                    setTimeout(()=>{document.querySelector('textarea, input').focus()},200);
                }

                if (mutation.addedNodes[0].contains(document.querySelector(father))) {
                    document.querySelector(father).swiper("swipeLeft", swipeFunc);
                    document.querySelector(father).swiper("swipeRight", showHidePanel);
                }

                if (mutation.addedNodes[0].className === 'story-page') {
                    document.querySelector('.story-page').swiper("swipeLeft", () => {
                        if (document.querySelector('button.continue')) {
                            document.querySelector('button.continue').click();
                        }
                    });
                }

                if (mutation.addedNodes[0].classList.value == '_3-qon' &&
                   mutation.addedNodes[0].contains(document.querySelector('._2q0iC'))) {
                    createNumber();
                    createSlider();
                }
            }

            if (mutation.removedNodes.length) {
                if (mutation.removedNodes[0].className === "_2NEKS") {
                    if (!document.querySelector('[data-test="challenge challenge-listenTap"]')) {
                        document.onkeyup = function (e) {
                            return false;
                        }
                        window.removeEventListener("resize", hideShowKey);
                    }
                }
                if (mutation.removedNodes[0].className == "_37FmC _2nhHI _3ZTEO") {
                    mutation.target.style.background = '';
                    mutation.target.style.color = '';
                }
            }
        }
    }

    const targetNode = document.querySelector('body');
    const config = { attributes: true, childList: true, subtree: true, characterData: true };
    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

})();