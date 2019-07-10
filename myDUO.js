// ==UserScript==
// @name         duolingo
// @version      2.8.2.5
// @description  Skips "You are correct" dialogs, binds swipeleft to CHECK button, adds counter to practise and words in answers where you don't write it only select from several inputs are rearrangable by drag and drop.
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @author       xeyqe
// @license      MIT
// @match        https://www.duolingo.com/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/sortablejs@1.10.0-rc3/Sortable.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/detect_swipe/2.1.4/jquery.detect_swipe.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var $ = jQuery;
    var mayI = true;
    //var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);

    var style = document.createElement('style');
    style.innerText = "._3B1cY:after, ._3B1cY:before{display:none}";
    document.getElementsByTagName('head')[0].appendChild(style);

    if (document.querySelector('._3giip') != null) {
        mistrKladivo('._3giip');
    }


    function mistrKladivo(destination) {
        var element = document.querySelector(destination);
        $(element).on('swipeleft', (function(){
            if (mayI)
                swipeFunc();
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
                        "color:#58a700;background:#b8f28b;z-index:100");
        $(el).attr('id', 'tempAlert');


        if (!(str2 == null && str3 != null))
            el.innerHTML = "<span><b>" + str1 + "</b2></span>";
        if (str2 != null)
            el.innerHTML += "<span>" + str2 + "</span>";
        if (str3 != null)
            el.innerHTML += "<span>" + str3 + "</span>";
        $(el).find('span').css({'display':'block','font-size':'0.7em','font-weight':'lighter'});

        timeout = removeTempAlert();

        $('#tempAlert')
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

        $('#tempAlert').on("click", ()=>{
            if (document.querySelector('#tempAlert').style.border == "") {
                document.querySelector('#tempAlert').style.border = "3px solid white";
                clearTimeout(timeout);
            }
            else {
                document.querySelector('#tempAlert').style.border = "";
                $('#tempAlert').fadeOut(1000, function() { $(this).remove(); });
            }});
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
        if (document.querySelector('div._2Qmle._1sntG') != null) {
            if ($('button').last()[0] != null) {
                launchAlert().then(function() {
                    $('button').last()[0].click();
                });
            }
        }
    }

    function getListOfButtons() {
        var list = Array.from(document.querySelector('._6HogY').children);
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
            $("._6HogY button").each(function () {
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
        var output = document.querySelector('._6HogY');
        output.addEventListener("touchstart", allowSwiping, false);
        output.addEventListener("touchend", disallowSwiping, false);

        Sortable.create(output, {
            onEnd: function (evt){ reclick(getListOfButtons()) },
            animation: 150
        });
    }

    function keyboardShortcuts() {
        var span = document.createElement('span');
        var list = $('._30i_q').find('._3vhCb');
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
                var node = document.querySelector('._6HogY');
                node.childNodes[node.childNodes.length-1].firstElementChild.click()
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
        if (window.innerWidth < 700)
            document.querySelector('._1Zqmf').insertBefore(el, $('._1Zqmf')[0].childNodes[0] || null);
        else
            document.body.appendChild(el);
        el = null;
    }

    var counterBool = true;

    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {


            if (mutation.type == "attributes") {

                if ((mutation.target.classList.value == '_2etd0 _2ESN4 _2arQ0 _2vmUZ _1X3l0 eJd0I _3yrdh _2wXoR _1AM95 _1dlWz mucpb' &&
                   document.querySelector('._1uJnx') != null) ||
                    (mutation.target.classList.value == '_3N_rN oNqWF _3hso2 _2vmUZ _1X3l0 eJd0I _3yrdh _2wXoR _1AM95 _2PUh7 H7AnT _3Ry1f' &&
                   document.querySelector('button._3MoOc._2etd0._2ESN4._2arQ0._2vmUZ._1X3l0.eJd0I._3yrdh._2wXoR._1AM95._1dlWz.mucpb') != null)) {
                    counterBool = false;
                }

                if (mutation.attributeName == "class") {
                    if (mutation.target.classList.value == 'cVLwd _2arQ0 _2vmUZ _1X3l0 eJd0I _3yrdh _2wXoR _1AM95 _1dlWz mucpb _3Ry1f' &&
                        document.querySelector('.cVLwd._2arQ0._2vmUZ._1X3l0.eJd0I._3yrdh._2wXoR._1AM95._1dlWz.mucpb._3Ry1f').innerText.includes('...') &&
                        el != null) {
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

                if (mutation.addedNodes[0].contains(document.querySelector('.KekRP._3Txod._1yRbM'))) {
                    autoClick();
                    if (counterBool)
                        changeCounter('right');
                    else
                        counterBool = true;
                }
                else if (mutation.addedNodes[0].contains(document.querySelector('.KekRP._3Txod._2KlCX'))) {
                    if (counterBool)
                        changeCounter('bad');
                    else
                        counterBool = true;
                }
                else if (mutation.addedNodes[0].contains(document.querySelector('._6HogY'))) {
                    draggable();
                    if (!$.detectSwipe.enabled) keyboardShortcuts();
                }

                if (mutation.addedNodes[0].classList.value == '_1Y5M_ _2szQy _2P2ug _3T--_ AuoX4 _2EF-o' &&
                           mutation.addedNodes[0].contains(document.querySelector('textarea')) ||
                   mutation.addedNodes[0].contains(document.querySelector('input'))) {
                    $('textarea, input')[0].focus();
                }

                if (mutation.addedNodes[0].contains(document.querySelector('._1Zqmf')) && el!=null) {
                    console.log('throwing');
                    throwNotif();
                }



                if (mutation.addedNodes[0].contains(document.querySelector('._3giip'))) {
                    mistrKladivo('._3giip');
                }

                if (mutation.addedNodes[0].classList.value == 'Mlxjr' &&
                    mutation.addedNodes[0].contains(document.querySelector('.MAF30'))) {
                    createNumber();
                }
            }

            if (mutation.removedNodes.length && $(mutation.removedNodes[0]).find('._6HogY').length) {
                document.onkeyup = function (e) {
                    return false;
                }
            }
        }
    }

    var targetNode = document.querySelector('#root');
    var config = { attributes: true, childList: true, subtree: true, characterData: true };
    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

})();