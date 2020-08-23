// ==UserScript==
// @name         Duolingo Improver
// @version      2.9.4.4
// @description  For description visit https://github.com/xeyqe/myDUO/blob/master/README.md
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @author       xeyqe
// @license      MIT
// @include      http://duolingo.com/*
// @include      https://duolingo.com/*
// @include      http://*.duolingo.com/*
// @include      https://*.duolingo.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.10.2/Sortable.min.js
// @resource     customCSS https://raw.githubusercontent.com/xeyqe/dark-background-light-text-extension/master/methods/invert.css
// @grant        GM_getResourceText
// ==/UserScript==

let style;
let head;
let myArray = [];
let el;
let label;

const progressBar = "_1TkZD";
const hint = "XUDC1 _2nhHI _3ZTEO";
const coloredHint = "_1c_ny _1gjlS";
const father = '._3x0ok';

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
             "    font-size: 2rem;",
             "    grid-column-end: end;",
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
             "#my-autoclick-bu {",
             "    z-index: 100000;",
             "    position: fixed;",
             "    left: 50%;",
             "    top: 0rem;",
             "    transform: translateX(-50%);",
             "}",
             "[data-test=challenge-tap-token] {",
             "    text-align: center;",
             "}",
             "._2LMXW:after {",
             "    height: 0;",
             "}",
             ".panel.hide {",
             "    transform: translateX(calc(-100% + 1.2rem));",
             "    transition: .5s ease-in-out;",
             "}",
             ".panel.show {",
             "    transform: translateX(0%);",
             "    transition: .5s ease-in-out;",
             "}",
             "@media (min-width: 700px) {",
             "    ._30i_q, ._1yghA {",
             "        display: block;",
             "    }"//,
//              "}",
//              "@media only screen and (orientation: portrait) {",
//              "    @media (min-width: 700px) {",
//              "        #tempAlert {",
//              "            font-size: 2.5rem;",
//              "            line-height: 1;",
//              "        }",
//              "        .panel * {",
//              "            font-size: 2.5rem !important;",
//              "        }",
//              "    }",
//              "}"
            ].join("\n");

function addThemes() {
    if (!document.querySelector('#darkDUOmobile')) {
        const node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        const heads = document.getElementsByTagName("html");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            document.documentElement.appendChild(node);
        }

        const newCSS = GM_getResourceText("customCSS");

        style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(newCSS));
        head = document.getElementsByTagName("html");
        style.id = 'darkDUOmobile';
    }
}

Node.prototype.swiper = function(direction, func) {
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

        if (direction === "swipeRight") {
            if (touchstartX - touchendX < -25 &&
                absY < absX) {
                func(event);
            }
        }
        else if (direction === "swipeLeft") {
            if (touchstartX - touchendX > 25 &&
                absY < absX) {
                func(event);
            }
        }
        else if (direction === "swipeUp") {
            if (touchstartY - touchendY < -25 &&
                absY > absX) {
                func(event);
            }
        }
        else if (direction === "swipeDown") {
            if (touchstartY - touchendY > 25 &&
                absY > absX) {
                func(event);
            }
        }
    });
}

function swipeFunc(event) {
    if (mayISwipe(event)) {
        if (!document.querySelector('.show')) {
            if (document.querySelector('[data-test="player-next"]')) {
                document.querySelector('[data-test="player-next"]').click();
            }
        }
        else if (!document.querySelector('.hide')) {
            showHidePanel();
        }
    }
}

function createNumber() {
    let node = document.createElement("p");
    node.setAttribute("id", "counter");

    node.innerHTML =
        "<span id=\"wrong\" style=\"color:red\">0</span>/<span id=\"right\" style=\"color:#79c822\">0</span>";

    if (document.querySelector('._2nDUm')) {
        document.querySelector('._2nDUm').appendChild(node);
    } else {
        console.log('HELP. place for counter is missing!');
    }
}

function changeCounter(whichOne) {
    const first = parseInt(document.querySelector('#right').innerText);
    const second = parseInt(document.querySelector('#wrong').innerText);

    if (whichOne === 'right') {
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

    for (const a of input.querySelectorAll('a')) {
        a.remove();
    }

    el.appendChild(input.cloneNode(true));

    removeTempAlert(3000);

    el.addEventListener("mouseenter", () => {
        if (document.querySelector('#tempAlert').style.border === "") {
            clearTimeout(timeout);
            timeout = null;
        }
    });

    el.addEventListener("mouseleave", () => {
        if (document.querySelector('#tempAlert').style.border === "") {
            removeTempAlert(3000);
        }
    });

    el.addEventListener("click", ()=>{
        if (document.querySelector('#tempAlert').style.border === "") {
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
    if (testingAuto) {
        if (document.querySelector('[data-test="player-next"]')) {
            document.querySelector('[data-test="player-next"]').click();
        }

    }
}

function reclick() {
    let clickedBtt = document.querySelectorAll('._1uasP button');
    let unclickedBtt = Array.from(document.querySelectorAll('[data-test="word-bank"] button:disabled'));

    for (let i = 0; i < clickedBtt.length; i++) {
        clickedBtt[i].click();

        for (const bu of unclickedBtt) {
            if (!bu.disabled) {
                bu.click();
                continue;
            }
        }
    }

}

function draggable() {
    const output = document.querySelector('.PcKtj');

    Sortable.create(output, {
        onEnd: function (evt){ reclick() },
        animation: 150
    });
}

function keyboardShortcuts() {
    const list = document.querySelectorAll('[data-test="challenge-tap-token"]');

    const listOfCode = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU",
                        "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF",
                        "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX",
                        "KeyC", "KeyV", "KeyB", "KeyN", "KeyM"];

    document.onkeyup = function(e) {
        if (listOfCode.includes(e.code)) {
            let char = e.code[3].toLowerCase();
            list.forEach(el => {
                if (el.innerText.includes('\n') && el.innerText.split('\n')[0] === char) {
                    el.click();
                }
            });
        } else if (e.code === "Backspace") {
            let node = document.querySelectorAll('._1uasP button');

            if (node[node.length - 1]) {
                node[node.length - 1].click();
            }
        }
    }

    window.addEventListener('resize', hideShowKey);
    setTimeout(_ => hideShowKey(), 100);
}

function hideShowKey() {
    const list = document.querySelectorAll('[data-test="word-bank"] button');

    const listOfCode = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU",
                        "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF",
                        "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX",
                        "KeyC", "KeyV", "KeyB", "KeyN", "KeyM"];

    if (window.innerWidth>700 && window.innerWidth>window.innerHeight) {
        for (let i=0; i<list.length; i++) {
            if (!list[i].innerText.includes('\n')) {
                list[i].innerText = listOfCode[i][3].toLowerCase() + '\n' + list[i].innerText;
            }
        }
    } else {
        list.forEach(el => {
            if (el.innerText.includes('\n')) {
                el.innerText = el.innerText.split('\n')[1];
            }
        });
    }
}


function createSlider() {
    const panel = document.createElement("div");

    panel.setAttribute('class','panel hide');

    document.querySelector(father).appendChild(panel);

    document.querySelector(father).addEventListener('mousedown', function(event) {
        const isClickInside = document.querySelector('.panel').contains(event.target) || panel === event.target;

        if (!isClickInside) {
            if (document.querySelector('.show')) {
                showHidePanel();
            }
        } else {
            if (document.querySelector('.hide')) {
                showHidePanel();
            }
        }
    });
}

function showHidePanel(event){
    if (mayISwipe(event)) {
        const panel = document.querySelector('.panel');
        if (panel.classList.contains('show')) {
            panel.classList.remove('show');
            panel.classList.add('hide');
        } else {
            panel.classList.add('show');
            panel.classList.remove('hide');
        }
    }
}


function neco(color) {
    const promise = new Promise((resolve)=>{
        let question;
        let yourAnswer;
        let header;

        const divMain = document.createElement("div");
        divMain.classList.add("panelItem");
        divMain.classList.add(color);

        if (color === 'wrong') {
            const firstNode = document.querySelector('.panel').firstChild;
            document.querySelector('.panel').insertBefore(divMain, firstNode);
        } else {
            document.querySelector('.panel').appendChild(divMain);
        }


        let emptyDiv = document.createElement("div");
        if (document.querySelector('[data-test="challenge-header"]')) {
            header = document.querySelector('[data-test="challenge-header"]').innerText;
        }

        if (header) {
            const div = emptyDiv.cloneNode();
            div.innerText = header;
            div.style.fontWeight = "900";
            divMain.appendChild(div);
        }

        if (document.querySelector('[data-test="hint-sentence"]')) {
            question = document.querySelector('[data-test="hint-sentence"]').innerText;
        }

        if (document.querySelector('._13Ae5._1JtWw._1tY-d._66Mfn._2NQKM')) {
            question = document.querySelector('._13Ae5._1JtWw._1tY-d._66Mfn._2NQKM').innerText;
        }

        if (document.querySelector('[data-test="challenge-translate-prompt"]')) {
            question = document.querySelector('[data-test="challenge-translate-prompt"]').textContent;
        }

        if (document.querySelector('[data-test="challenge challenge-judge"]')) {
            if (document.querySelector('._3-JBe')) {
                question = document.querySelector('._3-JBe').textContent;
            }
            if (document.querySelector('[data-test="challenge-choice"]._1HjFK [data-test="challenge-judge-text"]')) {
                yourAnswer = document.querySelector('[data-test="challenge-choice"]._1HjFK [data-test="challenge-judge-text"]').textContent;
            }
        }

        if (document.querySelector('[data-test="challenge challenge-form"]')) {
            question = document.querySelector('[data-test="challenge-form-prompt"]').getAttribute('data-prompt');
            yourAnswer = document.querySelector('[data-test="challenge-choice"]._1HjFK [data-test="challenge-judge-text"]').textContent;
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

        // draggable
        const buttons = document.querySelectorAll('._1uasP button');
        if (buttons && buttons.length) {
            yourAnswer = '';
            for (const bu of buttons) {
                yourAnswer = yourAnswer + ' ' + bu.textContent;
            }
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
            divMain.appendChild(div);
        }

        if (yourAnswer) {
            const div = emptyDiv.cloneNode();
            div.innerText = yourAnswer;
            div.style.color = '#589316';
            divMain.appendChild(div);
        }

        const review = document.querySelector('[data-test="blame blame-incorrect"]').cloneNode(true);
        if (review && color === 'wrong') {
            const ass = review.querySelectorAll('a');
            for (const a of ass) {
                a.remove();
            }

            divMain.appendChild(review.lastElementChild.cloneNode(true));
        }

        if (color === 'right') {
            if (document.querySelector('[data-test="blame blame-correct"]')) {
                tempAlert(document.querySelector('[data-test="blame blame-correct"]').children[1]);
                if (document.querySelector('[data-test="challenge challenge-listen"]') ||
                    document.querySelector('[data-test="challenge challenge-listenTap"]') ||
                    document.querySelectorAll('[data-test="challenge challenge-speak"]')) {
                    divMain.appendChild(document.querySelector('[data-test="blame blame-correct"]').children[1].cloneNode(true));
                }
            }
        }


        const panel = document.querySelector('.panel.show');
        setTimeout(()=>{
            if (panel) {
                panel.classList.remove('show');
                panel.classList.add('hide');
            }
        },20);

        resolve();
    });
    return promise;

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
    if (document.querySelector('._3TwVI')) {
        document.querySelector('._3TwVI').append(label);
        if (localStorage.getItem('themed') === '1' && document.querySelector('#checkbx')) {
            document.querySelector('#checkbx').checked = true;
        }
    } else {
        console.log('unable to append theme switcher');
    }
}

function mayISwipe(event) {
    if (event && document.querySelector('._2PLYW') &&
        document.querySelector('._2PLYW').contains(event.target)) {
        return false;
    } else {
        return true
    }
}

let storyContinueButtonTimeout;
let storiesHiddenLength;
function storiesAutoClick() {
    let delay;

    if (!storiesHiddenLength) {

        const array = document.querySelectorAll('._3sNGF._3j32v:not(._2n3Ta)');
        const selected = array[array.length - 1];
        if (selected) {
            let myLength;
            const phrases = selected.querySelectorAll('.phrase');
            const regex = /^\W+$/;
            if (phrases[phrases.length - 1] &&
                phrases[phrases.length - 1].textContent &&
                phrases[phrases.length - 1].textContent.length > 1 &&
                !regex.test(phrases[phrases.length - 1].textContent)) {
                myLength = phrases[phrases.length - 1].textContent.length;
            } else if (phrases[phrases.length - 2] && phrases[phrases.length - 2].textContent && phrases[phrases.length - 2].textContent.length > 1) {
                myLength = phrases[phrases.length - 2].textContent.length;
            } else if (document.querySelector('button[autofocus]')) {
                document.querySelector('button[autofocus]').click();
                return;
            }
            delay = myLength < 5 ? (myLength*100) + 300 : myLength*100;
            if (selected.querySelector('._2ufQI')) {
                delay += selected.querySelector('._2ufQI').textContent.length * 100;
            }
        }

    } else {
        delay = storiesHiddenLength < 5 ? (storiesHiddenLength*100) + 300 : storiesHiddenLength*100;
    }
    storyContinueButtonTimeout = setTimeout(() => {
        if (document.querySelector('button[autofocus]')) {
            document.querySelector('button[autofocus]').click();
        }
        if (storiesHiddenLength) {
            storiesHiddenLength = null;
        }
    }, delay);
}

let storiesAuto = localStorage.getItem('stories_autoclick') && localStorage.getItem('stories_autoclick') === 'yes';
let testingAuto = localStorage.getItem('autoclick') && localStorage.getItem('autoclick') === 'yes';
function createAutoClickButton(isStories) {
    const bu = document.createElement('BUTTON');
    bu.id = 'my-autoclick-bu';
    bu.style.zIndex = isStories ? 10000 : 10;

    if (isStories) {
        bu.innerText = storiesAuto ? 'A' : 'M';
        bu.addEventListener('click', () => {
            storiesAuto = !storiesAuto;
            document.querySelector('#my-autoclick-bu').innerText = storiesAuto ? 'A' : 'M';
            localStorage.setItem('stories_autoclick', storiesAuto ? 'yes' : 'no');
        });
        document.querySelector('._3gjcv').appendChild(bu);
    } else {
        bu.innerText = testingAuto ? 'A' : 'M';
        bu.addEventListener('click', () => {
            testingAuto = !testingAuto;
            document.querySelector('#my-autoclick-bu').innerText = testingAuto ? 'A' : 'M';
            localStorage.setItem('autoclick', testingAuto ? 'yes' : 'no');
        });
        document.querySelector('.nP82K').appendChild(bu);
    }
}


(function() {
    'use strict';

    var el = document.createElement('DIV');
    el.id = 'mybpwaycfxccmnp-dblt-backdrop-filter'
    document.querySelector('html').insertBefore(el, document.querySelector('body'))

    window.addEventListener('load', function() {
        if (document.querySelector(father)) {
            document.querySelector(father).swiper("swipeLeft", swipeFunc);
            document.querySelector(father).swiper("swipeRight", showHidePanel);
        } else if(document.querySelector('.story-page')) {
            document.querySelector('.story-page').swiper('swipeDown', ()=>{
                document.querySelector('button.continue').click();
            });
        }

        addThemes();
        createThemeSwitcherButton();
        appendThemeSwitcher();

        if (localStorage.getItem('themed') === "1") {
            head[0].appendChild(style);
            if (document.querySelector('#checkbx')) {
                document.querySelector('#checkbx').checked = true;
            }
        }

        let counterBool = true;

        const callback = function(mutationsList, observer) {
            for(let mutation of mutationsList) {


                if (mutation.attributeName === "autofocus" &&
                    !document.querySelector('textarea')) {
                    if (storyContinueButtonTimeout) {
                        clearTimeout(storyContinueButtonTimeout);
                        storyContinueButtonTimeout = null;
                    }
                    if (storiesAuto) {
                        storiesAutoClick();
                    }
                }

                if (mutation.addedNodes[0]) {

                    if (mutation.addedNodes[0].contains(document.querySelector('._3gjcv'))) {
//                         const bu = document.createElement('BUTTON');
//                         bu.innerText = 'A';
//                         bu.id = 'my-autoclick-bu';
//                         bu.style.zIndex = 10000;
//                         bu.addEventListener('click', () => {
//                             storiesAuto = !storiesAuto;
//                             document.querySelector('#my-autoclick-bu').innerText = storiesAuto ? 'A' : 'M';
//                         });
//                         document.querySelector('._3gjcv').appendChild(bu);
                        createAutoClickButton(true);
                    }

                    if (mutation.addedNodes[0].contains(document.querySelector('[data-test="stories-choice"]'))) {
                        const storiesEll = document.querySelectorAll('._3sNGF._3j32v:not(._2n3Ta)');
                        const storiesEl = storiesEll[storiesEll.length - 1];
                        const el = storiesEl.querySelector('._2igzU._1xWrt._2P5W7');
                        if (el) {
                            const phrases = storiesEl.querySelectorAll('.phrase');
                            if (phrases && phrases[phrases.length - 1]) {
                                storiesHiddenLength = phrases[phrases.length - 1].textContent.length
                            }
                        }
                    }

                    if (mutation.addedNodes[0].contains(document.querySelector('[data-test="blame blame-correct"]'))) {
                        neco('right').then(() => {
                            autoClick();
                            if (counterBool) {
                                changeCounter('right');
                            } else {
                                counterBool = true;
                            }
                        });
                    }

                    if (mutation.addedNodes[0].contains(document.querySelector('[data-test="blame blame-incorrect"]'))) {
                        neco('wrong').then(() => {
                            if (counterBool) {
                                changeCounter('bad');
                            } else {
                                counterBool = true;
                            }
                        });
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


                    if (mutation.addedNodes[0].contains(document.querySelector('._3TwVI'))) {
                        appendThemeSwitcher();
                    }

                    else if (mutation.addedNodes[0].contains(document.querySelector('[data-test="challenge challenge-listenTap"]'))) {
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
                        document.querySelector('.story-page').swiper("swipeDown", () => {
                            if (document.querySelector('button.continue')) {
                                document.querySelector('button.continue').click();
                            }
                        });
                    }

                    if (mutation.addedNodes[0].className === '_3FiYg' && document.querySelector('.nP82K')) {
                        createNumber();
                        createSlider();
                        createAutoClickButton(false);
                    }

                }

                if (mutation.removedNodes.length) {
                    if (mutation.removedNodes[0].className === "_2NEKS") {
                        if (!document.querySelector('[data-test="word-bank"]')) {
                            document.onkeyup = function (e) {
                                return false;
                            }
                            window.removeEventListener("resize", hideShowKey);
                        }
                    }
                }
            }
        }

        const targetNode = document.querySelector('body');
        const config = { attributes: true, childList: true, subtree: true, characterData: true };
        const observer = new MutationObserver(callback);

        observer.observe(targetNode, config);

    }, false);

})();