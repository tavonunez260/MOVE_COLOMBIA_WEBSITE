'use strict'; //////////////////////////////////////////////
//ELEMENTS

var body = document.querySelector('body'); //Buttons

var menuButtonResponsive = document.querySelector('.nav-bar__menu-button-container'); //Blocks

var navBar = document.querySelector('.nav-bar');
var dropDownMenus = document.querySelectorAll('.nav-bar__sublist'); //Events

var clickIn = ['mousedown', 'mouseover', 'touchstart'];
var clickOut = ['mouseup', 'mouseout', 'touchend']; //////////////////////////////////////////////
//EVENTS
//Responsive menu button

var responsiveMenu = function responsiveMenu(open) {
  if (open) {
    navBar.classList.add('nav-bar--active');
  } else {
    navBar.classList.remove('nav-bar--active');
  }
};

var openButton = true;
menuButtonResponsive.addEventListener('click', function (e) {
  if (openButton) {
    this.setAttribute('xlink:href', 'img/SVG/sprite.svg#icon-cancel-circle');
    responsiveMenu(openButton);
    openButton = !openButton;
  } else {
    this.setAttribute('xlink:href', 'img/SVG/sprite.svg#icon-menu1');
    responsiveMenu(openButton);
    openButton = !openButton;
  }
}); //Dropdown menu on touch screens(md and lg screens)

navBar.addEventListener('touchstart', function (e) {
  var clicked = 0;
  console.log(e.target);
  clicked++;
  console.log(clicked);
}); // body.addEventListener('touchstart', function(e){
//     console.log(e.target);
// });