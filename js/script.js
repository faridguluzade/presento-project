"use strict";

const btnNav = document.querySelector(".btn-mobile-nav");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav__main-list");
const btnScrollTo = document.querySelectorAll(".btn--scroll-to");
const sectionAbout = document.querySelector("#about");
const sectionHero = document.querySelector("#hero");
const backToTop = document.querySelector(".back-to-top");
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav__main-link");
const tabsContainer = document.querySelector(".tabs__category");
const tabsContent = document.querySelectorAll(".tabs__content");
const tabs = document.querySelectorAll(".tabs__select");
const accordion = document.querySelector(".accordion");
const accItems = document.querySelectorAll(".accordion__select-box");
const accContents = document.querySelectorAll(".accordion__hidden-box");
const sectionCounts = document.querySelector(".section-counts");
const clients = document.querySelector(".clients");
const clientsSlides = document.querySelectorAll(".clients__item");
const dotsClients = clients.querySelector(".dots");
const testimonialSlider = document.querySelector(".slider");
const testimonialSlides = document.querySelectorAll(".slide");
const dotsTestimonials = testimonialSlider.querySelector(".dots");
const filterContainer = document.querySelector(".portfolio__filters");
const photos = document.querySelectorAll(".portfolio__photo");

// SCROLL ANIMATION
AOS.init({
  duration: 1200,
  once: true,
});

// MABILE NAVIGATION
btnNav.addEventListener("click", function () {
  nav.classList.toggle("nav-open");
});

//------------------------------------------

// SMOOTH SCROLLING
// 1
btnScrollTo.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    sectionAbout.scrollIntoView({ behavior: "smooth" });
  });
});

// 2
navList.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__main-link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }

  if (nav.classList.contains("nav-open")) {
    nav.classList.toggle("nav-open");
  }
});

// 3
backToTop.addEventListener("click", function (e) {
  e.preventDefault();
  sectionHero.scrollIntoView({ behavior: "smooth" });
});
//-----------------------------------------------------

// STICKY NAVIGATION BAR
const headerHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

heroObserver.observe(sectionHero);

//-------------------------------------------------

// NAVIGATION ACTIVE ITEM
const activeNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  const hash = "#" + entry.target.id;
  const navEl = document.querySelector(`a[href="${hash}"]`);
  navEl.classList.add("nav__main-link--active");

  navItems.forEach((item) => {
    if (item !== navEl) {
      item.classList.remove("nav__main-link--active");
    }
  });
};

const navObserver = new IntersectionObserver(activeNav, {
  threshold: 0.5,
});

sections.forEach((sectionEl) => {
  if (sectionEl.id) {
    navObserver.observe(sectionEl);
  }
});

//---------------------------------------------------

// COUNTS COMPONENT
/*
const counters = document.querySelectorAll(".counts__counter");
const interval = 5000;

const counterUp = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    counters.forEach((count) => {
      let startValue = 0;
      let countValue = +count.dataset.value;

      let duration = Math.floor(interval / countValue);
      console.log(duration);

      let counter = setInterval(function () {
        startValue += 1;
        count.textContent = startValue;
        if (startValue === countValue) clearInterval(counter);
      }, duration);
    });
  }
};

const counterObserver = new IntersectionObserver(counterUp, {
  root: null,
  threshold: 0.7,
  rootMargin: "0px",
});

counterObserver.observe(sectionCounts);

*/

import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.7/countUp.js";

function countStart() {
  const $counters = document.querySelectorAll(".counts__counter"),
    options = {
      useEasing: true,
      useGrouping: true,
      separator: ",",
      decimal: ".",
    };

  $counters.forEach((item) => {
    const value = item.dataset.value;
    const counter = new CountUp(item, value, options);
    counter.start();
  });
}

new Waypoint({
  element: document.querySelector(".section-counts"),
  handler: function () {
    countStart();
    this.destroy(); //for once
  },
  offset: "80%",
});

//-------------------------------------------------------

// TABBED COMPONENT
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".tabs__select");

  if (!clicked) return;

  // Remove active class;
  tabs.forEach((t) => t.classList.remove("tabs__select--active"));
  tabsContent.forEach((c) => c.classList.remove("grid"));

  // Activate tab
  clicked.classList.add("tabs__select--active");

  // Activate content area
  document
    .querySelector(`.tabs__content--${clicked.dataset.tab}`)
    .classList.add("grid");
});

//------------------------------------------------------

// SLIDER

// Functions
const createDots = function (items, dots) {
  items.forEach((_, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot dots__dot--active" data-slide=${i}>&nbsp;</button>`
    );
  });
};

const activateDot = function (dots, slide) {
  dots
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  dots
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (items, slide) {
  items.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
// 0%, 100%, 200%, 300%

//---------------------------------------------------------
// CLIENTS SLIDER
const clientsSlider = function () {
  const initClients = function () {
    createDots(clientsSlides, dotsClients);
    goToSlide(clientsSlides, 0);
    activateDot(dotsClients, 0);
  };

  // Init Testmonial function
  initClients();

  // Slider for Testimonials
  dotsClients.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(clientsSlides, slide);
      activateDot(dotsClients, slide);
    }
  });
};

clientsSlider();
//-------------------------------------------------------------
// TESTIMONIALS SLIDER

const testSlider = function () {
  const initTestimonials = function () {
    createDots(testimonialSlides, dotsTestimonials);
    goToSlide(testimonialSlides, 0);
    activateDot(dotsTestimonials, 0);
  };

  // Init Testmonial function
  initTestimonials();

  // Slider for Testimonials
  dotsTestimonials.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(testimonialSlides, slide);
      activateDot(dotsTestimonials, slide);
    }
  });
};

testSlider();

//--------------------------------------------------

// PORTFOLIO GALLERY;
filterContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("filter-item")) {
    const clicked = e.target;
    const filterValue = clicked.dataset.filter;

    photos.forEach((photo) => {
      photo.classList.add("hide");
      photo.classList.remove("show");
    });

    // Remove active class;
    filterContainer
      .querySelector(".filter--active")
      .classList.remove("filter--active");

    // Add active class on clickked item
    clicked.classList.add("filter--active");

    photos.forEach((photo) => {
      if (
        photo.classList.contains(filterValue) ||
        filterValue === "filter-all"
      ) {
        photo.classList.remove("hide");
        photo.classList.add("show");
      }
    });
  }
});

// ACCORDION COMPONENT
accordion.addEventListener("click", function (e) {
  const clicked = e.target.closest(".accordion__select-box");

  if (!clicked) return;

  const hiddenContent = clicked.nextElementSibling;

  // If the content is already expanded, collapse it and quit
  if (clicked.classList.contains("accordion__item--open")) {
    clicked.classList.remove("accordion__item--open");
    hiddenContent.style.maxHeight = null;
    return;
  }
  // Remove active class;
  accItems.forEach((a) => a.classList.remove("accordion__item--open"));
  accContents.forEach((c) => (c.style.maxHeight = null));

  // Activate Accordion
  clicked.classList.toggle("accordion__item--open");
  hiddenContent.style.maxHeight = hiddenContent.scrollHeight + "px";
});

//--------------------------------------------------
