// ==UserScript==
// @name         Duolingo Improver
// @version      2.9.7.0
// @description  For description visit https://github.com/xeyqe/myDUO/blob/master/README.md
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @author       xeyqe
// @license      MIT
// @include      http://duolingo.com/*
// @include      https://duolingo.com/*
// @include      http://*.duolingo.com/*
// @include      https://*.duolingo.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.13.0/Sortable.min.js
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
             "    background-color: #b8f28b;",
             "    color: #58a700;",
             "}",
             ".panelItem.wrong {",
             "    background-color: #ffc1c1;",
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
             ".hidden-item {",
             "    display: none;",
             "}",
             "@media (min-width: 700px) {",
             "    ._30i_q, ._1yghA {",
             "        display: block;",
             "    }",
             "}",
             ".panel * {",
             "    min-width: unset;",
             "}"].join("\n");
const css2 = [ "/* Shamelessly copied from https://github.com/m-khvoinitsky/dark-background-light-text-extension */ ",
              "@supports (backdrop-filter: invert(100%)) {",
              "    #mybpwaycfxccmnp-dblt-backdrop-filter {",
              "        display: block !important;",
              "        position: fixed !important;",
              "        top: 0 !important;",
              "        bottom: 0 !important;",
              "        left: 0 !important;",
              "        right: 0 !important;",
              "        margin: 0 !important;",
              "        pointer-events: none !important;",
              "        z-index: 2147483647 !important;",
              "        backdrop-filter: invert(100%) hue-rotate(180deg) !important;",
              "    }",
              "    img:not(.mwe-math-fallback-image-inline):not([alt=\"inline_formula\"]),",
              "    video,",
              "    ins,    /* duolingo google ads */",
              "    ._3-gOT.LBIqX, /* duolingo flags */",
              "    ._3BevS.PA4Av._3I8oV, /* another duolingo flags */",
              "    ._3BevS._1fpAw, /* duolingo flags my profile*/",
              "    svg {",
              "        filter: invert(100%) hue-rotate(180deg) !important;",
              "    }",
              "}",
              "@supports not (backdrop-filter: invert(100%)) {",
              "    html,",
              "    img:not(.mwe-math-fallback-image-inline):not([alt=\"inline_formula\"])",
              "    embed[type=\"application/x-shockwave-flash\"],",
              "    object[type=\"application/x-shockwave-flash\"],",
              "    video,",
              "    svg,",
              "    ins,",
              "    ._3-gOT.LBIqX,",
              "    ._3BevS.PA4Av._3I8oV,",
              "    ._3BevS._1fpAw,",
              "    div#viewer.pdfViewer div.page",
              "    {",
              "        filter: invert(100%) hue-rotate(180deg) !important;",
              "    }",
              "    /* #28 */",
              "    :fullscreen video,",
              "    video:fullscreen",
              "    {",
              "        filter: none !important;",
              "    }",
              "",
              "    html {",
              "        background-color: black !important;",
              "    }",
              "}",
              "",
              "button,",
              "input,",
              "optgroup,",
              "select,",
              "textarea {",
              "    background-color: white;",
              "    color: black;",
              "}"].join("\n");

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

        style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(css2));
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

    const node = input.cloneNode(true);
    for (const a of node.querySelectorAll('a')) {
        a.remove();
    }

    el.appendChild(node);

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
        } else {
            setTimeout(() => {
                if (document.querySelector('[data-test="player-next"]')) {
                    document.querySelector('[data-test="player-next"]').click();
                }
            }, 100);
        }

    }
}

function reclick() {
    const clickedBtt = document.querySelectorAll('._1uasP button');
    const unclickedBtt = Array.from(document.querySelectorAll('[data-test="word-bank"] button:disabled'));
    const strs = [];
    for (const selectedBu of clickedBtt) {
        strs.push(selectedBu.innerText);
        selectedBu.click();
        setTimeout(() => {
            for (const str of strs) {
                const btn = unclickedBtt.find(bu => {
                    const text = bu.innerText.includes('\n') ? bu.innerText.split('\n')[1] : bu.innerText;
                    return str === text && !bu.disabled;
                })
                btn?.click();
            }
        }, 300)
    }

}

function draggable() {
    const output = document.querySelector('.PcKtj');

    Sortable.create(output, {
        onEnd: function (evt){ reclick() },
        animation: 150,
    });
    const container = document.querySelector('.PcKtj')
    const words = document.querySelectorAll('[data-test="word-bank"] > *');
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
            div.style.color = color === 'right' ? '#279f09': '#e7559e';
            divMain.appendChild(div);
        }

        const review = document.querySelector('.panel')
        .previousElementSibling
        .querySelector('[data-test="blame blame-incorrect"]') ||
              document.querySelector('.panel')
        .previousElementSibling
        .querySelector('[data-test="blame blame-correct"]');
        if (review) {
            const node = review.children[1].children[0].cloneNode(true);
            divMain.appendChild(node);
        }

        if (color === 'right') {
            if (document.querySelector('.panel').previousElementSibling.querySelector('[data-test="blame blame-correct"]')) {
                tempAlert(document.querySelector('.panel').previousElementSibling.querySelector('[data-test="blame blame-correct"]').children[1].firstChild.firstChild);
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

function appendThemeSwitcher(element) {
    element.append(label);
    if (localStorage.getItem('themed') === '1' && document.querySelector('#checkbx')) {
        document.querySelector('#checkbx').checked = true;
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
        const selected = Array.from(array).pop();

        if (selected) {
            let myLength;
            const phrases = selected.querySelectorAll('.phrase');
            const regex = /^\W+$/;
            if (phrases[phrases.length - 1] &&
                phrases[phrases.length - 1].textContent &&
                phrases[phrases.length - 1].textContent.length > 1 &&
                !regex.test(phrases[phrases.length - 1].textContent)) {
                myLength = phrases[phrases.length - 1].textContent.length;
                if (selected.querySelector('._3jGFa') && document.querySelector('._3jGFa').lastChild) {
                    myLength += document.querySelector('._3jGFa').lastChild.textContent.length;
                }
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
    bu.style.cursor = 'pointer';

    if (isStories) {
        bu.innerText = storiesAuto ? 'A' : 'M';
        bu.addEventListener('click', () => {
            storiesAuto = !storiesAuto;
            document.querySelector('#my-autoclick-bu').innerText = storiesAuto ? 'A' : 'M';
            localStorage.setItem('stories_autoclick', storiesAuto ? 'yes' : 'no');
        });
        document.querySelector('._3gjcv').appendChild(bu);
        createStoriesProgressShower();
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

function createStoriesProgressShower() {
    const progressEl = document.createElement('SPAN');
    progressEl.innerText = document.querySelector('[role="progressbar"]').firstChild.style.width;
    progressEl.style.cssText = "z-index: 10; right: 0; position: absolute; top: 0;"
    progressEl.id = 'bugibugi';
    const target = document.querySelector('._2QKoe');
    target.append(progressEl);
}

function hideUnhideComplete(initial) {
    const bu = document.querySelector('#hide-show-bu');
    const minus = bu.innerText === '-';
    if (initial && minus) return;

    if (minus || initial) {
        const containers = Array.from(document.querySelectorAll('._3f9ou'));
        containers.forEach(container => {
            const skills = Array.from(container.querySelectorAll('[data-test="skill"]'));
            const toHide = skills.filter(skill => {
                if (skill.querySelector('._3dqWQ') && !skill.querySelector('._1m7gz')) {
                    return skill;
                }
            });
            toHide.forEach(item => {
                item.classList.add('hidden-item');
            });
            if (!container.querySelectorAll('[data-test="skill"]:not(.hidden-item)').length) {
                container.classList.add('hidden-item');
            }
        });
    } else {
        const hidden = Array.from(document.querySelectorAll('.hidden-item'));
        hidden.forEach(item => {
            item.classList.remove('hidden-item');
        });
    }
    if (!initial) bu.innerText = minus ? '+' : '-';
    localStorage.setItem('hide', bu.innerText);
}

function createHideButton() {
    const bu = document.createElement('BUTTON');
    bu.style.cssText = "background: #ffd900; border-radius: 50%; width: 3rem; height: 3rem; margin: auto; font-size: 2rem;";
    bu.id = 'hide-show-bu';
    let text = localStorage.getItem('hide');
    if (!text) {
        localStorage.setItem('hide', '+');
        text = '-';
    }
    bu.innerText = text;
    bu.addEventListener('click', () => {
        hideUnhideComplete();
    });
    const sibling = document.querySelector('._3f9ou')
    sibling.parentElement.insertBefore(bu, sibling);
    if (text === '+') {
        hideUnhideComplete('initial');
    }
}

let interval;
(function() {
    'use strict';

    var el = document.createElement('DIV');
    el.id = 'mybpwaycfxccmnp-dblt-backdrop-filter'
    document.querySelector('html').insertBefore(el, document.querySelector('body'))

    window.addEventListener('load', function() {
        window.removeEventListener('touchend', removeTouchEndEvent, true);
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
        const el = document.querySelector('._1bdcY');
        if (el) {
            appendThemeSwitcher(el);
        }
        if (document.querySelector('[data-test="skill"]')) {
            createHideButton();
        }

        if (localStorage.getItem('themed') === "1") {
            head[0].appendChild(style);
            if (document.querySelector('#checkbx')) {
                document.querySelector('#checkbx').checked = true;
            }
        }

        let counterBool = true;
        const aaa = (event) => {
            event.stopPropagation;
        }

        function removeTouchEndEvent(e) {
            e.stopPropagation();
        }

        window.addEventListener('touchend', removeTouchEndEvent, true);

        const callback = function(mutationsList, observer) {
            for(let mutation of mutationsList) {

                if (mutation.attributeName === "autofocus" && mutation.target.disabled === false &&
                    (!document.querySelector('textarea') || document.querySelector('textarea').disabled)) {
                    if (storyContinueButtonTimeout) {
                        clearTimeout(storyContinueButtonTimeout);
                        storyContinueButtonTimeout = null;
                    }

                    if (storiesAuto) {
                        storiesAutoClick();
                    }
                }

                if (mutation.target === document.querySelector('[role="progressbar"]') && document.querySelector('#bugibugi')) {
                    document.querySelector('#bugibugi').innerText = document.querySelector('[role="progressbar"]').firstChild.style.width;
                }

                if (mutation.addedNodes[0] && mutation.addedNodes[0].tagName === 'DIV') {
                    if (mutation.addedNodes[0].contains(document.querySelector('[data-test="skill"]'))) {
                        window.addEventListener('touchend', removeTouchEndEvent, true);
                    }

                    if (mutation.addedNodes[0].contains(document.querySelector('._3gjcv'))) {
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

                    setTimeout(() => {
                        if (mutation.addedNodes[0].contains(document.querySelector('[data-test="blame blame-correct"]'))) {
                            neco('right').then(() => {
                                if (counterBool) {
                                    changeCounter('right');
                                } else {
                                    counterBool = true;
                                }
                                autoClick();
                            });
                        } else if (mutation.addedNodes[0].contains(document.querySelector('[data-test="blame blame-incorrect"]'))) {
                            neco('wrong').then(() => {
                                if (counterBool) {
                                    changeCounter('bad');
                                } else {
                                    counterBool = true;
                                }
                            });
                        }
                    }, 1);


                    if (mutation.addedNodes[0].contains(document.querySelector('._1bfyi'))) {
                        window.removeEventListener('touchend', removeTouchEndEvent, true);
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

                    if (mutation.addedNodes[0].querySelector('[data-test="word-bank"]')) {
                        draggable();
                        keyboardShortcuts();
                    }
                    if (mutation.addedNodes[0].querySelector('.eFS_r, ._19SCP, ._1OHEh')) {
                        appendThemeSwitcher(mutation.addedNodes[0].querySelector('.eFS_r, ._19SCP, ._1OHEh'));
                    }

                    if (mutation.addedNodes[0].querySelector('[data-test="skill-tree"]')) {
                        createHideButton();
                    }
                    if (mutation.addedNodes[0].classList.value === "_9O-0s _1888P") {
                        clearTimeout(interval);
                        interval = setTimeout(() => {
                            hideUnhideComplete('initial')
                        }, 250);
                    }

                    if (mutation.addedNodes[0].contains(document.querySelector('textarea')) ||
                        mutation.addedNodes[0].contains(document.querySelector('input'))) {
                        setTimeout(()=>{document.querySelector('textarea, input').focus()},200);
                    }

                    if (mutation.addedNodes[0].contains(document.querySelector(father))) {
                        window.removeEventListener('touchend', removeTouchEndEvent, true);
                        document.querySelector(father).swiper("swipeLeft", swipeFunc);
                        document.querySelector(father).swiper("swipeRight", showHidePanel);
                    }

                    if (mutation.addedNodes[0].className === 'story-page') {
                        window.removeEventListener('touchend', removeTouchEndEvent, true);
                        document.querySelector('.story-page').swiper("swipeDown", () => {
                            if (document.querySelector('button.continue')) {
                                document.querySelector('button.continue').click();
                            }
                        });
                    }

                    if (mutation.addedNodes[0].querySelector('.nP82K')) {
                        createNumber();
                        createSlider();
                        createAutoClickButton(false);
                    }

                    if (mutation.addedNodes[0] === document.querySelector('[data-test=skill-popout]') ||
                        mutation.addedNodes[0].querySelector('[data-test="skill-popout"]')) {
                        const innerWidth = window.innerWidth;
                        setTimeout(() => {
                            const el = document.querySelector('[data-test=skill-popout]').firstElementChild;
                            const elWidth = el.getBoundingClientRect().width;
                            const elX = el.getBoundingClientRect().x;
                            if (elX < 0 || (elX + elWidth) > (innerWidth - 16)) {
                                el.style.transform = null;
                                document.querySelector('._3fuMA').style.left = null;
                            }
                        }, 250);
                    }
                    // I don't want to use the latest features with the Duolingo app!
                    if (mutation.addedNodes[0].querySelector('._3ivLU._2kfEr._1nlVc._2fOC9.UCrz7.t5wFJ')) {
                        document.querySelector('._3ivLU._2kfEr._1nlVc._2fOC9.UCrz7.t5wFJ').click();
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