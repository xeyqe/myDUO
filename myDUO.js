// ==UserScript==
// @name         Duolingo Improver
// @version      2.8.8.8
// @description  For description visit https://github.com/xeyqe/myDUO/blob/master/README.md
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @author       xeyqe
// @license      MIT
// @include      http://duolingo.com/*
// @include      https://duolingo.com/*
// @include      http://*.duolingo.com/*
// @include      https://*.duolingo.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/sortablejs@1.10.0-rc3/Sortable.min.js
// @resource     customCSS https://raw.githubusercontent.com/xeyqe/duolingo-style/master/darkDUO.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

var $ = jQuery;
var style;
var head;
var myArray = [];
var el;
var label;

var progressBar = "_1TkZD";
var hint = "XUDC1 _2nhHI _3ZTEO";
var coloredHint = "_1c_ny _1gjlS";

//var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);

Node.prototype.swiper = function(direction, func) {
    var touchstartX = 0;
    var touchstartY = 0;
    var touchendX = 0;
    var touchendY = 0;

    var gesuredZone = this;

    gesuredZone.addEventListener('touchstart', function(event) {
        touchstartX = event.touches[0].pageX;
        touchstartY = event.touches[0].pageY;
    });

    gesuredZone.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].pageX;
        touchendY = event.changedTouches[0].pageY;

        if (direction == "swipeRight") {
            if (touchstartX - touchendX < -25 &&
                Math.abs(touchstartY - touchendY) < 175) {
                func(event);
            }
        }
        else if (direction == "swipeLeft") {
            if (touchstartX - touchendX > 25 &&
                Math.abs(touchstartY - touchendY) < 175) {
                func(event);
            }
        }
        else if (direction == "swipeUp") {
            if (touchstartY - touchendY < -25 &&
                Math.abs(touchstartX - touchendX) < 175) {
                func(event);
            }
        }
        else if (direction == "swipeUp") {
            if (touchstartY - touchendY > 25 &&
                Math.abs(touchstartX - touchendX) < 175) {
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
    var node = document.createElement("p");
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

    if (document.querySelector('.Mlxjr') != null) {
        document.querySelector('.Mlxjr').appendChild(node);
    }
}

function changeCounter(whichOne) {
    var first = parseInt(document.querySelector('#right').innerText);
    var second = parseInt(document.querySelector('#wrong').innerText);

    if (whichOne == 'right')
        document.querySelector('#right').innerText = first + 1;
    else
        document.querySelector('#wrong').innerText = second + 1;
}

var launchAlert = function() {
    var promise = new Promise(function(resolve) {
        if (document.querySelector('h2._3H0e2._28jVs') != null) {
            var string1 = document.querySelector('h2._3H0e2._28jVs').innerText.split('\n', 1)[0];
        }

        if (document.querySelector('._75iiA') != null) {
            var col = document.querySelector('._75iiA').firstElementChild.children;
            var string2 = '';

            for (var i=0; i<col.length; i++) {
                if (col[i].classList.contains('_3Fow7')) {
                    string2 += `<u> ${col[i].innerText} </u>`;
                } else
                    string2 += col[i].innerText;
            }
        }

        if (document.querySelector('._2GiCe._12wY2') != null) {
            var string3 = document.querySelector('._2GiCe._12wY2').innerText;
        }

        if (string1.length || string2.length || string3.length)
            tempAlert(string1, string2, string3);
        resolve();
    });
    return promise;
}

function tempAlert(str1,str2,str3) {
    var timeout = null;
    if ($('#tempAlert') != null) $('#tempAlert').remove();

    el = document.createElement("div");

    el.setAttribute("style","padding:0.2rem;top:1.5rem;left:50%;transform:translateX(-50%);" +
                    "max-width:94%;width:fit-content;overflow:visible;position:absolute;" +
                    "color:#58a700;background:#b8f28b;z-index:900");
    $(el).attr('id', 'tempAlert');


    if (!(str2 == null && str3 != null))
        el.innerHTML = `<span><b>  ${str1} </b2></span>`;
    if (str2 != null)
        el.innerHTML += `<span> ${str2} </span>`;
    if (str3 != null)
        el.innerHTML += `<span> ${str3} </span>`;
    $(el).find('span').css({'display':'block','font-weight':'lighter'});

    timeout = removeTempAlert();

    $(el)
        .mouseenter(function() {
        if (document.querySelector('#tempAlert').style.border == "") {
            clearTimeout(timeout);
            timeout = null;
        }

    })
        .mouseleave(function() {
        if (document.querySelector('#tempAlert').style.border == "") {
            timeout = removeTempAlert();
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
}

function removeTempAlert() {
    var timeout = setTimeout(function(){
        $('#tempAlert').fadeOut(1000, function() {
            $(this).remove();
        })
    },3000);
    return timeout;
}

function autoClick() {
    if (document.querySelector('._1sntG') != null) {
        if ($('button').last()[0] != null) {
            launchAlert().then(function() {
                $('button').last()[0].click();
            });
        }
    }
}

function getListOfButtons() {
    var list = Array.from(document.querySelector('._3Ptco').children);
    var listOfButtons = [];

    for (var i=0; i<list.length; i++) {
        listOfButtons.push(list[i].innerText);
    }

    return listOfButtons;
}

function reclick(list) {
    var outBtt = [];
    var inBtt = [];

    for (var i = 0; i < list.length; i++) {
        $("._2T9b4 button").each(function () {
            if (this.innerText == list[i] && !outBtt.includes(this)) {
                outBtt.push(this);
                this.click();
                return false;
            }
        });
    }

    for (var j = 0; j < list.length; j++) {
        $("._30i_q button").each(function () {
            if (this.childNodes[this.childNodes.length-1].nodeValue == list[j] && !inBtt.includes(this)) {
                inBtt.push(this);
                return false;
            }
        });
    }

    for (var k=0; k<inBtt.length; k++) {
        inBtt[k].click();
    }
}

function draggable() {
    var output = document.querySelector('._3Ptco');

    Sortable.create(output, {
        onEnd: function (evt){ reclick(getListOfButtons()) },
        animation: 150
    });
}

function keyboardShortcuts() {
    var span = document.createElement('span');
    var list = $('._30i_q').find('._2ocEa');

    var listOfCode = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU",
                      "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF",
                      "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX",
                      "KeyC", "KeyV", "KeyB", "KeyN", "KeyM"];

    for (var i=0; i<list.length; i++) {
        list[i].childNodes[0].insertBefore(span.cloneNode(), list[i].childNodes[0].childNodes[0] || null);
        list[i].childNodes[0].querySelector('span').innerText = listOfCode[i][3].toLowerCase();
        list[i].childNodes[0].querySelector('span').style.display = 'block';
    }

    document.onkeyup = function(e) {
        if (listOfCode.includes(e.code)) {
            var char = e.code[3].toLowerCase();
            list.find('span:contains('+char+')').click();
        } else if (e.code == "Backspace") {
            var node = document.querySelector('._3Ptco');
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
    var arrowX = document.querySelector('._3h4O4').style.left;
    var left = el.parentElement.getBoundingClientRect().width/2 - el.getBoundingClientRect().width/2;
    el.style.left = left + "px";
    el.style.top = el.parentElement.getBoundingClientRect().height + "px";
    var xPx = el.getBoundingClientRect().x;
    var xWidthP = el.parentElement.getBoundingClientRect().width;
    var xWidth = el.getBoundingClientRect().width;
    var win = window.innerWidth;
    var padding = parseInt(window.getComputedStyle(document.querySelector('._3giip'), null)
                           .getPropertyValue('padding-left').split('p')[0]);
    var error = win - (xPx + xWidth) - padding;

    if (error<0) {
        var positionXRight = left + error;
        el.style.left = positionXRight +"px";
        document.querySelector('._3h4O4').style.left = arrowX - positionXRight + "px";
    }
    if (xPx < padding) {
        var positionXLeft = -el.parentElement.getBoundingClientRect().x + padding;
        el.style.left = positionXLeft + 'px';
        document.querySelector('._3h4O4').style.left = arrowX - positionXLeft + "px";
    }


}

function throwNotif() {
    if (el != null) {
        document.querySelector('._3PBCS').appendChild(el);
        el = null;
    }
}

function createSlider() {
    var panel = document.createElement("div");
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

    document.querySelector('._3giip').appendChild(panel);

    document.querySelector('._3giip').addEventListener('mousedown', function(event) {
        var isClickInside = document.querySelector('.panel').contains(event.target) || panel == event.target;

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
                var num = -1*(document.querySelector('.panel').getBoundingClientRect().width-20);
                $( ".panel" ).animate({
                    left: num+""
                }, 700, function() {
                });
                $('.panel').removeClass('hide').addClass('show');
            }
        }
    }
}

function addAnswerResultToPanel(array){
    var background;
    var color;

    var div = document.createElement('div');
    div.append(document.createElement('span'), // header
               document.createElement('span'), // question
               document.createElement('span'), // yourAnswer
               document.createElement('span'), // correctAnswer
               document.createElement('span'), // anotherCorrect
               document.createElement('span'), // meaning
               document.createElement('span') //  color
              );

    if (array[array.length-1] == 'red') {
        background = '#ffc1c1';
        color = '#ea2b2b';
        div.querySelectorAll('span')[4].style.background = '#b8f28b';
        div.querySelectorAll('span')[4].style.width = 'fit-content';

    } else {
        background = '#b8f28b';
        color = '#58a700';
    }

    $(div).find('span').css({'display':'block'});
    $(div).css({'box-sizing':'border-box',
                'padding':'10px',
                'width':'fit-content',
                'height':'fit-content',
                'border-radius':'10px',
                'margin':'10px',
                'background':background,
                'color':color});

    div.querySelectorAll('span')[0].style.fontWeight = 'bold';
    div.querySelectorAll('span')[1].style.color = 'black';


    var div2 = div.cloneNode(true);
    for (var i=0; i<array.length-1; i++) {
        if (array[i] != null)
            div2.childNodes[i].innerHTML = array[i];
    }

    document.querySelector('.panel').appendChild(div2);
    setTimeout(()=>{
        if (document.querySelector('.show') != null) {
            document.querySelector('.panel').style.left = -document.querySelector('.panel')
                .getBoundingClientRect().width + 20 +'px';
        }
    },20);
}

function neco(color) {
    var promise = new Promise((resolve)=>{
        var header;
        var question;
        var yourAnswer;
        var correctAnswer;
        var anotherCorrect;
        var meaning;

        if (document.querySelector('[data-test="challenge-header"]') != null )
            header = document.querySelector('[data-test="challenge-header"]')
                .childNodes[document.querySelector('[data-test="challenge-header"]')
                            .children.length-1].innerText;

        if (document.querySelector('[data-test="hint-sentence"]') != null) {
            question = document.querySelector('[data-test="hint-sentence"]').innerText;
            var spanList = document.querySelectorAll('label span');
            if (spanList.length) {
                var append = "";
                for (var ap of spanList) {
                    if (ap.className == "")
                        append += ap.innerText;
                    else
                        append += "____";
                }
                question += "<br>"+append;
            }
        }
        else if (document.querySelector('[data-prompt]') != null)
            question = document.querySelector('[data-prompt]').getAttribute('data-prompt');
        else if (document.querySelector('.KRKEd') != null) {
            question = document.querySelector('.KRKEd').innerText;
        }
        else if (document.querySelector('[data-test="hint-token"]') != null)
            question = document.querySelector('[data-test="hint-token"]').innerText;
        else if (document.querySelector('div._3oJjO._1py6s._1e69E._3_NyK._1Juqt') != null)
            question = document.querySelector('div._3oJjO._1py6s._1e69E._3_NyK._1Juqt').innerText.replace(/\n/g, "");



        if ( document.querySelector('._3Ptco') != null) {
            var elements = document.querySelector('._3Ptco').children;
            for (var el of elements) {
                if (yourAnswer != null)
                    yourAnswer += el.innerText + " ";
                else
                    yourAnswer = el.innerText + " ";
            }
        }
        else if (document.querySelector('[data-test="challenge-translate-input"]') != null)
            yourAnswer = document.querySelector('[data-test="challenge-translate-input"]').innerHTML;
        else if (document.querySelector('[data-test="challenge-judge-text"]') != null) {
            if (document.querySelector('label._1VKCj._2VgPp._1-PLN._2QNyK._3DsW-._2q1CL._1X3l0.eJd0I.H7AnT') != null) {
                yourAnswer = document.querySelector('label._1VKCj._2VgPp._1-PLN._2QNyK._3DsW-._2q1CL._1X3l0.eJd0I.H7AnT')
                    .querySelector('[data-test="challenge-judge-text"]').innerText;
            } else yourAnswer = '';
        }
        else if (document.querySelector('[data-test="challenge-text-input"]') != null)
            yourAnswer = document.querySelector('[data-test="challenge-text-input"]').getAttribute('value');
        else if (document.querySelectorAll('[data-test="challenge-choice-card"]') != null)
            yourAnswer = document.querySelector('._3DsW-').innerText;
        if (yourAnswer == '' && yourAnswer != null)
            yourAnswer = 'SKIPPED';

        if (document.querySelector('._75iiA') != null) {
            var col = document.querySelector('._75iiA').firstElementChild.children;
            anotherCorrect = '';
            for (var i=0; i<col.length; i++) {
                if (col[i].classList.contains('_3Fow7')) {
                    anotherCorrect += "<u>" + col[i].innerText + "</u>";
                } else
                    anotherCorrect += col[i].innerText;
            }
        }
        if (document.querySelector('._2GiCe') != null) {
            meaning = document.querySelector('._2GiCe').innerText;
        }

        addAnswerResultToPanel([header,question,yourAnswer,correctAnswer,anotherCorrect,meaning,color]);

        resolve();
    });
    return promise;

}

var css = [".switch {",
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
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            document.documentElement.appendChild(node);
        }
    }

    var newCSS = GM_getResourceText("customCSS");

    style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(newCSS));
    head = document.getElementsByTagName("head");
    style.id = 'darkDUOmobile';
}

function createThemeSwitcherButton() {
    label = document.createElement('label');
    var input = document.createElement('input');
    var span = document.createElement('span');

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
    if (window.innerWidth>700 && window.innerWidth>window.innerHeight)
        $('.iNLw3 span').attr("style", "display: block !important");
    else
        $('.iNLw3 span').attr("style", "display: none !important");
}

(function() {
    'use strict';

    if (document.querySelector('._3giip') != null) {
        document.querySelector('._3giip').swiper("swipeLeft", swipeFunc);
        document.querySelector('._3giip').swiper("swipeRight", showHidePanel);
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

    var counterBool = true;
    var cantListenVar = 0;

    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {

            if (mutation.type == "attributes") {

                //throwNotif to last question
                if (mutation.target.className == progressBar) {
                    setTimeout(()=>{
                        if (document.querySelector("."+progressBar) != null && document.querySelector("."+progressBar).style.width == "100%") {
                            throwNotif();
                        }
                    }, 100);

                }
            }

            if (mutation.addedNodes.length && mutation.addedNodes[0].className != null) {

                if (mutation.addedNodes[0].contains(document.querySelector('._1bfyi'))) {
                    document.querySelector('._1bfyi').swiper('swipeLeft', ()=>{$('._1fURZ, ._3JkvC').click()});
                }

                // takes care of skipping
                if (mutation.addedNodes[0].contains(document.querySelector('[data-test="player-skip"]'))) {
                    setTimeout(()=>{
                        if (document.querySelector('._1uJnx') != null || document.querySelector('[data-test="challenge-speak-button"]')) {
                            document.querySelector('[data-test="player-skip"]').addEventListener('click', function(){
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
                    moveHintDiv(mutation.target.firstElementChild);
                    mutation.target.style.background = 'purple';
                    mutation.target.style.color = 'white';
                }

                if (mutation.addedNodes[0].contains(document.querySelector('.KekRP._3Txod._1yRbM'))) {
                    neco('green').then(()=>{
                        autoClick();
                        if (counterBool)
                            changeCounter('right');
                        else
                            counterBool = true;
                    });
                }
                else if (mutation.addedNodes[0].contains(document.querySelector('.KekRP._3Txod._2KlCX'))) {
                    neco('red').then(()=> {
                        if (counterBool)
                            changeCounter('bad')
                        else
                            counterBool = true;
                    });
                }
                else if (mutation.addedNodes[0].contains(document.querySelector('._1oLqd'))) {
                    draggable();
                    keyboardShortcuts();
                }

                if (mutation.addedNodes[0].contains(document.querySelector('textarea')) ||
                    mutation.addedNodes[0].contains(document.querySelector('input'))) {
                    setTimeout(()=>{$('textarea, input')[0].focus()},200);
                }

                if (mutation.addedNodes[0].contains(document.querySelector('._1Zqmf')) && el!=null) {
                    throwNotif();
                }

                if (mutation.addedNodes[0].contains(document.querySelector('._3giip'))) {
                    document.querySelector('._3giip').swiper("swipeLeft", swipeFunc);
                    document.querySelector('._3giip').swiper("swipeRight", showHidePanel);
                }

                if (mutation.addedNodes[0].classList.value == 'Mlxjr' &&
                    mutation.addedNodes[0].contains(document.querySelector('.MAF30'))) {
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

    var targetNode = document.querySelector('body');
    var config = { attributes: true, childList: true, subtree: true, characterData: true };
    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

})();