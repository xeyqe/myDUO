// ==UserScript==
// @name         Duolingo Improver
// @version      3.0.2.9
// @description  For description visit https://github.com/xeyqe/myDUO/blob/master/README.md
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @author       xeyqe
// @license      MIT
// @match        http://duolingo.com/*
// @match        https://duolingo.com/*
// @match        http://*.duolingo.com/*
// @match        https://*.duolingo.com/*
// @grant        GM_getResourceText
// ==/UserScript==

let style;
let head;
let myArray = [];
let el;
let label;

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
    "    display: flex;",
    "    position: absolute;",
    "    cursor: pointer;",
    "    top: 0;",
    "    left: 0;",
    "    right: 0;",
    "    bottom: 0;",
    "    background-color: #ccc;",
    "    -webkit-transition: .4s;",
    "    transition: .4s;",
    "    border: 1px solid white;",
    "}",
    "",
    ".slider > span {",
    "    position: relative;",
    "    height: 29px;",
    "    width: 29px;",
    "    bottom: -2px;",
    "    background-color: white;",
    "    -webkit-transition: .4s;",
    "    transition: .4s;",
    "    border-radius: 50%",
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
    "input:checked + .slider > span {",
    "    margin-left: auto",
    "}",
    "",
    ".slider.round {",
    "    border-radius: 34px;",
    "}",
    "",
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
    "    left:50%;transform:translateX(-50%);",
    "    max-width:94%;",
    "    width:fit-content;",
    "    overflow:visible;",
    "    position:absolute;",
    "    color:#58a700;",
    "    background:#b8f28b;",
    "    z-index:900",
    "}",
    "#tempAlert h2 {",
    "    white-space: nowrap;",
    "}",
    ".panel {",
    "    width: fit-content;",
    "    float: left;",
    "    max-width: 95vw;",
    "    height: fit-content;",
    "    position: absolute;",
    "    top: 8%;",
    "    overflow-y: scroll;",
    "    max-height: 92%;",
    "    z-index: 1000;",
    "    scrollbar-width: none;",
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
    "@media (max-width: 700px) {",
    "    .uH5m4 {",
    "        min-height: fit-content;",
    "    }",
    "    .panel.show.shorter {",
    "        max-height: 72vh;",
    "    }",
    "    .hidden-footer {",
    "        display: none;",
    "    }",
    "    .mQ0GW {",
    "        grid-gap: 0px;",
    "        min-height: unset;",
    "    }",
    "    .Yf5zL {",
    "        padding-bottom: 0px;",
    "        padding-top: 0px;",
    "    }",
    "    #counter {",
    "        top: 0.5rem;",
    "        position: relative;",
    "    }",
    "}",
    "#my-autoclick-bu {",
    "    width: 2rem;",
    "}",
    "button._2mDNn > i {",
    "    opacity: 0;",
    "}",
    ".panel * {",
    "    min-width: unset;",
    "}",
    "._6lk-i {",
    "    padding: 32px 12px 0px;",
    "}",
    "._3f9ou:not(.hidden-item) {",
    "    padding: 0px;",
    "}",
    "._2QKoe {",
    "    position: fixed;",
    "    width: 100%;",
    "    transform: translateX(-50%);",
    "    left: 50%;",
    "}",
    "._3gjcv {",
    "    padding-top: 103px !important;",
    "}",
    "._2plWZ {",
    "    grid-gap: 0px;",
    "}",
    "._2nDUm {",
    "    display: flex;",
    "    grid-gap: 6px;",
    "}",
    "div[role=progressbar] {",
    "    width: 100%;",
    "}",
    "._2kfEr {",
    "    flex-shrink: 0;",
    "}",
    "._3XZrb, ._22kW9 {",
    "    display: none;",
    "}",
    "._1Oz7v {",
    "    position: relative;",
    // "}",
    // "section {",
    // "    position: relative !important;",
    // "    top: unset;",
    "}"
].join("\n");
const css2 = ["/* Shamelessly copied from https://github.com/m-khvoinitsky/dark-background-light-text-extension */ ",
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
    "        height: 100vh;",
    "    }",
    "    img:not(.mwe-math-fallback-image-inline):not([alt=\"inline_formula\"]),",
    "    video,",
    "    canvas,",
    "    ins,    /* duolingo google ads */",
    "    ._3-gOT.LBIqX, /* duolingo flags */",
    "    ._3BevS.PA4Av._3I8oV, /* another duolingo flags */",
    "    ._3BevS._1fpAw, /* duolingo flags my profile*/",
    "    ._1Ykml, /* challenge-select img */",
    "    svg {",
    "        filter: invert(100%) hue-rotate(180deg) !important;",
    "    }",
    "    @media only screen and (max-width: 37.5em) {",
    "        ._1bdcY, .switch {",
    "            background-color: inherit;",
    "        }",
    "    }",
    "}",
    "@supports not (backdrop-filter: invert(100%)) {",
    "    html,",
    "    img:not(.mwe-math-fallback-image-inline):not([alt=\"inline_formula\"])",
    "    embed[type=\"application/x-shockwave-flash\"],",
    "    object[type=\"application/x-shockwave-flash\"],",
    "    video,",
    "    svg,",
    "    canvas,",
    "    ins,",
    "    ._3-gOT.LBIqX,",
    "    ._3BevS.PA4Av._3I8oV,",
    "    ._3BevS._1fpAw,",
    "    ._1Ykml,",
    "    svg",
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

Node.prototype.swiper = function (direction, func, forbidden) {
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const gesuredZone = this;

    gesuredZone.addEventListener(
        'touchstart',
        function (event) {
            touchstartX = event.touches[0].pageX;
            touchstartY = event.touches[0].pageY;
        },
        { passive: true }
    );

    gesuredZone.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].pageX;
        touchendY = event.changedTouches[0].pageY;

        const absX = Math.abs(touchstartX - touchendX);
        const absY = Math.abs(touchstartY - touchendY);
        if (forbidden?.length) {
            for (const el of forbidden) {
                if (document.querySelector(el)?.contains(event?.target)) {
                    return;
                }
            }
        }

        if (direction === "swipeRight") {
            if (touchstartX - touchendX < -25 && absX - absY > 70) {
                func(event);
            }
        } else if (direction === "swipeLeft") {
            if (touchstartX - touchendX > 25 && absX - absY > 70) {
                func(event);
            }
        } else if (direction === "swipeDown") {
            if (touchstartY - touchendY < -25 && absY - absX > 70) {
                func(event);
            }
        } else if (direction === "swipeUp") {
            if (touchstartY - touchendY > 25 && absY - absX > 70) {
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
        console.error('HELP. place for counter is missing!');
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
    setTimeout(() => {
        const tmpAl = document.querySelector('#tempAlert');
        if (tmpAl.offsetHeight > 80) {
            tmpAl.style.width = '94%';
        }
    });

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

    el.addEventListener("click", () => {
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
    timeout = setTimeout(function () {
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

async function reclick(index) {
    const clickedBtt = Array.from(document.querySelectorAll('._1uasP button')).slice(index);
    let unclickedBtt = Array.from(document.querySelectorAll('[data-test="word-bank"] button[aria-disabled]'));
    const clickedStrs = clickedBtt.map(bt => bt.innerText);
    clickedBtt.forEach(bt => bt.click());
    await new Promise(resolve => setTimeout(resolve, 250));

    unclickedBtt = unclickedBtt.filter(bt => !bt.hasAttribute('aria-disabled'));
    const unclickedStrs = unclickedBtt.map(bt => bt.innerText);

    clickedStrs.forEach(clStr => {
        const indx = unclickedStrs.indexOf(clStr);
        unclickedBtt[indx].click();
        unclickedStrs[indx] = null;
    });

}

function draggable() {
    const output = document.querySelector('.PcKtj');

    Sortable.create(output, {
        onEnd: function (evt) {
            if (evt.oldIndex !== evt.newIndex) reclick(evt.newIndex);
            else evt.item.querySelector('button').click();
        },
        animation: 150,

    });
}

function createSlider() {
    const panel = document.createElement("div");

    panel.setAttribute('class', 'panel hide');

    document.querySelector(father).appendChild(panel);

    document.querySelector(father).addEventListener('mousedown', function (event) {
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

function showHidePanel(event) {
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
    const promise = new Promise((resolve) => {
        let question;
        let question2;
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

        if (document.querySelector('[data-test="challenge challenge-translate"]')) {
            if (document.querySelector('[data-test="challenge-translate-input"]')) {
                yourAnswer = document.querySelector('[data-test="challenge-translate-input"]').textContent;
                question = document.querySelector('[data-test="hint-token"]').parentElement.textContent;
            } else if (document.querySelector('[data-test="word-bank"]')) {
                question = document.querySelector('[data-test="hint-token"]').parentElement.textContent;
                yourAnswer = document.querySelector('.PcKtj').innerText.replace(/\n/g, ' ')
            }
        } else if (document.querySelector('[data-test="challenge challenge-listen"]')) {
            yourAnswer = document.querySelector('[data-test="challenge-translate-input"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-listenTap"]')) {
            yourAnswer = document.querySelector('.PcKtj').innerText.replace(/\n/g, ' ')
        } else if (document.querySelector('[data-test="challenge challenge-match"]')) {
            const ar = Array.from(document.querySelectorAll('[data-test="challenge-tap-token-text"]')).map(it => it.textContent);
            question = ar.slice(0, 5).join(' | ');
            yourAnswer = ar.slice(5).join(' | ');
        } else if (document.querySelector('[data-test="challenge challenge-speak"]')) {
            question = document.querySelector('[data-test="hint-token"]').parentElement.textContent;
        } else if (document.querySelector('[data-test="challenge challenge-judge"]')) {
            question = document.querySelector('._3-JBe').textContent;
            yourAnswer = document.querySelector('[data-test="challenge-choice"].disCS > div').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-completeReverseTranslation"]')) {
            question = document.querySelector('._1KUxv._11rtD').textContent;
            question2 = document.querySelector('[data-test="challenge-text-input"]').parentElement.parentElement.textContent;
            yourAnswer = document.querySelector('[data-test="challenge-text-input"]').value;
        } else if (document.querySelector('[data-test="challenge challenge-selectTranscription"]')) {
            yourAnswer = document.querySelector('[data-test="challenge-choice"].disCS > div').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-name"]')) {
            yourAnswer = document.querySelector('[aria-checked="true"][data-test="challenge-choice"] [data-test="challenge-judge-text"]').textContent;
            yourAnswer = document.querySelector('[data-test="challenge-choice"].disCS > div').textContent;
            yourAnswer = yourAnswer + ' ' + document.querySelector('[data-test="challenge-text-input"]').value;
        } else if (document.querySelector('[data-test="challenge challenge-assist"]')) {
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"] [data-test="challenge-judge-text"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-listenComplete"]')) {
            question = document.querySelector('._3t3oQ._2FKqf._2ti2i').textContent;
            yourAnswer = document.querySelector('[data-test="challenge-text-input"]').value;
        } else if (document.querySelector('[data-test="challenge challenge-listenMatch"]')) {
            yourAnswer = Array.from(document.querySelectorAll('[data-test="challenge-tap-token-text"]')).map(it => it.textContent).join(', ')
        } else if (document.querySelector('[data-test="challenge challenge-listenIsolation"]')) {
            question = '';
            const els = Array.from(document.querySelector('[data-test=hint-token]').parentElement.children);
            els.forEach(el => {
                if (el.classList.contains('_1aMpd')) {
                    question += `_${el.textContent}_`;
                } else {
                    question += el.textContent;
                }
            });
        } else if (document.querySelector('[data-test="challenge challenge-select"]')) {
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"] .HaQTI')?.textContent;
        } else if (document.querySelector('[data-test="challenge challenge-definition"]')) {
            yourAnswer = document.querySelector('[aria-checked="true"] [data-test="challenge-judge-text"]').textContent;
            question = document.querySelector('[role="radiogroup"]').previousElementSibling.textContent;
        } else if (document.querySelector('[data-test="challenge challenge-tapComplete"]')) {
            const els = Array.from(document.querySelector('[data-test="hint-token"]').parentElement.parentElement.children);
            question = '';
            els.forEach(el => {
                if (el.tagName === 'DIV') {
                    question += `_${el.innerText}_`;
                } else {
                    question += el.textContent;
                }
            });
        } else if (document.querySelector('[data-test="challenge challenge-dialogue"]')) {
            footerHidden = localStorage.getItem('footerHidden') === "true"
            if (footerHidden) hideShowFooter(true);
            question = Array.from(document.querySelectorAll('[data-test="hint-token"]')).map(it => it.textContent).join('');
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"]').querySelector('[data-test="challenge-judge-text"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-gapFill"]')) {
            question = Array.from(document.querySelectorAll('[data-test="hint-token"]')).map(bt => bt.textContent).join('');
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"]').querySelector('[data-test="challenge-judge-text"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-partialReverseTranslate"]')) {
            question = document.querySelector('[data-test="hint-token"]').parentElement.textContent;
            yourAnswer = Array.from(document.querySelector('label').children).filter(it => !it.classList.contains('_31xxw')).map(it => it.textContent).join('');
        } else if (document.querySelector('[data-test="challenge challenge-readComprehension"]')) {
            footerHidden = localStorage.getItem('footerHidden') === "true"
            if (footerHidden) hideShowFooter(true);
            question = document.querySelector('[data-test="hint-token"]').parentElement.parentElement.textContent;
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"]').querySelector('[data-test="challenge-judge-text"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-name"]')) {
            question = document.querySelector('[data-test="challenge-header"]').textContent;
            yourAnswer = document.querySelector('[data-test="challenge-text-input"]').value;
        } else if (document.querySelector('[data-test="challenge challenge-listenComprehension"]')) {
            question = document.querySelector('[data-test="hint-token"]').parentElement.textContent;
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"] [data-test="challenge-judge-text"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-listenSpeak"]')) {
            question = Array.from(document.querySelectorAll('[data-test="hint-token"]')).map(it => it.parentElement.textContent).join(' ') + '.';
        } else {
            const challenge = document.querySelector('[data-test*="challenge"]').getAttribute('data-test');
            question = `This ${challenge} was not covered by myDuo script. :(`;
        }

        if (question) {
            const div = emptyDiv.cloneNode();
            div.innerText = question;
            div.style.color = 'black';
            divMain.appendChild(div);
        }

        if (question2) {
            const div = emptyDiv.cloneNode();
            div.innerText = question2;
            div.style.color = 'black';
            divMain.appendChild(div);
        }

        if (yourAnswer) {
            const div = emptyDiv.cloneNode();
            div.innerText = yourAnswer;
            div.style.color = color === 'right' ? '#279f09' : '#e7559e';
            divMain.appendChild(div);
        }

        const review = document.querySelector('.panel').previousElementSibling.querySelector('[data-test="blame blame-incorrect"]') ||
            document.querySelector('.panel').previousElementSibling.querySelector('[data-test="blame blame-correct"]');
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
        setTimeout(() => {
            if (panel) {
                panel.classList.remove('show');
                panel.classList.add('hide');
            }
        }, 20);

        resolve();
    });
    return promise;

}

function saveDarkModeStyle(val) {
    const oldVal = localStorage.getItem('duo.darkMode');
    const newVal = oldVal.replace(/:"[a-z]+"/, `:"${val}"`);
    localStorage.setItem('duo.darkMode', newVal);
}

function toggleTheme() {
    if (localStorage.getItem('duo.darkMode').endsWith(':"custom"}')) {
        document.querySelector('html').setAttribute("data-duo-theme", "light");
        document.getElementsByTagName("html")[0].appendChild(style);
    } else {
        document.querySelector('#darkDUOmobile')?.remove();
    }
}

function mayISwipe(event) {
    if (event && document.querySelector('._2PLYW') &&
        document.querySelector('._2PLYW').contains(event.target)) {
        return false;
    } else {
        return true;
    }
}

function createAutoClickButton(isStories) {
    let storiesAuto = localStorage.getItem('stories_autoclick') === 'yes';
    let testingAuto = localStorage.getItem('autoclick') === 'yes';
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
        document.querySelector('._2QKoe').appendChild(bu);
        document.querySelector('.xzblA').prepend(document.querySelector('._2QKoe'))
    } else {
        bu.innerText = testingAuto ? 'A' : 'M';
        bu.addEventListener('click', () => {
            testingAuto = !testingAuto;
            document.querySelector('#my-autoclick-bu').innerText = testingAuto ? 'A' : 'M';
            localStorage.setItem('autoclick', testingAuto ? 'yes' : 'no');
        });
        document.querySelector('._2nDUm').appendChild(bu);
    }
}

function createStoriesProgressShower() {
    const progressEl = document.createElement('SPAN');
    progressEl.innerText = document.querySelector('[role="progressbar"]').getAttribute('aria-valuenow') * 100 + '%';
    progressEl.style.cssText = "z-index: 10; margin-left: .5rem;"
    progressEl.id = 'bugibugi';
    const target = document.querySelector('._2QKoe');
    target.append(progressEl);
}

function hideUnhideComplete(initial) {
    const bu = document.querySelector('#hide-show-bu');
    const minus = bu.innerText === '-';
    if (initial && minus) return;

    if (minus || initial) {
        const treeSections = Array.from(document.querySelectorAll('[data-test*="skill-path-unit"]'));
        treeSections.forEach(section => {
            hideInSection(section);
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

function hideInSection(section) {
    const container = section.querySelector('div');

    const skills = Array.from(container.querySelectorAll('[data-test*="skill-path-level"]'));
    skills.forEach(skill => {
        if (skill.classList.contains('_2D40f') || skill.classList.contains('_3bpfS')) {
            skill.classList.add('hidden-item');
        }
    });
    if (!section.querySelectorAll('[data-test*="skill-path-level"]:not(.hidden-item)').length) {
        section.classList.add('hidden-item');
    }
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
    const parent = document.querySelector('[data-test="skill-path"]');
    parent.parentElement.insertBefore(bu, parent);
    if (text === '+') {
        hideUnhideComplete('initial');
    }
}

let footerHidden = localStorage.getItem('footerHidden') === "true"
function showHideFooter() {
    if (footerHidden) {
        localStorage.removeItem('footerHidden');
        footerHidden = false;
    } else {
        localStorage.setItem('footerHidden', 'true');
        footerHidden = true;
    }
    hideShowFooter(footerHidden);
}

function hideShowFooter(hide) {
    const el = document.querySelector('#session\\/PlayerFooter').parentElement;
    if (hide) {
        el?.classList?.add('hidden-footer');
        document.querySelector('.panel')?.classList?.remove('shorter')
    } else {
        el?.classList?.remove('hidden-footer');
        document.querySelector('.panel')?.classList?.add('shorter')
    }
}

function movePopout() {
    const innerWidth = window.innerWidth;
    setTimeout(() => {
        const el = document.querySelector('[data-test=skill-popout]').firstElementChild;
        const elWidth = el.getBoundingClientRect().width;
        const elX = el.getBoundingClientRect().x;
        const iteXLeft = document.querySelector('.ite_X').style.left;

        if (elX < 0) {
            const val = Math.floor(Math.abs(elX) + 10)
            el.style.transform = `${el.style.transform} translateX(${val}px)`;
            document.querySelector('.ite_X').style.left = iteXLeft.replace(/\)$/, ` - ${val}px)`);
        } else if ((elX + elWidth) > innerWidth) {
            const val = Math.floor(innerWidth - elX - elWidth - 10);
            el.style.transform = `${el.style.transform} translateX(${val}px)`;
            document.querySelector('.ite_X').style.left = iteXLeft.replace(/\)$/, ` - ${val}px)`);
        }
    }, 301);
}

function setSkillTreeObserver() {
    const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes[0]?.nodeType === 1) {
                // if (mutation.addedNodes[0].nodeName === 'SECTION') {
                //     if (mutation.addedNodes[0].attributes.hasOwnProperty('data-test')) {
                //         hideInSection(mutation.addedNodes[0])
                //     }
                //     // mutation.target.parentElement.parentElement.parentElement.classList.add('hidden-item');
                // } else
                    if (
                    mutation.addedNodes[0] === document.querySelector('[data-test=skill-popout]') ||
                    mutation.addedNodes[0]?.querySelector('[data-test="skill-popout"]')
                ) {
                    movePopout();
                }
            }
        }
    }
    const targetNode = document.querySelector('[data-test="skill-path"]');
    const config = { attributes: false, childList: true, subtree: false, characterData: false };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

function setDraggableObserver() {
    const el = document.querySelector('.uH5m4');
    if (el.scrollHeight > el.clientHeight) {
        document.querySelector('._1C_S3').style = 'display: unset;';
        document.querySelector('._2PLYW').style.cssText = 'min-height: 52px; margin-bottom: 2rem;';

        const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                document.querySelector('._2PLYW').style.height = document.querySelector('.PcKtj').clientHeight + 'px';
            }
        }
        const targetNode = document.querySelector('.PcKtj');
        const config = { attributes: false, childList: true, subtree: false, characterData: false };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
}

async function setLearnObserver() {
    hideShowFooter(footerHidden);
    // if (document.querySelector('[data-test="word-bank"]') && !document.querySelector('#bugibugi')) {
    //     draggable();
    //     setDraggableObserver();
    // } else
    if (document.querySelector('[data-test="challenge challenge-dialogue"], [data-test="challenge challenge-readComprehension"]')) {
        hideShowFooter(false);
        footerHidden = false;
    } else if (document.querySelector('textarea, input')) {
        document.querySelector('textarea, input').addEventListener('tab', (event) => {
            setTimeout(() => {
                event.target.scrollIntoView({ block: 'end' });
            }, 200);
        });
        setTimeout(() => {
            document.querySelector('textarea, input').focus({ preventScroll: true });
            document.querySelector('textarea, input').scrollIntoView({ block: 'end' });
        }, 200);
    }

    const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes[0]?.nodeType === 1) {
                // if (mutation.addedNodes[0]?.querySelector('[data-test="word-bank"]') && !document.querySelector('#bugibugi')) {
                //     draggable();
                //     setDraggableObserver();
                // } else
                if (mutation.addedNodes[0]?.querySelector('[data-test="challenge challenge-dialogue"], [data-test="challenge challenge-readComprehension"]')) {
                    hideShowFooter(false);
                    footerHidden = false;
                } else if (mutation.addedNodes[0].contains(document.querySelector('textarea, input'))) {
                    document.querySelector('textarea, input').addEventListener('focus', (event) => {
                        event.target.scrollIntoView({ block: 'end' });
                        setTimeout(() => {
                            event.target.scrollIntoView({ block: 'end' });
                            setTimeout(() => event.target.scrollIntoView({ block: 'end' }), 100);
                        }, 200);
                    });
                    setTimeout(() => {
                        document.querySelector('textarea, input').focus({ preventScroll: true });
                    }, 200);
                }
            }
        }
    }

    let targetNode = document.querySelector('[data-test*="challenge "]')?.parentElement?.parentElement;
    if (!targetNode) {
        document.querySelector('[data-test="player-next"]')?.click();
        await new Promise(resolve => setTimeout(resolve, 700));
        if (!document.querySelector('[data-test*="challenge "]')) {
            document.querySelector('#session\\/PlayerFooter button').addEventListener("click", setLearnObserver);
            return;
        }
        targetNode = document.querySelector('[data-test*="challenge "]').parentElement.parentElement;
    }
    const config = { attributes: false, childList: true, subtree: true, characterData: false };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    const callback2 = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (
                mutation.attributeName === "class" &&
                mutation.target.id === 'session/PlayerFooter' &&
                mutation.target.classList.value.includes('_399cc')
            ) {
                hideShowFooter(footerHidden);
            }
            if (mutation.addedNodes[0]?.querySelector('[data-test="blame blame-correct"]')) {
                setTimeout(() => {
                    if (!document.querySelector('[data-test="blame blame-correct"]').querySelector('._1W9Eh')) { // can't listen/speak skip
                        neco('right').then(() => {
                            changeCounter('right');
                            if (document.querySelector('#my-autoclick-bu').innerText === 'A') {
                                document.querySelector('[data-test="player-next"]')?.click();
                            } else {
                                hideShowFooter(false);
                            }
                        });
                    }
                });
            } else if (mutation.addedNodes[0]?.querySelector('[data-test="blame blame-incorrect"]')) {
                if (!document.querySelector('[data-test="challenge challenge-speak"]')) {
                    neco('wrong').then(() => {
                        changeCounter('bad');
                        hideShowFooter(false);
                    });
                }
            }
        }
    }
    const targetNode2 = document.querySelector('#session\\/PlayerFooter').parentElement;
    const config2 = { attributes: true, childList: true, subtree: true, characterData: false };
    const observer2 = new MutationObserver(callback2);
    observer2.observe(targetNode2, config2);

    const progressBarCallback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.attributeName === 'aria-valuenow' && mutation.target.getAttribute('aria-valuenow') === '1') {
                const panel = document.querySelector('.panel');
                panel.classList.add('show');
                panel.classList.remove('hide');
            }
        }
    }
    const progressBar = document.querySelector('[role="progressbar"]');
    const progressBarConfig = { attributes: true, childList: false, subtree: false, characterData: false };
    const progressBarObserver = new MutationObserver(progressBarCallback);
    progressBarObserver.observe(progressBar, progressBarConfig);
}

function setStoriesObservers() {
    const storiesProgressBarUpdater = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.attributeName === 'aria-valuenow') {
                const progress = String(mutation.target.getAttribute('aria-valuenow') * 100).substring(0, 4) + '%';
                document.querySelector('#bugibugi').innerText = progress;
            }
        }
    }
    const targetNode = document.querySelector('[role="progressbar"]');
    const config = { attributes: true };
    const observer = new MutationObserver(storiesProgressBarUpdater);
    observer.observe(targetNode, config);

    const storiesElementsContainerObserverFun = (mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            if (mutation.attributeName === 'autofocus' && mutation.target.disabled === false) {
                if (document.querySelector('#my-autoclick-bu').textContent === 'A') {
                    const delay = getDelay();
                    setTimeout(() => {
                        document.querySelector('[data-test="stories-player-continue"]')?.click();
                    }, delay);
                }
            }
        });
    }
    const targetNode2 = document.querySelector('[data-test="stories-player-continue"]')
    const config2 = { attributes: true, childList: false, subtree: false, characterData: false };
    const observer2 = new MutationObserver(storiesElementsContainerObserverFun);
    observer2.observe(targetNode2, config2);
}

function getDelay() {
    const el = Array.from(
        document.querySelectorAll('[data-test="stories-element"]._3sNGF:not(._1Mwcz, ._2n3Ta), [data-test="stories-element"]._35e5D')
    ).filter(el => !!el.childElementCount && !el.querySelector('[data-test="stories-element"]')).pop();
    if (document.querySelector('.TVxEB') && !el?.querySelector('._2mWtz')) return 0;
    let str = el?.querySelector('._2mWtz')?.textContent ||
        el?.textContent?.split(/\s/)?.pop() ||
        document.querySelector('[data-test="stories-element"]').textContent

    return str?.length ?
        (str.length < 5 ? (str.length * 100) + 300 : str.length * 100) :
        750;
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

let isScrolling = false;
let scrollingInterval;
function scrolling() {
    // if (!isScrolling) document.querySelector('[data-test="skill-path"]').classList.add('scrolling');
    // console.log('true')
    // // e.stopPropagation();
    // isScrolling = true;
    // clearInterval(scrollingInterval);
    // scrollingInterval = setTimeout(() => {
    //     console.log('false')
    //     isScrolling = false;
    //     document.querySelector('[data-test="skill-path"]').classList.remove('scrolling')
    // }, 100);
}

function setScrollEvent() {
    // document.addEventListener('scroll', scrolling);
}

function addCustomDarkModeOption() {
    if (!this.document.querySelector('#darkMode') || this.document.querySelector('#darkMode').textContent.includes('Custom')) return;
    const savedValue = localStorage.getItem('duo.darkMode');

    if (savedValue.endsWith(':"custom"}')) document.querySelector('.cqJc3').innerText = 'Custom';
    const el = document.createElement('OPTION');
    el.classList.add('._24isA');
    el.value = 'custom';
    el.innerText = 'Custom';
    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (!document.querySelector('.cqJc3').innerText) {
                // document.querySelector('html').setAttribute("data-duo-theme", "light");
                document.querySelector('.cqJc3').innerText = 'Custom';
            }
        }
    }
    const targetNode = document.querySelector('.cqJc3');
    const config = { childList: true };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    document.querySelector('[data-test="save-button"]').addEventListener('click', () => {
        setTimeout(() => {
            toggleTheme();
        }, 300);
    });

    this.document.querySelector('#darkMode').appendChild(el);
}

// function removeTouchEndEvent(e) {
//     e.stopPropagation();
// }

(function () {
    'use strict';

    var el = document.createElement('DIV');
    el.id = 'mybpwaycfxccmnp-dblt-backdrop-filter'
    document.querySelector('html').insertBefore(el, document.querySelector('body'))

    window.addEventListener('load', function () {
        setScrollEvent();
        addThemes();

        if (document.querySelector('[data-test="skill-path"]')) {
            // createHideButton();
            setSkillTreeObserver();
            // Array.from(document.querySelectorAll('[data-test="skill"]')).forEach(el => {
            //     el.addEventListener('touchend', removeTouchEndEvent);
            // });
        }

        const oldTheme = localStorage.getItem('themed');
        if (oldTheme === '1') saveDarkModeStyle('custom');
        if (oldTheme) localStorage.removeItem('themed');

        if (localStorage.getItem('duo.darkMode').endsWith(':"custom"}')) {
            document.querySelector('html').setAttribute("data-duo-theme", "light")
            head[0].appendChild(style);
        }

        setTimeout(() => {
            document.querySelector('._2OFC6')?.click(); // open in app dialog
            addCustomDarkModeOption();
        }, 200);

        const callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {

                if (mutation.addedNodes[0]?.nodeType === 1) {
                    // if (mutation.addedNodes[0]?.querySelector('._3GElo') || mutation.addedNodes[0]?.querySelector('._1bdcY')) {
                    //     appendThemeSwitcher();
                    // }
                    if (mutation.addedNodes[0]?.querySelector('#darkMode')) {
                        addCustomDarkModeOption();
                    }

                    if (mutation.addedNodes[0]?.querySelector('[data-test="skill-tree"]')) {
                        // MAIN PAGE
                        setSkillTreeObserver();
                        // createHideButton();
                        if (document.querySelector('[data-test=skill-popout]')) {
                            movePopout();
                        }
                    } else if (mutation.addedNodes[0]?.querySelector('[data-test="stories-player-continue"]')) {
                        // STORIES PAGE
                        setStoriesObservers();
                        createAutoClickButton(true);
                        createStoriesProgressShower();
                        document.querySelector('.WzuSM')?.swiper("swipeUp", () => {
                            document.querySelector('[data-test="stories-player-continue"]')?.click();
                        });
                    } else if (mutation.addedNodes[0]?.querySelector('[data-test*="challenge "]') && !document.querySelector('#my-autoclick-bu')) {
                        // LEARN
                        if (document.querySelector('[role="progressbar"]')) {
                            setLearnObserver();
                            createAutoClickButton(false);
                            createNumber();
                            createSlider();
                            setTimeout(() => {
                                if (document.querySelector('textarea, input')) {
                                    document.querySelector('textarea, input').focus({ preventScroll: true });
                                }
                            }, 500);
                            if (footerHidden) hideShowFooter(true);
                            if (document.querySelector('._2plWZ')) {
                                document.querySelector('._2nDUm').classList.add('with-hearts')
                            }
                            document.querySelector(father).swiper("swipeLeft", swipeFunc);
                            document.querySelector(father).swiper("swipeRight", showHidePanel);
                            document.querySelector(father).swiper(
                                "swipeDown",
                                showHideFooter,
                                [
                                    '.panel',
                                    '._2PLYW',
                                    '._1vzP4.CeAwM'
                                ]
                            );
                        }
                    } else if (mutation.addedNodes[0]?.querySelector('[data-test="xp-slide"]')) {
                        if (footerHidden) hideShowFooter(false);
                    } else if (mutation.addedNodes[0]?.querySelector('._2OFC6')) {
                        // TODO more specific
                        // document.querySelector('._2OFC6').click();
                    }
                }
            }
        }

        const targetNode = document.querySelector('body');
        const config = { attributes: false, childList: true, subtree: true, characterData: false };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }, false);

})();
