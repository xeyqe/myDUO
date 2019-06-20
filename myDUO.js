// ==UserScript==
// @name         myDUO
// @namespace    https://greasyfork.org/en/users/311245-xeyqe
// @version      1.0
// @description  Skips "You are correct" dialogs, binds swipeleft to CHECK button and adds counter in practise.
// @author       xeyqe
// @license      MIT
// @match        https://www.duolingo.com/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @require      https://hammerjs.github.io/dist/hammer.min.js
// ==/UserScript==

(function() {
    'use strict';

    var $ = jQuery;

    var element = document.querySelector('html')
    var hammertime = new Hammer(element);
    hammertime.on('swipeleft', function() {
        if (document.querySelector('._1Y5M_._2szQy') != null) {
            if ($('button').last()[0] != null) {
                $('button').last()[0].click();
            }
        }
    });

    function createNumber() {
        var node = document.createElement("p");
        node.setAttribute("id", "counter");
        var textnode = document.createTextNode("1");
        $(node).css({'position':'relative',
                     'right':'1%',
                     'top':'1%',
                     'paddingLeft':'3%'
                    });
        node.appendChild(textnode);

        if (document.querySelector('.Mlxjr') != null) {
            document.querySelector('.Mlxjr').appendChild(node);
        }
    }

    function startCreateNumber() {
        if (document.querySelector('#counter') == null) {
            createNumber();
        } else {
            document.getElementById('counter').innerText =
                parseInt(document.getElementById('counter').innerText) + 1;
        }
    }

    var isRunning = false;


    var targetNode = document.querySelector('#root');
    var config = { attributes: true, childList: true, subtree: true };

    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {
            if (mutation.addedNodes.length) {
                if (document.querySelector('._1Y5M_._2szQy') != null &&
                    !isRunning && document.querySelector('._1sntG') != null) {
                    isRunning = true;
                    observer2.observe(document.querySelector('._1sntG'), config);
                } else if (document.querySelector('._1Y5M_._2szQy') == null &&
                           isRunning) {
                    isRunning = false;
                    observer2.disconnect();
                }
            }
        }
    };
    var launchAlert = function() {
        var promise = new Promise(function(resolve) {
            if (document.querySelector('div._2GiCe._12wY2') != null) {
                var meaning = document.querySelector('div._2GiCe._12wY2').innerText;
                tempAlert(meaning,3000);
            }
            resolve();
        });
        return promise;
    }

    function autoClick() {
        var str = document.querySelector('h2._3H0e2._28jVs').innerText;
        if (str == "You are correct" ||
            str == "Správně" ||
            str.includes("Věnujte pozornost akcentu.")) {
            if ($('button').last()[0] != null) {
                launchAlert().then(function() {
                    $('button').last()[0].click();
                });
            }
        }
    }


    function tempAlert(msg,duration)
    {
        var el = document.createElement("div");
        el.setAttribute("style","position:fixed;top:1%;left:20%;background-color:black;color:white");
        el.innerHTML = msg;
        setTimeout(function(){
            el.parentNode.removeChild(el);
        },duration);
        document.body.appendChild(el);
    }

    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);


    /*######################################################*/
    var targetNode2 = document.querySelector('._1sntG');

    var callback2 = function(mutationsList, observer2) {
        for(var mutation of mutationsList) {
            if (mutation.addedNodes.length) {
                if (document.querySelector('._2Qmle._1sntG') != null ||
                    document.querySelector('.iKRq-._1sntG') != null) {
                    startCreateNumber();
                }
                if (document.querySelector('h2._3H0e2._28jVs') != null) {
                    autoClick();
                }
            }
        }
    }
    var observer2 = new MutationObserver(callback2);

})();