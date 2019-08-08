// ==UserScript==
// @name         Duolingo Improver
// @version      2.8.5.7
// @description  Skips "You are correct" dialogs, binds swipeleft to CHECK button, adds counter to practise and words in answers where you don't write it only select from several inputs are rearrangable by drag and drop.
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @author       xeyqe
// @license      MIT
// @include      http://duolingo.com/*
// @include      https://duolingo.com/*
// @include      http://*.duolingo.com/*
// @include      https://*.duolingo.com/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/sortablejs@1.10.0-rc3/Sortable.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/detect_swipe/2.1.4/jquery.detect_swipe.min.js
// @resource     customCSS https://raw.githubusercontent.com/xeyqe/duolingo/master/darkDUOmobile.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var $ = jQuery;
    var mayI = true;
    //var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);

    if (document.querySelector('._3giip') != null) {
        mistrKladivo('._3giip');
    }

    var css = [".switch {",
               "position: relative;",
               "display: inline-block;",
               "width: 60px;",
               "height: 34px;",
               "}",
               "",
               ".switch input { ",
               "opacity: 0;",
               "width: 0;",
               "height: 0;",
               "}",
               "",
               ".slider {",
               "position: absolute;",
               "cursor: pointer;",
               "top: 0;",
               "left: 0;",
               "right: 0;",
               "bottom: 0;",
               "background-color: #ccc;",
               "-webkit-transition: .4s;",
               "transition: .4s;",
               "}",
               "",
               ".slider:before {",
               "position: absolute;",
               "content: '';",
               "height: 26px;",
               "width: 26px;",
               "left: 4px;",
               "bottom: 4px;",
               "background-color: white;",
               "-webkit-transition: .4s;",
               "transition: .4s;",
               "}",
               "",
               "input:checked + .slider {",
               "background-color: #2196F3;",
               "}",
               "",
               "input:focus + .slider {",
               "box-shadow: 0 0 1px #2196F3;",
               "}",
               "",
               "input:checked + .slider:before {",
               "-webkit-transform: translateX(26px);",
               "-ms-transform: translateX(26px);",
               "transform: translateX(26px);",
               "}",
               "",
               ".slider.round {",
               "border-radius: 34px;",
               "}",
               "",
               ".slider.round:before {",
               "border-radius: 50%;",
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
               "#tempAlert {",
               "    font-size: 25px",
               "}"
              ].join("\n");
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

    var style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(newCSS));
    var head = document.getElementsByTagName("head");
    style.id = 'darkDUOmobile';


    var label = document.createElement('label');
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


    appendThemeSwitcher();

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


    if (localStorage.getItem('themed') == "1") {
        head[0].appendChild(style);
        if (document.querySelector('#checkbx') != null)
            document.querySelector('#checkbx').checked = true;
    }

    function mistrKladivo(destination) {
        var element = document.querySelector(destination);
        $(element).on('swipeleft', (function(){
            if (mayI) {
                if (document.querySelector('.hide') == null) {
                    swipeFunc();
                } else if (document.querySelector('.show') == null)
                    showHidePanel();
            }
        }));
        $(element).on('swiperight', (function(){
            if (mayI) {
                showHidePanel();
            }
        }));
    }


    function swipeFunc() {
        if ($('button').last()[0] != null) {
            $('button').last()[0].click();
        }
    }

    function createNumber() {
        var node = document.createElement("p");
        node.setAttribute("id", "counter");
        $(node).css({'position':'relative',
                     'right':'1%',
                     'top':'1%',
                     'paddingLeft':'3%'
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
                        string2 += "<u>" + col[i].innerText + "</u>";
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


    var el;

    function tempAlert(str1,str2,str3) {
        var timeout = null;
        if ($('#tempAlert') != null) $('#tempAlert').remove();

        el = document.createElement("div");

        el.setAttribute("style","padding:0.1em;line-height:0.7em !important;right:3%;" +
                        "max-width:94%;width:fit-content;overflow:visible;position:absolute;" +
                        "color:#58a700;background:#b8f28b;z-index:900");
        $(el).attr('id', 'tempAlert');


        if (!(str2 == null && str3 != null))
            el.innerHTML = "<span><b>" + str1 + "</b2></span>";
        if (str2 != null)
            el.innerHTML += "<span>" + str2 + "</span>";
        if (str3 != null)
            el.innerHTML += "<span>" + str3 + "</span>";
        $(el).find('span').css({'display':'block','font-size':'0.7em','font-weight':'lighter'});

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
        var list = Array.from(document.querySelector('._3Ptco').firstElementChild.children);
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

    function allowSwiping() {
        mayI = false;
    }

    function disallowSwiping() {
        mayI = true;
    }


    function draggable() {
        var output = document.querySelector('._3Ptco').firstElementChild;
        output.addEventListener("touchstart", allowSwiping, false);
        output.addEventListener("touchend", disallowSwiping, false);

        Sortable.create(output, {
            onEnd: function (evt){ reclick(getListOfButtons()) },
            animation: 150
        });
    }

    function keyboardShortcuts() {
        var span = document.createElement('span');
        var list = $('._30i_q').find('.lnZE0._2ocEa');
        //var listOfChar = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        //var listOfCode = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77];
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
                var node = document.querySelector('._3Ptco').firstElementChild;
                if (node.children.length > 0) {
                    node.childNodes[node.childNodes.length-1].firstElementChild.click();
                }
            }
        }
    }

    function moveHintDiv(el) {
        var xPx = el.getBoundingClientRect().x;
        var xWidthP = el.parentElement.getBoundingClientRect().width;
        var xWidth = el.getBoundingClientRect().width;
        var win = window.innerWidth;
        var padding = parseInt(window.getComputedStyle(document.querySelector('._3giip'), null)
                               .getPropertyValue('padding-left').split('p')[0]);
        var error = win - (xPx + xWidth) - padding;

        if (error<0) {
            var positionX1 = xWidthP/2 + error;
            el.style.left = positionX1 +'px';
        }
        if (xPx < padding) {
            var positionX2 = xWidthP/2 - xPx + padding;
            el.style.left = positionX2+'px';
        }
    }

    function throwNotif() {
        //if (window.innerWidth < 700) {
          //  document.querySelector('._1Zqmf').insertBefore(el, $('._1Zqmf')[0].childNodes[0] || null);
        //}
        //else
            document.body.appendChild(el);
        el = null;
    }

    var myArray = [];

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

        document.addEventListener('mousedown', function(event) {
            var isClickInside = panel.contains(event.target) || panel == event.target;

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

    function showHidePanel(){
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

    function addAnswerResultToPanel(array){
        var background;
        var color;

        var div = document.createElement('div');
        div.append(document.createElement('span'),
                   document.createElement('span'),
                   document.createElement('span'),
                   document.createElement('span'),
                   document.createElement('span'),
                   document.createElement('span'),
                   document.createElement('span')
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
            var question;
            var yourAnswer;
            var correctAnswer;
            var anotherCorrect;
            var meaning;
            var header;

            if (document.querySelector('[data-test="challenge-header"]') != null )
                header = document.querySelector('[data-test="challenge-header"]')
                    .childNodes[document.querySelector('[data-test="challenge-header"]')
                                .children.length-1].innerText;

            if (document.querySelector('[data-test="hint-sentence"]') != null)
                question = document.querySelector('[data-test="hint-sentence"]').innerText;
            else if (document.querySelector('[data-prompt]') != null)
                question = document.querySelector('[data-prompt]').getAttribute('data-prompt');
            else if (document.querySelector('.KRKEd') != null) {
                question = document.querySelector('.KRKEd').innerText;
            }
            else if (document.querySelector('[data-test="hint-token"]') != null)
                question = document.querySelector('[data-test="hint-token"]').innerText;
            else if (document.querySelector('div._3oJjO._1py6s._1e69E._3_NyK._1Juqt') != null)
                question = document.querySelector('div._3oJjO._1py6s._1e69E._3_NyK._1Juqt').innerText.replace(/\n/g, "");


            if ( document.querySelector('._6HogY') != null)
                yourAnswer = document.querySelector('._6HogY').innerText.replace(/\n/g, " ");
            else if (document.querySelector('[data-test="challenge-translate-input"]') != null)
                yourAnswer = document.querySelector('[data-test="challenge-translate-input"]').innerHTML;
            else if (document.querySelector('[data-test="challenge-judge-text"]') != null) {
                if (document.querySelector('label._1VKCj._2VgPp._1-PLN._2QNyK._3DsW-._2q1CL._1X3l0.eJd0I.H7AnT') != null) {
                    yourAnswer = document.querySelector('label._1VKCj._2VgPp._1-PLN._2QNyK._3DsW-._2q1CL._1X3l0.eJd0I.H7AnT')
                        .querySelector('[data-test="challenge-judge-text"]').innerText
                } else yourAnswer = '';
            }
            else if (document.querySelector('[data-test="challenge-text-input"]') != null)
                yourAnswer = document.querySelector('[data-test="challenge-text-input"]').getAttribute('value');
            else if (document.querySelector('._1xgIc') != null)
                yourAnswer = document.querySelector('._1xgIc').innerText;
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


    var counterBool = true;
    var cantListenVar = 0;

    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {


            if (mutation.type == "attributes") {

                if (mutation.target.classList.value == '_2etd0 _2ESN4 _2arQ0 _2vmUZ _1X3l0 eJd0I _3yrdh _2wXoR _1AM95 _1dlWz mucpb' &&
                    document.querySelector('._1uJnx') != null)
                    counterBool = false;

                if (mutation.target.classList.value == '_3N_rN oNqWF _3hso2 _2vmUZ _1X3l0 eJd0I _3yrdh _2wXoR _1AM95 _2PUh7 H7AnT _3Ry1f' &&
                    document.querySelector('button._3MoOc._2etd0._2ESN4._2arQ0._2vmUZ._1X3l0.eJd0I._3yrdh._2wXoR._1AM95._1dlWz.mucpb') != null) {
                    ++cantListenVar;
                    if (cantListenVar == 2) {
                        if (document.querySelector('button._3MoOc._2etd0._2ESN4._2arQ0._2vmUZ._1X3l0.eJd0I._3yrdh._2wXoR._1AM95._1dlWz.mucpb')
                            .getAttribute('disabled') == null)
                            counterBool = false;
                    } else if (cantListenVar == 3) cantListenVar = 0;


                }

                if (mutation.attributeName == "class") {
                    if (document.querySelector('button.cVLwd._2arQ0._2vmUZ._2Zh2S._1X3l0.eJd0I._3yrdh._2wXoR._1AM95._1dlWz._2gnHr._3Ry1f') != null &&
                        document.querySelector('button.cVLwd._2arQ0._2vmUZ._2Zh2S._1X3l0.eJd0I._3yrdh._2wXoR._1AM95._1dlWz._2gnHr._3Ry1f')
                        .innerText.includes('...')) {
                        throwNotif();
                    }

                    if (mutation.target.classList.value == "_1gjlS") {
                        moveHintDiv(mutation.target);
                        mutation.target.parentElement.style.background = 'purple';
                        mutation.target.parentElement.style.color = 'white';
                    } else if (mutation.target.classList.value == "_1c_ny _1gjlS") {
                        $('._1gjlS').css('left','50%');
                        mutation.target.parentElement.style.background = '';
                        mutation.target.parentElement.style.color = '';
                    }
                }

            }

            if (mutation.addedNodes.length && mutation.addedNodes[0].classList != null) {

                if(mutation.addedNodes[0].contains(document.querySelector('._1bfyi'))) {
                    $('._1bfyi').on('swipeleft', (function() {
                        $('._1fURZ, ._3JkvC').click();
                    }));
                }

                if(mutation.addedNodes[0].contains(document.querySelector('._3F_8q'))) {
                    appendThemeSwitcher()
                }
                if(mutation.addedNodes[0].contains(document.querySelector('._31whh'))) {
                    appendThemeSwitcher();
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
                    if (!$.detectSwipe.enabled) keyboardShortcuts();
                }

                if (mutation.addedNodes[0].contains(document.querySelector('textarea')) ||
                    mutation.addedNodes[0].contains(document.querySelector('input'))) {
                    setTimeout(()=>{$('textarea, input')[0].focus()},200);
                }

                if (mutation.addedNodes[0].contains(document.querySelector('._1Zqmf')) && el!=null) {
                    throwNotif();
                }

                if (mutation.addedNodes[0].contains(document.querySelector('._3giip'))) {
                    mistrKladivo('._3giip');
                }

                if (mutation.addedNodes[0].classList.value == 'Mlxjr' &&
                    mutation.addedNodes[0].contains(document.querySelector('.MAF30'))) {
                    createNumber();
                    createSlider();
                }
            }

            if (mutation.removedNodes.length) {
                if ($(mutation.removedNodes[0]).find('._6HogY').length) {
                    if (document.querySelector('._6HogY') == null) {
                        document.onkeyup = function (e) {
                            return false;
                        }
                    }
                }
            }
        }
    }

    var targetNode = document.querySelector('body');
    var config = { attributes: true, childList: true, subtree: true, characterData: true };
    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

    $.detectSwipe.threshold = 75;


})();