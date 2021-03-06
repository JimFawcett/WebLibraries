/////////////////////////////////////////////////////////////////////
// ScriptsMenuJsReop.js - Constructs dropdown menu for Repo        //
//                                                                 //
// Jim Fawcett, Website, 25 June 2018                              //
/////////////////////////////////////////////////////////////////////

//----< called in body.onload to initial menus and footer >----------
/*
 *  This function is specific for the menu on top-level pages 
 */
function initializeMenu() {

  // create top menu

  var topMenu = document.getElementsByTagName("nav");
  topMenu[0].innerHTML = "<div class='navbar'>\
    <a href='index.html' class='menuItem'>Home</a>\
    <div class='dropdown menuItem'>\
      <button class='dropbutton'>Repos &#9662;</button>\
      <div class='dropdown-content noScrollX'>\
        <div class='darkItem maxWidth'>&nbsp;Code&nbsp;Repositories&nbsp;&nbsp;</div>\
        <a href='CppRepositories.html'>C++&nbsp;Repositories&nbsp;&nbsp;</a>\
        <a href='CsRepositories.html'>C#&nbsp;Repositories&nbsp;&nbsp;</a>\
        <a href='JsRepositories.html'>JS&nbsp;Repositories&nbsp;&nbsp;</a>\
        <div style='padding:0px 10px; margin:0px; font-size:small;'>&nbsp;</div>\
      </div>\
    </div>\
    <div class='dropdown menuItem'>\
      <button class='dropbutton'>Utils &#9662;</button>\
      <div class='dropdown-content noScrollX'>\
        <div class='darkItem maxWidth'>&nbsp;Utilities</div>\
        <div class='maxWidth'>&nbsp;None yet&nbsp;</div>\
      </div>\
    </div>\
    <div class='dropdown menuItem'>\
      <button class='dropbutton'>Tools &#9662;</button>\
      <div class='dropdown-content noScrollX'>\
        <div class='darkItem maxWidth'>&nbsp;Tools</div>\
        <div class='maxWidth'>&nbsp;None yet&nbsp;</div>\
      </div>\
    </div>\
    <div class='dropdown menuItem'>\
      <button class='dropbutton'>Cmpnts &#9662;</button>\
      <div class='dropdown-content noScrollX'>\
        <div class='darkItem maxWidth'>&nbsp;Components</div>\
        <a href='WebComponents.html'>WebComponents.html</a>\
      </div>\
    </div>\
    <div class='dropdown menuItem'>\
      <button class='dropbutton'>Libs &#9662;</button>\
      <div class='dropdown-content noScrollX'>\
        <div class='darkItem maxWidth'>&nbsp;Libraries</div>\
        <a href='javascript:'>None Yet</a>\
      </div>\
    </div>\
    <div class='dropdown menuItem'>\
      <button class='dropbutton'>Demos &#9662;</button>\
      <div class='dropdown-content noScrollX'>\
        <div class='darkItem maxWidth'>&nbsp;Demonstrations</div>\
        <a href='Tests.html'>Tests.html</a>\
      </div>\
    </div>\
    <div class='dropdown menuItem'>\
      <button class='dropbutton'>About &#9662;</button>\
      <div class='dropdown-content noScrollX'>\
        <a href='JimFawcett.html'>Jim Fawcett</a>\
        <a href='Interesting.html'>Things&nbsp;I&nbsp;find&nbsp;interesting&nbsp;&nbsp;</a>\
        <a href='Friends.html'>Friends&nbsp;&amp&nbsp;Collaborators&nbsp;&nbsp;</a>\
        <a href='Help.html'>Help</a>\
        <a href='SitePlans.html'>Site Plans</a>\
        <a href='#' onclick='togglenavKeys()'>Toggle Nav Keys</a>\
        <a href='#' onclick='toggleSwipeEvents()'>Toggle Swipe Events</a>\
        <a href='SiteDesign.html'>Site Design</a>\
        <a href='BookDesignCourse.html'>Design Course</a>\
        <a class='border' href='index.html'>L1 Site Home</a>\
        <a class='border' href='Repositories.html'>L2&nbsp;Repository&nbsp;webpage</a>\
        <a class='border' href='LangCpp.html'>L2&nbsp;C++&nbsp;webpage</a>\
        <a href='https://github.com/JimFawcett'>Repositories&nbsp;code</a>\
        <a href='SiteMap.html'>Site Map</a>\
        <div style='padding:0px 10px; margin:0px; font-size:small;'>&nbsp;</div>\
      </div>\
    </div>\
    <button class='pageScroll' onclick='scrollPageTop()'>Top</button>\
    <button class='pageScroll' onclick='scrollPageBottom()'>Bottom</button>\
    <a id='prevLink' class='nextprev' href='#'>Prev</a>\
    <a id='nextLink' class='nextprev' href='#'>Next</a>\
    <button class='menuScroll' onclick='scrollMenuLeft()'>&lt;</button>\
    <button class='menuUnscroll' onclick='scrollMenuRight()'>&gt;</button>\
  </div >\
  <div style='clear:all;'></div>";

  // hide Next and Prev links if page has no next or previous pages
  // otherwise load href from page link

  var nxt = document.getElementById("Next");
  var nKey = document.getElementById("nKey");
  var swKey = document.getElementById("sKey");
  if (nxt === null) {
    document.getElementById("nextLink").style.display = "none";  // button top right menu
    if (isDefined(nKey))
      nKey.style.display = "none";
    if (isDefined(swKey))
      swKey.style.display = "none";
  }
  else {
    document.getElementById("nextLink").href = nxt.href;
    if (isDefined(nKey))
      nKey.style.display = "inline";
    if (isDefined(swKey))
      swKey.style.display = "inline";
  }

  var prv = document.getElementById("Prev");
  var pKey = document.getElementById("pKey");
  if (prv === null) {
    document.getElementById("prevLink").style.display = "none";  // button top right menu
    if (isDefined(pKey))
      pKey.style.display = "none";
  }
  else {
    document.getElementById("prevLink").href = prv.href;
    if (isDefined(pKey))
      pKey.style.display = "inline";
  }

  // show footer with copyright notice and revision date

  var rvsd = document.getElementsByTagName("info-bar");
  var date = document.lastModified;
  rvsd[0].innerHTML = "copyright &copy; Jim Fawcett, 2019&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Page Revised: " + date;
  rvsd[0].addEventListener('click', function () { location.reload(); });

  // set display mode for navKeys from value in local storage

  setnavKeys();
  setImageSizer();

  // listen for keyboard events:
  // - key actions are defined in ScriptsKeyboard.js

  document.addEventListener('keydown', (event) => { keyAction(event); }, false);

  // listen for mouse events:
  // - mouse actions are defined below

  document.addEventListener('mousedown', (event) => { mouseAction(event); }, false);

  // bind more-less click event

  var elems = document.getElementsByTagName("more-less");
  for (var i = 0; i < elems.length; ++i) {
    elems[i].addEventListener("click", (event) => { toggleVisibility(event); }, false);
  }
  let sKey = document.getElementById('sKey');
  let test = getSwipeEvents();
  if (test === 'true') {
    addSwipeListeners();
    sKey.innerHTML = 'S';
  }
  else {
    sKey.innerHTML = '<del>S</del>';
  }
}

//----< load page defined in current page's Prev link >--------------

function loadPrev() {
  document.getElementById("Prev").click();
}
//----< load page defined in current page's Next link >--------------

function loadNext() {
  document.getElementById("Next").click();
}
//----< load page defined in current page's Lect link >--------------

function loadLect() {
  document.getElementById("Lect").click();  // Lect link is near top of first lect page
}
//----< load page defined in current page's Cour link >--------------

function loadCour() {
  document.getElementById("Cour").click();  // Cour link is near top of course page
}
//----< hide, progressively, menu items on the left >----------------
/*
*  This let's user see menu items that overflow on the right
*  due to page size.
*/
function scrollMenuLeft() {
  var items = document.getElementsByClassName("menuItem");
  var i;
  for (i = 0; i < items.length; ++i) {
    var cpprp = window.getComputedStyle(items[i], null).getPropertyValue("display");
    if (cpprp !== "none") {
      items[i].style.display = "none";
      break;
    }
  }
}
//----< restore, progressively, menu items on the left >-------------
/*
*  This let's user restore menu items hidden by the previous
*  function.
*/
function scrollMenuRight() {
  var items = document.getElementsByClassName("menuItem");
  var len = items.length;
  var i;
  for (i = 0; i < items.length; ++i) {
    var cpprp = window.getComputedStyle(items[len - i - 1], null).getPropertyValue("display");
    if (cpprp !== "block") {
      items[len - i - 1].style.display = "block";
      break;
    }
  }
}
//----< scroll page to top >-----------------------------------------

function scrollPageTop() {
  window.scrollTo(0, 0);
}
//----< scroll page to bottom >--------------------------------------

function scrollPageBottom() {
  window.scrollTo(0, 100000);
}
//----< toggle nav keys display >------------------------------------
/*
*  navKeys are TBHNP keys at bottom right of each page
*/
function togglenavKeys() {
  try {
    var nkc = document.getElementsByTagName("navKeys-Container");
    var tog = window.getComputedStyle(nkc[0], null).getPropertyValue("display");
    if (tog === "none") {
      nkc[0].style.display = "inline";
      window.localStorage.setItem("navKeyState", "show");  // persist change across pages
    }
    else {
      nkc[0].style.display = "none";
      window.localStorage.setItem("navKeyState", "hide");  // persist chage across pages
    }
  }
  catch (err) {
    return;
  }
}
//----< setnavKeys display >-----------------------------------------

function setnavKeys() {
  try {
    var nkc = document.getElementsByTagName("navKeys-Container");
    var navKeyState = window.localStorage.getItem("navKeyState");
    if (navKeyState === null) {
      nkc[0].style.display = "inline";
      window.localStorage.setItem("navKeyState", "show");
      return;
    }
    if (navKeyState === "show") {
      nkc[0].style.display = "inline";
    }
    else {
      nkc[0].style.display = "none";
    }
  }
  catch (err) {
    console.log('exception: ' + err);
    return;
  }
}
//----< toggle image sizer display >-----------------------------------
/*
*  Image sizers appear to the right of some images
*/
function toggleImageSizer() {
  try {
    var nkc = document.getElementsByTagName("sizer-Container");
    var tog = window.getComputedStyle(nkc[0], null).getPropertyValue("display");
    for (let i = 0; i < nkc.length; ++i) {
      if (tog === "none") {
        nkc[i].style.display = "inline";
        window.localStorage.setItem("imageSizerState", "show");  // persist change across pages
      }
      else {
        nkc[i].style.display = "none";
        window.localStorage.setItem("imageSizerState", "hide");  // persist chage across pages
      }
    }
  }
  catch (err) {
    console.log('exception: ' + err);
    return;
  }
}
//----< set image sizer display >-----------------------------------------

function setImageSizer() {
  try {
    var nkc = document.getElementsByTagName("sizer-Container");
    var imageSizerState = window.localStorage.getItem("imageSizerState");

    for (let i = 0; i < nkc.length; ++i) {
      if (imageSizerState === null) {
        nkc[i].style.display = "inline";
        window.localStorage.setItem("imageSizerState", "show");
        return;
      }
      if (imageSizerState === "hide") {
        nkc[i].style.display = "none";
      }
      if (imageSizerState === "show") {
        nkc[i].style.display = "inline";
      }
      else {
        nkc[i].style.display = "none";
      }
    }
  }
  catch (err) {
    console.log('exception: ' + err);
    return;
  }
}
//----< toggle nav keys display >------------------------------------
/*
*   On right click, Toggle display of navKeys TBHNP
*     unless target is anchor, then
*   open link in new tab 
*/
function mouseAction(event) {

  if (event.button === 2) {
    if (event.target.tagName === 'A') {
      window.open(event.target, "_newtab" + Math.floor(Math.random() * 999999));
    }
    else {
      //togglenavKeys();
      togglenavKeys();
    }
  }
}
