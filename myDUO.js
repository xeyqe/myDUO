// ==UserScript==
// @name         Duolingo Improver
// @version      2.9.0.3
// @description  For description visit https://github.com/xeyqe/myDUO/blob/master/README.md
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @author       xeyqe
// @license      MIT
// @include      http://duolingo.com/*
// @include      https://duolingo.com/*
// @include      http://*.duolingo.com/*
// @include      https://*.duolingo.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.10.1/Sortable.min.js
// @resource     customCSS https://raw.githubusercontent.com/xeyqe/duolingo-style/master/darkDUO.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

const $ = jQuery;
let style;
let head;
let myArray = [];
let el;
let label;

const progressBar = "_1TkZD";
const hint = "XUDC1 _2nhHI _3ZTEO";
const coloredHint = "_1c_ny _1gjlS";
const father = '._26xNT';

//var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);

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
        if (document.querySelector('.hide') == null) {
            if ($('button').last()[0] != null)
                $('button').last()[0].click();
        }
        else if (document.querySelector('.show') == null)
            showHidePanel();
    }
}

function createNumber() {
    let node = document.createElement("p");
    node.setAttribute("id", "counter");
    $(node).css({'position':'relative',
                 'right':'1%',
                 'top':'1%',
                 'paddingLeft':'3%',
                 'fontSize':'2rem',
                 'margin-left':'20px'
                });

    node.innerHTML =
        "<span id=\"wrong\" style=\"color:red\">0</span>/<span id=\"right\" style=\"color:#79c822\">0</span>";

    if (document.querySelector('._3-qon') != null) {
        document.querySelector('._3-qon').appendChild(node);
    }
}

function changeCounter(whichOne) {
    const first = parseInt(document.querySelector('#right').innerText);
    const second = parseInt(document.querySelector('#wrong').innerText);

    if (whichOne == 'right')
        document.querySelector('#right').innerText = first + 1;
    else
        document.querySelector('#wrong').innerText = second + 1;
}
let timeout;
function tempAlert(str) {
    if (timeout) {
        clearTimeout(timeout);
    }

    if ($('#tempAlert') != null) $('#tempAlert').remove();

    el = document.createElement("div");

    el.setAttribute("style","padding:0.2rem;top:1.5rem;left:50%;transform:translateX(-50%);" +
                    "max-width:94%;width:fit-content;overflow:visible;position:absolute;" +
                    "color:#58a700;background:#b8f28b;z-index:900");
    $(el).attr('id', 'tempAlert');

    el.innerHTML = str;

    $(el).find('span').css({'display':'block','font-weight':'lighter'});

    removeTempAlert();

    $(el)
        .mouseenter(function() {
        if (document.querySelector('#tempAlert').style.border == "") {
            clearTimeout(timeout);
            timeout = null;
        }

    })
        .mouseleave(function() {
        if (document.querySelector('#tempAlert').style.border == "") {
            removeTempAlert();
        }
    });

    el.addEventListener("click", ()=>{
        if (document.querySelector('#tempAlert').style.border == "") {
            document.querySelector('#tempAlert').style.border = "3px solid white";
            clearTimeout(timeout);
        }
        else {
            document.querySelector('#tempAlert').style.border = "";
            $('#tempAlert').fadeOut(1000, function() { $(this).remove(); });
        }
    });
    if (el != null) {
        document.querySelector('body').appendChild(el);
        el = null;
    }
}

function removeTempAlert() {
    timeout = setTimeout(function(){
        $('#tempAlert').fadeOut(1000, function() {
            $(this).remove();
            timeout = null;
        })
    },3000);
}

function autoClick() {
    if (document.querySelector('._1Ag8k._1p08S') != null) {
        if ($('button').last()[0] != null) {
            $('button').last()[0].click();
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
            $(list).find('span:contains('+char+')').click();
        } else if (e.code == "Backspace") {
            let node = document.querySelector('._3ysW7');
            if (node.children.length > 0) {
                node.childNodes[node.childNodes.length-1].firstElementChild.click();
            }
        }
    }

    $(window).off("resize", hideShowKey);

    $(window).resize(hideShowKey);

    hideShowKey();

}

function moveHintDiv(el) {
    const arrowX = document.querySelector('._3h4O4').style.left;
    const left = el.parentElement.getBoundingClientRect().width/2 - el.getBoundingClientRect().width/2;
    el.style.left = left + "px";
    el.style.top = el.parentElement.getBoundingClientRect().height + "px";
    const xPx = el.getBoundingClientRect().x;
    const xWidthP = el.parentElement.getBoundingClientRect().width;
    const xWidth = el.getBoundingClientRect().width;
    const win = window.innerWidth;
    const padding = parseInt(window.getComputedStyle(document.querySelector(father), null)
                           .getPropertyValue('padding-left').split('p')[0]);
    const error = win - (xPx + xWidth) - padding;

    if (error<0) {
        const positionXRight = left + error;
        el.style.left = positionXRight +"px";
        document.querySelector('._3h4O4').style.left = arrowX - positionXRight + "px";
    }
    if (xPx < padding) {
        const positionXLeft = -el.parentElement.getBoundingClientRect().x + padding;
        el.style.left = positionXLeft + 'px';
        document.querySelector('._3h4O4').style.left = arrowX - positionXLeft + "px";
    }


}

function createSlider() {
    const panel = document.createElement("div");
    $(panel).css({'width':'fit-content',
                  'max-width':'95vw',
                  'float':'left',
                  'height':'fit-content',
                  'position':'absolute',
                  'top':'8%',
                  'overflow-y':'scroll',
                  'max-height':'92%',
                  'z-index':'1000',
                  'scrollbar-width':'none'});
    panel.setAttribute('class','panel show');

    document.querySelector(father).appendChild(panel);

    document.querySelector(father).addEventListener('mousedown', function(event) {
        const isClickInside = document.querySelector('.panel').contains(event.target) || panel == event.target;

        if (!isClickInside) {
            if (document.querySelector('.hide') != null)
                showHidePanel();
        }
    });

    panel.addEventListener("click", function(e){
        e.preventDefault();
        if (document.querySelector('.show') != null)
            showHidePanel();
    });

}

function showHidePanel(event){
    if (mayISwipe(event)) {
        if ($('.panel').find('div').length > 0) {
            if($('.panel').hasClass('show')){
                $( ".panel" ).animate({
                    left: "+0"
                }, 700, function() {
                });
                $('.panel').removeClass('show').addClass('hide');
            }
            else {
                const num = -1*(document.querySelector('.panel').getBoundingClientRect().width-20);
                $( ".panel" ).animate({
                    left: num+""
                }, 700, function() {
                });
                $('.panel').removeClass('hide').addClass('show');
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
            yourAnswer = document.querySelector('._3ysW7').innerText.replace('\n', ' ');
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
            if (document.querySelector('._1obm2 .TnCw3._11xjL'))
                tempAlert(document.querySelector('._1obm2 .TnCw3._11xjL').innerText);
            else
                tempAlert(document.querySelector('h2').innerText);
        }


        setTimeout(()=>{
            if (document.querySelector('.show') != null) {
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
           ".XUDC1._2nhHI._3ZTEO {",
           "    transform: unset;",
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
            if (document.querySelector('#darkDUOmobile') != null)
                document.querySelector('#darkDUOmobile').remove();
            localStorage.setItem('themed', '0');
        } else {
            head[0].appendChild(style);
            localStorage.setItem('themed', '1');

        }
    });
}

function appendThemeSwitcher() {
    if (document.querySelector('._3F_8q') != null) {
        if (window.innerWidth < 700) {
            document.querySelector('._3F_8q').parentNode.parentNode.append(label);
            label.style.top = '4em';
        }
        else
            document.querySelector('._3F_8q').append(label);
        if (localStorage.getItem('themed') == '1') {
            document.querySelector('#checkbx').checked = true;
        }
    }
    else if (document.querySelector('._31whh') != null) {
        document.querySelector('._31whh').append(label);

        if (localStorage.getItem('themed') == '1') {
            document.querySelector('#checkbx').checked = true;
        }
    }
}

addThemes();

function mayISwipe(event) {
    if (event != null && document.querySelector('.CfwZx') != null &&
        document.querySelector('.CfwZx').contains(event.target)) {
        return false;
    } else
        return true
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

    if (document.querySelector(father) != null) {
        document.querySelector(father).swiper("swipeLeft", swipeFunc);
        document.querySelector(father).swiper("swipeRight", showHidePanel);
    } else if(document.querySelector('._1bfyi') != null) {
        document.querySelector('._1bfyi').swiper('swipeLeft', ()=>{
            $('._1fURZ, ._3JkvC').click()
        });
    }

    createThemeSwitcherButton();
    appendThemeSwitcher();

    if (localStorage.getItem('themed') == "1") {
        head[0].appendChild(style);
        if (document.querySelector('#checkbx') != null)
            document.querySelector('#checkbx').checked = true;
    }

    const counterBool = true;

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {

            if (mutation.addedNodes.length && mutation.addedNodes[0].className != null) {

                if (mutation.addedNodes[0].contains(document.querySelector('._1bfyi'))) {
                    document.querySelector('._1bfyi').swiper('swipeLeft', ()=>{$('._1fURZ, ._3JkvC').click()});
                }

                // takes care of skipping
                if (mutation.addedNodes[0].contains(document.querySelector('[data-test="player-skip"]'))) {
                    setTimeout(()=>{
                        if (document.querySelector('._1uJnx') != null || document.querySelector('[data-test="challenge-speak-button"]') != null) {
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

                if (mutation.addedNodes[0].className == "XUDC1 _2nhHI _3ZTEO") {
                    console.log('movehint launched');
                    moveHintDiv(mutation.target.firstElementChild);
                    mutation.target.style.background = 'purple';
                    mutation.target.style.color = 'white';
                    document.querySelector('._3bFAF').style.color = 'black';
                }

                if (mutation.addedNodes[0].className == '_1Ag8k _1p08S _1WH_r') {
                    neco('right').then(()=>{
                        autoClick();
                        if (counterBool)
                            changeCounter('right');
                        else
                            counterBool = true;
                    });
                }
                else if (mutation.addedNodes[0].className == '_1Ag8k _1p08S _1S5ta') {
                    neco('wrong').then(()=> {
                        if (counterBool)
                            changeCounter('bad')
                        else
                            counterBool = true;
                    });
                }
                else if (mutation.addedNodes[0].contains(document.querySelector('[data-test="challenge challenge-listenTap"]'))) {
                    draggable();
                    keyboardShortcuts();
                }

                if (mutation.addedNodes[0].contains(document.querySelector('textarea')) ||
                    mutation.addedNodes[0].contains(document.querySelector('input'))) {
                    setTimeout(()=>{$('textarea, input')[0].focus()},200);
                }

                if (mutation.addedNodes[0].contains(document.querySelector(father))) {
                    document.querySelector(father).swiper("swipeLeft", swipeFunc);
                    document.querySelector(father).swiper("swipeRight", showHidePanel);
                }

                if (mutation.addedNodes[0].classList.value == '_3-qon' &&
                   mutation.addedNodes[0].contains(document.querySelector('._2q0iC'))) {
                    createNumber();
                    createSlider();
                }
            }

            if (mutation.removedNodes.length) {
                if ($(mutation.removedNodes[0]).find('._3Ptco').length) {
                    if (document.querySelector('._3Ptco') == null) {
                        document.onkeyup = function (e) {
                            return false;
                        }
                    }
                }
                if (mutation.removedNodes[0].className == "XUDC1 _2nhHI _3ZTEO") {
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