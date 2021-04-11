'use strict';

//////////////////////////////////////////////
//ELEMENTS
const body = document.querySelector('body');
const main = document.querySelector('main');
//Sections
const section1 = document.querySelector('.section-1');
//Buttons
const menuButtonResponsive = document.querySelector('.nav-bar__menu-button-container');
//Blocks
const fullNavBar = document.querySelector('.header__nav-bar');
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
    dropDownMenuStatus = false;
    stickyMenuStatus = false;
    previousDropDrownMenu;
    currentDropDrownMenu;
    navbarObserverOptions = {
        root: null,
        threshold: [0.8],
    }

    constructor() {
        menuButtonResponsive.addEventListener('click', this._openAndCloseResponsiveMenu.bind(this));
        navBar.addEventListener('touchstart', this._openAndCloseDropDownMenus.bind(this));
        window.addEventListener('touchstart', this._closeWhenWindowClick.bind(this));
        this._stickyNavbar();
    }
    //Utils
    _clickedTarget(e) {
        return new Promise(function (resolve) {
            resolve(e.target);
        });
    }
    _navbarObserver() {
        return new IntersectionObserver(this._navbarObserverCallback, this.navbarObserverOptions);
    }
    _navbarObserverCallback(entries, observer) {
        const [entry] = entries;
        console.log(entry);
        if(!entry.isIntersecting){
            fullNavBar.classList.add('header__nav-bar--sticky');
        }
        if(entry.isIntersecting){
            fullNavBar.classList.remove('header__nav-bar--sticky');
        }
    }  

    //Responsive button
    _toggleResponsiveMenuStatus() {
        this.responsiveButtonStatus = !this.responsiveButtonStatus;
    }
    _toggleResponsiveMenu(open, el) {
        if (open) {
            navBar.classList.remove('nav-bar--active');
            el.firstElementChild.firstElementChild.setAttribute('xlink:href', 'img/SVG/sprite.svg#icon-menu');
            body.style.overflowY = 'scroll';
        } else {
            navBar.classList.add('nav-bar--active');
            el.firstElementChild.firstElementChild.setAttribute('xlink:href', 'img/SVG/sprite.svg#icon-cancel-circle');
            body.style.overflowY = 'hidden';
        }
    }
    _openAndCloseResponsiveMenu(e) {
        const div = e.target.closest('.nav-bar__menu-button-container');
        if (!this.responsiveButtonStatus) {
            this._toggleResponsiveMenuStatus();
            this._toggleResponsiveMenu(this.responsiveButtonStatus, div);
        } else {
            this._toggleResponsiveMenuStatus();
            this._toggleResponsiveMenu(this.responsiveButtonStatus, div);
        }
    }

    //Navigation bar dropdown menus
    _resetCurAndPrev(status) {
        if(!status){
            this.previousDropDrownMenu = undefined;
            this.currentDropDrownMenu = undefined;
        }
    }
    _toggleDropDownMenuStatus() {
        this.dropDownMenuStatus = !this.dropDownMenuStatus;
        console.log(this.dropDownMenuStatus);
    }
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
            this._resetCurAndPrev(this.dropDownMenuStatus);
            this.previousDropDrownMenu = this.currentDropDrownMenu;
            this.currentDropDrownMenu = await this._clickedTarget(e); 
            if (this.currentDropDrownMenu.isEqualNode(navbar.previousDropDrownMenu)) {
                if (e.target.classList.contains('nav-bar__link') && e.target.parentNode.childElementCount > 1) {
                    e.preventDefault();
                    this._toggleActiveStatus(e);
                    this._toggleDropDownMenuStatus();
                }
            } else {
                if (e.target.classList.contains('nav-bar__link') && e.target.parentNode.childElementCount > 1) {
                    e.preventDefault();
                    this._toggleDropDrownMenus(e);
                    this.dropDownMenuStatus = true;
                } else if (e.target.classList.contains('nav-bar__link') && e.target.parentNode.childElementCount === 1) {
                    this._toggleActiveLinks(e);
                    dropDownMenus.forEach(menu => {
                        menu.classList.remove('nav-bar__sublist--active');
                    });
                }
            }
        }
        openAndClose();
    }
    _closeWhenWindowClick(e) {
        this._resetCurAndPrev(this.dropDownMenuStatus);
        if(!e.target.isEqualNode(this.currentDropDrownMenu) && this.dropDownMenuStatus) {
            this.currentDropDrownMenu.parentNode.classList.remove('nav-bar__element--active');
            this.currentDropDrownMenu.parentNode.children[1].classList.remove('nav-bar__sublist--active');
            this._toggleDropDownMenuStatus();
        }
    }

    //Sticky navbar
    _stickyNavbar() {
        const navbarObserver = this._navbarObserver();
        navbarObserver.observe(section1);
    }
}

const navbar = new NavBar();