'use strict';

//////////////////////////////////////////////
//ELEMENTS

const body = document.querySelector('body');
//Buttons
const menuButtonResponsive = document.querySelector('.nav-bar__menu-button-container');
//Blocks
const navBar = document.querySelector('.nav-bar');
const links = document.querySelectorAll('.nav-bar__element');
const dropDownMenus = document.querySelectorAll('.nav-bar__sublist');

//Events
const clickIn = ['mousedown', 'mouseover', 'touchstart'];
const clickOut = ['mouseup', 'mouseout', 'touchend'];

//let previousDropDrownMenu, currentDropDrownMenu;

//////////////////////////////////////////////
//
class NavBar {
    responsiveButtonStatus = false;
    previousDropDrownMenu;
    currentDropDrownMenu;
    windowClickedElement;

    constructor() {
        menuButtonResponsive.addEventListener('click', this._openAndCloseResponsiveMenu.bind(this));
        navBar.addEventListener('touchstart', this._openAndCloseDropDownMenus.bind(this));
        window.addEventListener('touchstart', this._closeWhenWindowClick.bind(this));
    }
    //Utils
    _clickedTarget(e) {
        return new Promise(function (resolve) {
            resolve(e.target);
        });
    }

    //Responsive button
    _toggleResponsiveMenuStatus() {
        this.responsiveButtonStatus = !this.responsiveButtonStatus;
    }
    _toggleResponsiveMenu(open, e) {
        if (open) {
            e.target.setAttribute('xlink:href', 'img/SVG/sprite.svg#icon-menu');
            navBar.classList.add('nav-bar--active');
        } else {
            e.target.setAttribute('xlink:href', 'img/SVG/sprite.svg#icon-cancel-circle');
            navBar.classList.remove('nav-bar--active');
        }
    }
    _openAndCloseResponsiveMenu(e) {
        if (this.responsiveButtonStatus) {
            this._toggleResponsiveMenu(this.responsiveButtonStatus, e);
            this._toggleResponsiveMenuStatus();
        } else {
            this._toggleResponsiveMenu(this.responsiveButtonStatus, e);
            this._toggleResponsiveMenuStatus();
        }
    }

    //Navigation bar dropdown menus
    _toggleActiveLinks(e) {
        links.forEach(link => {
            link.classList.remove('nav-bar__element--active');
        })
        e.target.parentNode.classList.add('nav-bar__element--active');
    }
    _toggleDropDownMenu(e) {
        dropDownMenus.forEach(menu => {
            menu.classList.remove('nav-bar__sublist--active');
        })
        e.target.parentNode.children[1].classList.add('nav-bar__sublist--active');
    }
    _toggleDropDrownMenus(e) {
        this._toggleActiveLinks(e);
        this._toggleDropDownMenu(e);
    }
    _toggleActiveStatus(e) {
        e.target.parentNode.classList.toggle('nav-bar__element--active');
        e.target.parentNode.children[1].classList.toggle('nav-bar__sublist--active');
    }
    _openAndCloseDropDownMenus(e) {
        const openAndClose = async () => {
            this.previousDropDrownMenu = this.currentDropDrownMenu;
            this.currentDropDrownMenu = await this._clickedTarget(e); 

            if (this.currentDropDrownMenu.isEqualNode(navbar.previousDropDrownMenu)) {
                if (e.target.classList.contains('nav-bar__link') && e.target.parentNode.childElementCount > 1) {
                    e.preventDefault();
                    this._toggleActiveStatus(e);
                }
            } else {
                if (e.target.classList.contains('nav-bar__link') && e.target.parentNode.childElementCount > 1) {
                    e.preventDefault();
                    this._toggleDropDrownMenus(e);
                } else if (e.target.classList.contains('nav-bar__link') && e.target.parentNode.childElementCount === 1) {
                    this._toggleActiveLinks(e);
                    dropDownMenus.forEach(menu => {
                        menu.classList.remove('nav-bar__sublist--active');
                    })
                }
            }
        }
        openAndClose();
    }
    _closeWhenWindowClick(e) {
        if(!e.target.isEqualNode(this.currentDropDrownMenu)) {
            this.currentDropDrownMenu.parentNode.classList.remove('nav-bar__element--active');
            this.currentDropDrownMenu.parentNode.children[1].classList.remove('nav-bar__sublist--active');
        }
    }

}

const navbar = new NavBar();