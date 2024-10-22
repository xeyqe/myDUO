// ==UserScript==
// @name         Duolingo Improver
// @version      3.0.8.2
// @description  For description visit https://github.com/xeyqe/myDUO/blob/master/README.md
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @author       xeyqe
// @license      MIT
// @match        http://duolingo.com/*
// @match        https://duolingo.com/*
// @match        http://*.duolingo.com/*
// @match        https://*.duolingo.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js
// @grant        GM_getResourceText
// ==/UserScript==

let style;
let head;
let myArray = [];
let el;
let label;

const father = '._3yE3H';

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
    "    overflow-y: scroll;",
    "    max-height: 100%;",
    "    z-index: 1000;",
    "    scrollbar-width: none;",
    "    display: flex;",
    "    flex-direction: column;",
    "    gap: .2rem;",
    "}",
    "[data-test=challenge-tap-token] {",
    "    text-align: center;",
    "}",
    "._2LMXW:after {",
    "    height: 0;",
    "}",
    ".panel.hide {",
    "    transform: translateX(calc(-100% + .5rem));",
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
    "   ._3v4ux {",
    "       margin: auto !important;",
    "   }",
    "}",
    "@media (max-width: 700px) {",
    "    .uH5m4 {",
    "        min-height: fit-content;",
    "    }",
    "    .panel.show.shorter {",
    "        max-height: 83vh;",
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
    "}",
    ".I-Avc, ._1zcW8 {",
    "   width: 100%;",
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
    "._2FZ31 {",
    "    position: fixed;",
    "    width: 100%;",
    "    padding: .5rem 1rem",
    "}",
    "._3gjcv {",
    "    padding-top: 103px !important;",
    "}",
    "._2plWZ {",
    "    grid-gap: 0px;",
    "}",
    "._3v4ux {",
    "    display: flex;",
    "    gap: .5rem;",
    "    align-items: center",
    "}",
    "._1_a9o {",
    "    width: 100%;",
    "}",
    "@media (min-width: 700px) {",
    "    ._1_a9o {",
    "        padding: 0;",
    "    }",
    "    ._3v4ux {",
    "        margin-left: 1rem;",
    "        margin-right: 1rem;",
    "    }",
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
    "}",
    "._2VM4a {",
    "    padding-top: 0;",
    "}",
    ".mAxZF {", // stories panel
    "    position: fixed;",
    "    width: 100%;",
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

let lightCss = `--color-snow: 255, 255, 255; --color-snow-always-light: 255, 255, 255; --color-snow-always-dark: 19, 31, 36; --color-polar: 247, 247, 247; --color-swan: 229, 229, 229; --color-swan-always-light: 229, 229, 229; --color-swan-always-dark: 55, 70, 79; --color-hare: 175, 175, 175; --color-hare-always-light: 175, 175, 175; --color-wolf: 119, 119, 119; --color-eel: 75, 75, 75; --color-squid: 235, 227, 227; --color-walking-fish: 255, 223, 224; --color-flamingo: 255, 178, 178; --color-pig: 245, 164, 164; --color-crab: 255, 120, 120; --color-cardinal: 255, 75, 75; --color-fire-ant: 234, 43, 43; --color-canary: 255, 245, 211; --color-duck: 251, 229, 109; --color-bee: 255, 200, 0; --color-bee-always-dark: 255, 199, 0; --color-lion: 255, 177, 0; --color-fox: 255, 150, 0; --color-cheetah: 255, 206, 142; --color-monkey: 229, 162, 89; --color-camel: 231, 166, 1; --color-guinea-pig: 205, 121, 0; --color-grizzly: 187, 113, 73; --color-sea-sponge: 215, 255, 184; --color-turtle: 165, 237, 110; --color-owl: 88, 204, 2; --color-tree-frog: 88, 167, 0; --color-peacock: 0, 205, 156; --color-iguana: 221, 244, 255; --color-anchovy: 210, 228, 232; --color-beluga: 187, 242, 255; --color-moon-jelly: 122, 240, 242; --color-blue-jay: 132, 216, 255; --color-macaw: 28, 176, 246; --color-whale: 24, 153, 214; --color-humpback: 43, 112, 201; --color-narwhal: 20, 83, 163; --color-manta-ray: 4, 44, 96; --color-starfish: 255, 134, 208; --color-beetle: 206, 130, 255; --color-betta: 144, 105, 205; --color-butterfly: 111, 78, 161; --color-dragon: 204, 52, 141; --color-starling: 92, 108, 252; --color-martin: 71, 85, 223; --color-grackle: 167, 160, 255; --color-honeycreeper: 193, 187, 255; --color-deep-starling: 34, 33, 81; --color-deep-martin: 16, 15, 62; --color-legendary-foreground: 140, 65, 3; --color-stardust: 199, 255, 254; --color-cosmos: 60, 77, 255; --color-nebula: 63, 34, 236; --color-nova: 207, 23, 200; --color-gamma: 38, 246, 99; --color-starlight: 38, 138, 255; --color-quasar: 252, 85, 255; --color-celestia: 255, 255, 255; --color-eclipse: 0, 4, 55; --color-black: 0, 0, 0; --color-aqua: 56, 238, 255; --color-aqua-always-light: 56, 238, 255; --color-ocean: 0, 124, 143; --color-seafoam: 158, 224, 233; --color-ice: 225, 253, 255; --color-max-shadow: 20, 208, 225; --color-black-white: 0, 0, 0; --color-diamond-stat: 86, 219, 226; --color-mask-green: 137, 226, 25; --color-pearl-stat: 255, 170, 222; --color-snow-dark-swan: 255, 255, 255; --color-black-text: 60, 60, 60; --color-blue-space: 11, 62, 113; --color-juicy-blue-space: 10, 74, 130; --color-juicy-blue-space-light: 35, 83, 144; --color-gold: 250, 169, 25; --color-gray-text: 153, 153, 153; --color-orange: 255, 157, 0; --color-diamond-highlight: 231, 251, 251; --color-diamond: 56, 208, 208; --color-banana: 255, 176, 32; --color-cloud: 207, 207, 207; --color-cloud-light: 221, 221, 221; --color-cloud-lightest: 240, 240, 240; --color-kiwi: 122, 199, 12; --color-kiwi-dark: 93, 151, 9; --color-kiwi-light: 142, 224, 0; --color-facebook: 59, 89, 152; --color-facebook-dark: 45, 67, 115; --color-google: 66, 133, 244; --color-twitter: 29, 161, 242; --color-hv-light-peach: 241, 218, 179; --color-hv-peach: 219, 186, 131; --color-hv-light-orange: 255, 177, 64; --color-hv-orange: 204, 121, 0; --color-hv-brown: 140, 90, 17; --color-streak-panel-extended-background: 255, 150, 0; --color-streak-panel-friend-background: 255, 95, 0; --color-streak-panel-frozen-background: 221, 244, 255; --color-streak-panel-frozen-flair-background: 132, 216, 255; --color-streak-panel-frozen-subtitle: 28, 176, 246; --color-streak-panel-frozen-text: 132, 216, 255; --color-streak-panel-frozen-topbar-text: 24, 153, 214; --color-streak-panel-streak-society-background: 255, 200, 0; --color-streak-panel-streak-society-background-always-dark: 215, 148, 51; --color-streak-panel-streak-society-text: 205, 121, 0; --color-streak-panel-unextended-heading-text: 235, 195, 127; --color-streak-panel-unextended-heading-background: 255, 245, 211; --color-streak-panel-unextended-topbar-text: 235, 195, 127; --color-streak-panel-milestone-gradient-start: 255, 147, 58; --color-streak-panel-milestone-gradient-end: 255, 200, 0; --color-streak-society-dark-orange: 255, 151, 1; --color-streak-society-light-orange: 255, 179, 1; --color-friends-quest-own-incomplete: 175, 175, 175; --color-friends-quest-friend-incomplete: 145, 145, 145; --color-black-text-always-light: 60, 60, 60; --color-cardinal-always-light: 255, 75, 75; --color-cowbird: 174, 104, 2; --color-eel-always-light: 75, 75, 75; --color-fox-always-light: 255, 150, 0; --color-fire-ant-always-light: 234, 43, 43; --color-grizzly-lite: 220, 143, 71; --color-guinea-pig-always-light: 205, 121, 0; --color-iguana-always-light: 221, 244, 255; --color-macaw-always-light: 28, 176, 246; --color-owl-always-light: 88, 204, 2; --color-polar-always-light: 247, 247, 247; --color-sea-sponge-always-light: 215, 255, 184; --color-tree-frog-always-light: 88, 167, 0; --color-turtle-always-light: 165, 237, 110; --color-walking-fish-always-light: 255, 223, 224; --color-wolf-always-light: 119, 119, 119; --color-cardinal-always-dark: 238, 85, 85; --color-eel-always-dark: 241, 247, 251; --color-hare-always-dark: 82, 101, 109; --color-macaw-always-dark: 73, 192, 248; --color-owl-always-dark: 147, 211, 51; --color-polar-always-dark: 32, 47, 54; --color-wolf-always-dark: 220, 230, 236; --color-rookie: 0, 175, 133; --color-explorer: 255, 100, 191; --color-traveler: 255, 145, 83; --color-trailblazer: 154, 143, 232; --color-adventurer: 96, 12, 199; --color-discoverer: 111, 44, 57; --color-daredevil: 46, 83, 138; --color-navigator: 9, 47, 119; --color-champion: 255, 110, 53; --color-daily_refresh: 0, 148, 255; --color-dark-mode-locked-path-section-text-color: 82, 101, 109; --color-rookie-progress-bar: 0, 198, 150; --color-explorer-progress-bar: 255, 138, 207; --color-traveler-progress-bar: 255, 167, 106; --color-trailblazer-progress-bar: 169, 157, 254; --color-adventurer-progress-bar: 122, 13, 199; --color-discoverer-progress-bar: 131, 50, 65; --color-daredevil-progress-bar: 54, 98, 165; --color-navigator-progress-bar: 12, 57, 141; --color-champion-progress-bar: 255, 129, 80; --color-daily_refresh-progress-bar: 28, 160, 255; --color-course-complete-cta: 120, 219, 224; --color-course-complete-cta-border: 94, 201, 204; --color-bea-secondary: 24, 153, 214; --color-eddy-secondary: 234, 43, 43; --color-gilded-secondary: 231, 166, 1; --color-lily-secondary: 165, 104, 204; --color-vikram-secondary: 163, 42, 113; --color-zari-secondary: 204, 107, 166; --color-oscar-secondary: 0, 164, 125; --color-falstaff-secondary: 150, 90, 58; --color-bea-radio: 20, 123, 172; --color-duo-radio: 62, 143, 1; --color-eddy-radio: 179, 53, 53; --color-falstaff-radio: 131, 79, 51; --color-lin-lucy-radio: 179, 105, 0; --color-lily-radio: 144, 91, 179; --color-vikram-radio: 143, 36, 99; --color-zari-radio: 179, 94, 146; --color-oscar-radio: 0, 144, 109; --color-bea-junior-shine: 67, 190, 248; --color-duo-shine: 114, 214, 39; --color-eddy-shine: 255, 105, 105; --color-falstaff-shine: 227, 165, 108; --color-lily-shine: 214, 150, 255; --color-lin-lucy-shine: 255, 168, 44; --color-oscar-shine: 63, 217, 181; --color-vikram-shine: 214, 90, 162; --color-zari-shine: 255, 158, 217; --color-super-background-secondary: 26, 30, 76; --color-super-gradient-background: 12, 47, 113; --color-super-gradient-top-halo: 12, 76, 70; --color-super-gradient-bottom-halo: 76, 29, 115; --color-gold-shine: 255, 231, 0; --color-legendary-dark-background: 24, 24, 24; --color-roseate: 223, 75, 162; --color-rosefinch: 180, 28, 117; --color-bluebird: 3, 144, 211; --color-cotinga: 121, 58, 227; --color-sabrewing: 165, 112, 255; --color-blueberry: 17, 82, 167; --color-ether: 60, 89, 141; --color-diamond-tournament-purple: 161, 161, 238; --color-diamond-tournament-reaction: 118, 163, 231; --color-yir-page0: 221, 244, 255; --color-yir-page1: 227, 255, 235; --color-yir-page1-shadow: 19, 31, 36; --color-yir-page3-shadow: 187, 172, 252; --color-yir-page4-shadow: 143, 219, 255; --color-yir-page5-shadow: 255, 183, 80; --color-super-gradient-green-variant1: 38, 255, 85; --color-super-gradient-blue-variant1: 38, 139, 255; --color-super-gradient-pink-variant1: 252, 85, 255; --color-super-gradient-purple-variant1: 17, 34, 181; --color-unknown-001e2d: 0, 30, 45; --color-unknown-0047a4: 0, 71, 164; --color-unknown-0087d0: 0, 135, 208; --color-unknown-00aff9: 0, 175, 249; --color-unknown-013047: 1, 48, 71; --color-unknown-048fd1: 4, 143, 209; --color-unknown-0e0f10: 14, 15, 16; --color-unknown-0e3d79: 14, 61, 121; --color-unknown-172071: 23, 32, 113; --color-unknown-280378: 40, 3, 120; --color-unknown-3ebbf6: 62, 187, 246; --color-unknown-655ebb: 101, 94, 187; --color-unknown-696cee: 105, 108, 238; --color-unknown-7c0000: 124, 0, 0; --color-unknown-89e219: 137, 226, 25; --color-unknown-935051: 147, 80, 81; --color-unknown-959595: 149, 149, 149; --color-unknown-a2a2a2: 162, 162, 162; --color-unknown-a3dbeb: 163, 219, 235; --color-unknown-a4dffb: 164, 223, 251; --color-unknown-aaa: 170, 170, 170; --color-unknown-d087ff: 208, 135, 255; --color-unknown-d9d9d9: 217, 217, 217; --color-unknown-ddd: 221, 221, 221; --color-unknown-de8029: 222, 128, 41; --color-unknown-e3e3e3: 227, 227, 227; --color-unknown-e4ffff: 228, 255, 255; --color-unknown-ed8c01: 237, 140, 1; --color-unknown-f3484e: 243, 72, 78; --color-unknown-f4fafe: 244, 250, 254; --color-unknown-fbdec5: 251, 222, 197; --color-unknown-ffc700: 255, 199, 0; --color-unknown-fff2aa: 255, 242, 170; --color-unknown-fffbef: 255, 251, 239; --app-offset: 0px;`;

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

let touched = false;
function swiper(el, direction, func, forbidden) {
    if (!el) return;
    let touchstartX = null;
    let touchstartY = null;
    let touchendX = null;
    let touchendY = null;

    el.addEventListener(
        'touchstart',
        function (event) {
            if (event.touches.length > 1) {
                touchstartX = null;
                touchstartY = null;
                touchendX = null;
                touchendY = null;
                return;
            }
            touchstartX = event.touches[0].pageX;
            touchstartY = event.touches[0].pageY;
        }
    );

    el.addEventListener('touchend', function (event) {
        if (event.touches.length > 1 || touchstartX === null) {
            touchstartX = null;
            touchstartY = null;
            touchendX = null;
            touchendY = null;
            return;
        };
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

        if (direction === "right") {
            if (touchstartX - touchendX < -25 && absX - absY > 70) {
                func(event);
            }
        } else if (direction === "left") {
            if (touchstartX - touchendX > 25 && absX - absY > 70) {
                func(event);
            }
        } else if (direction === "down") {
            if (touchstartY - touchendY < -25 && absY - absX > 70) {
                func(event);
            }
        } else if (direction === "up") {
            if (touchstartY - touchendY > 25 && absY - absX > 70) {
                func(event);
            }
        }
    });
}

function swipeFunc(event) {
    if (mayISwipe(event)) {
        if (!document.querySelector('.show')) {
            document.querySelector('[data-test="player-next"]')?.click();
        } else if (!document.querySelector('.hide')) {
            showHidePanel();
        }
    }
}

function createNumber() {
    let node = document.createElement("div");
    node.setAttribute("id", "counter");

    node.innerHTML =
        "<span id=\"wrong\" style=\"color:red\">0</span>/<span id=\"right\" style=\"color:#79c822\">0</span>";

    if (document.querySelector('._3v4ux')) {
        document.querySelector('._3v4ux').appendChild(node);
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
    if (window.innerWidth > 700) return;
    cloneDraggable();
    const el = document.querySelector('#new-draggable ._2-F7v');
    const buttons = Array.from(document.querySelector('#new-draggable [data-test="word-bank2"]').querySelectorAll('button'));
    buttons.forEach(el => {
        el.addEventListener('click', () => sortableBuClickEventFn(el));
    });

    Sortable.create(el, {
        onEnd: function (evt) {
            if (evt.oldIndex !== evt.newIndex) reclick(evt.newIndex);
            else evt.item.querySelector('button').click();
        },
        animation: 150,
    });
}

function cloneDraggable() {
    const oldEl = document.querySelector('.Sa7Uw');
    const newEl = oldEl.cloneNode(true);
    newEl.querySelector('[data-test="word-bank"]').setAttribute('data-test', 'word-bank2');
    newEl.id = 'new-draggable';
    oldEl.id = 'old-draggable';
    oldEl.parentElement.appendChild(newEl);
    oldEl.style.display = 'none';

    const oldBu = document.querySelector('[data-test="player-next"]')
    const newBu = oldBu.cloneNode(true);
    newBu.id = 'new-bu';
    newBu.addEventListener('click', () => setRealDraggable());
    newBu.setAttribute('disabled', false);

    oldBu.parentElement.insertBefore(newBu, oldBu);
    oldBu.setAttribute('disabled', true);
    oldBu.style.display = 'none';
    oldBu.id = 'old-bu';
}

function sortableBuClickEventFn(el) {
    if (el.getAttribute('aria-disabled') === 'true') return;
    if (!document.querySelectorAll('#new-draggable ._2-F7v button').length) {
        document.querySelector('#new-bu').classList.remove('_1NM1Q');
        document.querySelector('#new-bu').removeAttribute('disabled');
    }
    const parent = el.parentElement.parentElement.cloneNode(true);
    document.querySelector('#new-draggable ._2-F7v').appendChild(parent);
    el.classList.add('_2wryV');
    el.classList.remove('_3fmUm');
    el.setAttribute('aria-disabled', true);

    parent.querySelector('button').addEventListener('click', () => {
        if (document.querySelectorAll('#new-draggable ._2-F7v button').length === 1) {
            document.querySelector('#new-bu').classList.add('_1NM1Q');
        }
        el.classList.add('_3fmUm');
        el.classList.remove('_2wryV');
        el.setAttribute('aria-disabled', false);
        parent.remove();
    });
    document.querySelector(`#old-draggable [data-test="${el.getAttribute('data-test')}"]`).click()
    setTimeout(() => {
        document.querySelector('#old-draggable .eWdJ5 button').click()
    });
}

async function setRealDraggable() {
    const ar = Array.from(document.querySelector('#new-draggable ._2-F7v').querySelectorAll('button')).map(it => it.textContent);
    if (!ar.length) return;
    const buttons = Array.from(document.querySelector('#old-draggable [data-test="word-bank"]').querySelectorAll('button'));
    for (const it of ar) {
        buttons.find(el => el.getAttribute('aria-disabled') !== 'true' && el.textContent === it).click();
        await new Promise(resolve => setTimeout(resolve, 0));
    };
    const bu = document.querySelector('#old-bu');
    bu.removeAttribute('disabled');
    await new Promise(resolve => setTimeout(resolve, 100));
    bu.click();
    bu.style.display = 'inline-flex';
    document.querySelector('#new-bu').remove();
    bu.removeAttribute('id');
}

function togglePanel() {
    const panel = document.querySelector('.panel');
    if (panel.classList.contains('show')) {
        panel.classList.remove('show');
        panel.classList.add('hide');
    } else {
        panel.classList.add('show');
        panel.classList.remove('hide');
    }
}

function createSlider() {
    const panel = document.createElement("div");

    panel.setAttribute('class', 'panel hide');

    document.querySelector(father).appendChild(panel);

    document.querySelector(father).addEventListener('mousedown', function (event) {
        const isClickInside = document.querySelector('.panel').contains(event.target) || panel === event.target;

        if (!isClickInside) {
            if (document.querySelector('.show')) showHidePanel();
        } else {
            if (document.querySelector('.hide')) showHidePanel();
        }
    });
    document.onkeyup = function (e) {
        if (e.code === 'Escape' && document.querySelector('.panel.show'))
            togglePanel();
    }
}

function showHidePanel(event) {
    if (mayISwipe(event)) {
        togglePanel();
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
            question = Array.from(document.querySelectorAll('[aria-hidden=true]')).map(el => el.textContent).join('');
            if (document.querySelector('[data-test="challenge-translate-input"]')) {
                yourAnswer = document.querySelector('[data-test="challenge-translate-input"]').textContent;
            } else if (document.querySelector('[data-test="word-bank"]')) {
                const el = document.querySelector("[data-test*=challenge-tap-token]").parentElement.parentElement.parentElement;
                yourAnswer = Array.from(el.querySelectorAll('button')).map(el => el.textContent).join(' ');
            }
        } else if (document.querySelector('[data-test="challenge challenge-listen"]')) {
            yourAnswer = document.querySelector('[data-test="challenge-translate-input"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-listenTap"]')) {
            yourAnswer = Array.from(document.querySelector('._2-F7v').querySelectorAll('button')).map(it => it.textContent).join(' ')
        } else if (document.querySelector('[data-test="challenge challenge-match"]')) {
            if (matchTexts.line1) {
                question = matchTexts.line1;
                yourAnswer = matchTexts.line2;
                matchTexts.line1 = '';
                matchTexts.line2 = '';
            } else {
                const ar = Array.from(document.querySelectorAll('[data-test="challenge-tap-token-text"]')).map(it => it.textContent);
                question = ar.slice(0, 5).join(' | ');
                yourAnswer = ar.slice(5).join(' | ');
            }
        } else if (document.querySelector('[data-test="challenge challenge-speak"]')) {
            question = document.querySelector('span[aria-hidden=true]').parentElement.parentElement.textContent;
        } else if (document.querySelector('[data-test="challenge challenge-judge"]')) {
            question = document.querySelector('._3-JBe').textContent;
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"]').innerText;
        } else if (document.querySelector('[data-test="challenge challenge-completeReverseTranslation"]')) {
            question = document.querySelector('[data-test="challenge-text-input"]').parentElement.parentElement.textContent;
            yourAnswer = document.querySelector('[data-test="challenge-text-input"]').value;
        } else if (document.querySelector('[data-test="challenge challenge-selectTranscription"]')) {
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"]').innerText;
        } else if (document.querySelector('[data-test="challenge challenge-name"]')) {
            const el = document.querySelector('[data-test="challenge-choice"][aria-checked="true"]');
            const article = el ? el.querySelector('[data-test="challenge-judge-text"]').textContent + ' ' : '';
            const word = document.querySelector('[data-test="challenge-text-input"]').value;
            yourAnswer = `${article}${word}`;
        } else if (document.querySelector('[data-test="challenge challenge-assist"]')) {
            question = document.querySelector('[aria-label="choice"]')?.previousElementSibling?.textContent;
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"] [data-test="challenge-judge-text"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-listenComplete"]')) {
            question = document.querySelector('[data-test="challenge-text-input"]').parentElement.parentElement.textContent;
            yourAnswer = document.querySelector('[data-test="challenge-text-input"]').value;
            if (question.includes(`_${yourAnswer}_`)) yourAnswer = null;
        } else if (document.querySelector('[data-test="challenge challenge-listenMatch"]')) {
            yourAnswer = Array.from(document.querySelectorAll('[data-test="challenge-tap-token-text"]')).map(it => it.textContent).join(', ')
        } else if (document.querySelector('[data-test="challenge challenge-listenIsolation"]')) {
            question = Array.from(document.querySelector('[aria-hidden="true"]').parentElement.children).map(it => {
                const txt = it.textContent;
                return it.classList.contains('_3ykJt') ? `_${txt}_` : txt;
            }).join('').replace(/__/g, '');
        } else if (document.querySelector('[data-test="challenge challenge-select"]')) {
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"] .AKwIn')?.textContent;
        } else if (document.querySelector('[data-test="challenge challenge-definition"]')) {
            yourAnswer = document.querySelector('[aria-checked="true"] [data-test="challenge-judge-text"]').textContent;
            question = document.querySelector('[role="radiogroup"]').previousElementSibling.textContent;
        } else if (document.querySelector('[data-test="challenge challenge-tapComplete"]')) {
            question = Array.from(document.querySelectorAll('[aria-hidden="true"]')).map(el => el.textContent).join('').replace(/\s([,.!?\s])/g, ' ___$1');;
            const el = document.querySelector('[aria-hidden="true"]').parentElement.parentElement.parentElement;
            const ar = Array.from(el.querySelectorAll('[data-test="challenge-tap-token-text"]')).map(it => it.innerText).filter(i => i);
            ar.forEach(it => question = question.replace('___', `_${it}_`));
        } else if (document.querySelector('[data-test="challenge challenge-dialogue"]')) {
            footerHidden = localStorage.getItem('footerHidden') === "true"
            if (footerHidden) hideShowFooter(true);
            question = document.querySelector('[data-test="hint-token"]')?.parentElement?.parentElement?.textContent;
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"]').querySelector('[data-test="challenge-judge-text"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-gapFill"]')) {
            const ar = Array.from(document.querySelectorAll('[aria-hidden="true"]'));
            question = ar.map(el => {
                const txt = el.textContent;
                return el.classList.contains('_1aMpd') ? `_${txt}_` : txt
            }).join('').replace(/__/g, '');
        } else if (document.querySelector('[data-test="challenge challenge-partialReverseTranslate"]')) {
            question = document.querySelector('span[aria-hidden=true]').parentElement.parentElement.textContent;
            yourAnswer = Array.from(document.querySelector('label').children).filter(it => !it.classList.contains('_31xxw')).map(it => it.textContent).join('');
        } else if (document.querySelector('[data-test="challenge challenge-readComprehension"]')) {
            footerHidden = localStorage.getItem('footerHidden') === "true"
            if (footerHidden) hideShowFooter(true);
            question = document.querySelector('[aria-hidden=true]').parentElement.parentElement.textContent;
            const selEl = document.querySelector('[data-test="challenge-choice"][aria-checked="true"]');
            question2 = selEl.parentElement.previousElementSibling.textContent;
            yourAnswer = selEl.querySelector('[data-test="challenge-judge-text"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-name"]')) {
            question = document.querySelector('[data-test="challenge-header"]').textContent;
            yourAnswer = document.querySelector('[data-test="challenge-text-input"]').value;
        } else if (document.querySelector('[data-test="challenge challenge-listenComprehension"]')) {
            question = document.querySelector('[data-test="challenge-choice"][aria-checked="true"]').parentElement.previousElementSibling.textContent;
            yourAnswer = document.querySelector('[data-test="challenge-choice"][aria-checked="true"] [data-test="challenge-judge-text"]').textContent;
        } else if (document.querySelector('[data-test="challenge challenge-listenSpeak"]')) {
            question = document.querySelector('span [aria-hidden="true"]').parentElement.parentElement.parentElement.textContent;
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

        const review = document.querySelector('#session\\/PlayerFooter').querySelector('[data-test="blame blame-incorrect"], [data-test="blame blame-correct"]');
        if (review) {
            const node = review.children[1].children[0].cloneNode(true);
            divMain.appendChild(node);
        }

        if (color === 'right') {
            if (document.querySelector('.panel').previousElementSibling.querySelector('[data-test="blame blame-correct"]')) {
                tempAlert(document.querySelector('.panel').previousElementSibling.querySelector('[data-test="blame blame-correct"]').children[1].firstChild.firstChild);
            }
        }
        resolve();
    });
    return promise;

}

function mayISwipe(event) {
    if (!event) return true;
    const el = document.querySelector('#new-draggable .eWdJ5');
    if (el?.contains(event.target)) return false;
    return true;
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
        const parent = document.querySelector('[data-test="close-button-stories"]').parentElement;
        parent.appendChild(bu);
        document.querySelector('.kbjat').parentElement.prepend(parent);
    } else {
        bu.innerText = testingAuto ? 'A' : 'M';
        bu.addEventListener('click', () => {
            testingAuto = !testingAuto;
            document.querySelector('#my-autoclick-bu').innerText = testingAuto ? 'A' : 'M';
            localStorage.setItem('autoclick', testingAuto ? 'yes' : 'no');
        });
        document.querySelector('._3v4ux').appendChild(bu);
    }
}

function createStoriesProgressShower() {
    const progressEl = document.createElement('SPAN');
    progressEl.innerText = document.querySelector('[role="progressbar"]').getAttribute('aria-valuenow') * 100 + '%';
    progressEl.style.cssText = "z-index: 10; margin-left: .5rem;"
    progressEl.id = 'bugibugi';
    const target = document.querySelector('[data-test="close-button-stories"]').parentElement;
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
    const el = document.querySelector('#session\\/PlayerFooter').parentElement.parentElement;
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
            if (mutation.addedNodes?.[0]?.nodeType === 1) {
                // if (mutation.addedNodes[0].nodeName === 'SECTION') {
                //     if (mutation.addedNodes[0].attributes.hasOwnProperty('data-test')) {
                //         hideInSection(mutation.addedNodes[0])
                //     }
                //     // mutation.target.parentElement.parentElement.parentElement.classList.add('hidden-item');
                // } else
                if (
                    mutation.addedNodes[0] === document.querySelector('[data-test=skill-popout]') ||
                    mutation.addedNodes?.[0]?.querySelector('[data-test="skill-popout"]')
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

const matchTexts = {
    line1: '',
    line2: ''
}
function setLernerMatchObserver() {
    const targetNode = document.querySelector('[style*="--match-challenge-rows"]');
    const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.attributeName !== 'class' || mutation.target.nodeName !== 'BUTTON') continue;
            const buttons = Array.from(document.querySelectorAll('[data-test*="-challenge-tap-token"]'));
            const txt = mutation.target.textContent;
            if (buttons.indexOf(mutation.target) < (buttons.length / 2))
                matchTexts.line1 = matchTexts.line1 ? `${matchTexts.line1} | ${txt}` : txt;
            else
                matchTexts.line2 = matchTexts.line2 ? `${matchTexts.line2} | ${txt}` : txt;
        }
    }
    const config = { attributes: true, childList: true, subtree: true, characterData: false };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

async function setLearnObserver() {
    hideShowFooter(footerHidden);
    if (
        document.querySelector('[data-test="word-bank"]') &&
        document.querySelector('[data-test="challenge challenge-translate"], [data-test="challenge challenge-listenTap"]')
    ) {
        draggable();
        // setDraggableObserver();
    } else if (document.querySelector('[data-test="challenge challenge-dialogue"], [data-test="challenge challenge-readComprehension"]')) {
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
            if (mutation.addedNodes?.[0]?.nodeType === 1) {
                if (mutation.addedNodes?.[0]?.querySelector('[data-test="word-bank"]')) {
                    setTimeout(() => {
                        const selector = '[data-test="challenge challenge-translate"], [data-test="challenge challenge-listenTap"]';
                        if (!document.querySelector(selector)) return;
                        draggable();
                    }, 500);
                    // setDraggableObserver();
                } else if (mutation.addedNodes?.[0]?.querySelector('[data-test="challenge challenge-dialogue"], [data-test="challenge challenge-readComprehension"]')) {
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
                } else if (mutation.addedNodes?.[0]?.querySelector('[data-test="challenge challenge-match"]')) {
                    setLernerMatchObserver();
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
                if (footerHidden && document.querySelector('[role=progressbar]') && document.querySelector('[role=progressbar]').getAttribute('aria-valuenow') !== '1')
                    hideShowFooter(true);
            }
            if (mutation?.addedNodes?.[0]?.nodeType !== 1) continue;
            if (mutation.addedNodes?.[0]?.querySelector('[data-test="blame blame-correct"]')) {
                if (!document.querySelector('[data-test="blame blame-correct"]').querySelector('._20psa')) { // can't listen/speak skip
                    neco('right').then(() => {
                        changeCounter('right');
                        if (document.querySelector('#my-autoclick-bu').innerText === 'A') {
                            document.querySelector('[data-test="player-next"]')?.click();
                        } else {
                            hideShowFooter(false);
                        }
                    });
                }
            } else if (mutation.addedNodes?.[0]?.querySelector('[data-test="blame blame-incorrect"]')) {
                if (!document.querySelector('[data-test="challenge challenge-speak"]')) {
                    neco('wrong').then(() => {
                        changeCounter('bad');
                        hideShowFooter(false);
                    });
                }
            }
        }
    }
    const targetNode2 = document.querySelector('#session\\/PlayerFooter').parentElement.parentElement;
    const config2 = { attributes: true, childList: true, subtree: true, characterData: false };
    const observer2 = new MutationObserver(callback2);
    observer2.observe(targetNode2, config2);

    const progressBarCallback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.attributeName === 'aria-valuenow' && mutation.target.getAttribute('aria-valuenow') === '1') {
                const panel = document.querySelector('.panel');
                panel.classList.add('show');
                panel.classList.remove('hide');
                hideShowFooter(false);
                document.onkeyup = null;
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

function addCustomDarkModeOption() {
    const selectEl = document.querySelector('[data-test="dark-mode"]');
    if (!selectEl || selectEl.textContent.includes('Custom')) return;

    if (localStorage.getItem('myDuoTheme') === 'true') document.querySelector('._1GMnI').innerText = 'Custom';
    const el = selectEl.querySelector('option[value="off"]').cloneNode(false);
    el.value = 'custom';
    el.innerText = 'Custom';

    // click events don't work so...
    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (!selectEl.parentElement.firstElementChild.innerText) {
                document.querySelector('html').setAttribute("data-duo-theme", "light");
                selectEl.parentElement.firstElementChild.textContent = 'Custom';
                localStorage.setItem('myDuoTheme', 'true');
                document.querySelector('html').setAttribute('style', lightCss);
                document.getElementsByTagName("html")[0].appendChild(style);
                const st = localStorage.getItem('duo.darkMode');
                if (st) localStorage.setItem('duo.darkMode', st.replace('custom', 'off'));
            } else if (selectEl.parentElement.firstElementChild.textContent !== 'Custom') {
                if (selectEl.parentElement.firstElementChild.textContent === 'Off') {
                    lightCss = document.querySelector('html').getAttribute('style');
                }
                localStorage.setItem('myDuoTheme', 'false');
                document.querySelector('#darkDUOmobile')?.remove();
            }
        }
    }
    const targetNode = selectEl.parentElement.firstElementChild;
    const config = { attributes: true, childList: true, subtree: true, characterData: true };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    selectEl.appendChild(el);
}

function restoreConsoleLog() {
    if (!document.querySelector('#my-iframe')) {
        var i = document.createElement('iframe');
        i.id = 'my-iframe';
        i.style.display = 'none';
        document.body.appendChild(i);
    }
    window.console = i.contentWindow.console;
}

(function () {
    'use strict';

    var el = document.createElement('DIV');
    el.id = 'mybpwaycfxccmnp-dblt-backdrop-filter'
    document.querySelector('html').insertBefore(el, document.querySelector('body'))

    window.addEventListener('load', function () {
        addThemes();

        if (document.querySelector('[data-test="skill-path"]')) {
            // createHideButton();
            setSkillTreeObserver();
            // Array.from(document.querySelectorAll('[data-test="skill"]')).forEach(el => {
            //     el.addEventListener('touchend', removeTouchEndEvent);
            // });
        }

        if (localStorage.getItem('myDuoTheme') === 'true') {
            document.querySelector('html').setAttribute("data-duo-theme", "light")
            head[0].appendChild(style);
            document.querySelector('html').setAttribute("style", lightCss);
        }

        // repair duo.darkMode storage from older versions
        if (localStorage.getItem('duo.darkMode')?.endsWith(':"custom"}')) {
            console.log(localStorage.getItem('duo.darkMode').replace('custom', 'off'))
            localStorage.setItem('duo.darkMode', localStorage.getItem('duo.darkMode').replace('custom', 'off'));
            localStorage.setItem('myDuoTheme', true);
            document.querySelector('html').setAttribute("data-duo-theme", "light")
            head[0].appendChild(style);
            document.querySelector('html').setAttribute("style", lightCss);
        }

        setTimeout(() => {
            document.querySelector('.c1Mv-._1ursp._7jW2t.k-kqW')?.click(); // open in browser dialog
            addCustomDarkModeOption();
        }, 200);

        const callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {

                if (mutation.addedNodes?.[0]?.nodeType === 1) {
                    // if (mutation.addedNodes?.[0]?.querySelector('._3GElo') || mutation.addedNodes?.[0]?.querySelector('._1bdcY')) {
                    //     appendThemeSwitcher();
                    // }
                    if (mutation.addedNodes?.[0]?.querySelector('[data-test="dark-mode"]')) {
                        addCustomDarkModeOption();
                    }

                    if (mutation.addedNodes?.[0]?.querySelector('[data-test="skill-tree"]')) {
                        // MAIN PAGE
                        setSkillTreeObserver();
                        // createHideButton();
                        if (document.querySelector('[data-test=skill-popout]')) {
                            movePopout();
                        }
                    } else if (mutation.addedNodes?.[0]?.querySelector('[data-test="stories-player-continue"]')) {
                        // STORIES PAGE
                        setStoriesObservers();
                        createAutoClickButton(true);
                        createStoriesProgressShower();
                        swiper(document.querySelector('.WzuSM'), "up", () => {
                            document.querySelector('[data-test="stories-player-continue"]')?.click();
                        });
                    } else if (mutation.addedNodes?.[0]?.querySelector('[data-test*="challenge "]') && !document.querySelector('#my-autoclick-bu')) {
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
                                document.querySelector('._3v4ux').classList.add('with-hearts')
                            }
                            swiper(document.querySelector(father), "left", swipeFunc);
                            swiper(document.querySelector(father), "right", showHidePanel);
                            swiper(document.querySelector(father),
                                "up",
                                showHideFooter,
                                [
                                    '.panel',
                                    '._2PLYW',
                                    '._1vzP4.CeAwM'
                                ]
                            );
                        }
                    } else if (mutation.addedNodes?.[0]?.querySelector('[data-test="xp-slide"]')) {
                        if (footerHidden) hideShowFooter(false);
                    } else if (mutation.addedNodes?.[0]?.querySelector('.c1Mv-._1ursp._7jW2t.k-kqW')) {
                        // continue in browser
                        document.querySelector('.c1Mv-._1ursp._7jW2t.k-kqW')?.click(); // open in browser dialog
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
