// QUERY SELECTOR SNIPPET
const select = (selector, scope = document) => {
  return scope.querySelector(selector);
};
const selectAll = (selector, scope = document) => {
  return scope.querySelectorAll(selector);
};

// HERO PARALLAX EFFECT
window.addEventListener("scroll", () => {
  const heroSectionBg = document.querySelector(".hero-section-bg");
  heroSectionBg.style.transform = `translateY(${window.scrollY / 5}px)`;
});

// REVEALING ON SCROLL
const the_animation = selectAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
      // else {
      //     entry.target.classList.remove('active')
      // }
    });
  },
  { threshold: 0.3 }
);

for (let i = 0; i < the_animation.length; i++) {
  const elements = the_animation[i];

  observer.observe(elements);
}

// ACCORDION

const acc = selectAll(".accordion-item-question");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("opened");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// CALCULATOR
const revenueInput = select("#revenueInput");
const earnResult = select("#earnResult");
const weeksInput = select("#weeksInput");
const rangeProgressLine = select(".range-progress-line");
const sliderThumb = select(".slider-thumb");
const minDepNotification = select(".investment-part .notification");
let minDeposit = 250;
let depositStep = 10;

const calculateResult = () => {
  if (revenueInput.value < minDeposit) {
    earnResult.innerText = 0;
    minDepNotification.classList.add("active");
    setTimeout(() => {
      minDepNotification.classList.remove("active");
    }, 1800);
    return false;
  } else {
    earnResult.innerText = Math.ceil(
      +revenueInput.value + 0.25 * (revenueInput.value * weeksInput.value)
    );

    const sliderMaxValue = weeksInput.getAttribute("max");
    const sliderCurrentValue = (weeksInput.value / sliderMaxValue) * 100 + "%";

    rangeProgressLine.style.width = sliderCurrentValue;
    sliderThumb.style.left = sliderCurrentValue;
  }
};

calculateResult();

revenueInput.addEventListener("input", () => {
  calculateResult();
});

weeksInput.addEventListener("input", () => {
  calculateResult();
});

select(".btn-up").addEventListener("click", () => {
  revenueInput.value = +revenueInput.value + depositStep;
  calculateResult();
});

select(".btn-down").addEventListener("click", () => {
  if (revenueInput.value > minDeposit) {
    revenueInput.value = +revenueInput.value - depositStep;
    calculateResult();
  } else {
    minDepNotification.classList.add("active");
    setTimeout(() => {
      minDepNotification.classList.remove("active");
    }, 1800);
    return false;
  }
});

// BRANDS CAROUSEL
var splide = new Splide(".splide", {
  perPage: 3,
  type: "loop",
  perMove: 1,
});
if (document.body.clientWidth < 1000) {
  var splide = new Splide(".splide", {
    perPage: 2,
    type: "loop",
    perMove: 1,
  });
}
if (document.body.clientWidth < 600) {
  var splide = new Splide(".splide", {
    perPage: 1,
    type: "loop",
    perMove: 1,
  });
}
splide.mount();

// NAVIGATION
const scrollToElem = (elem) => {
  select(elem).scrollIntoView({ behavior: "smooth" });
};

// YEAR
selectAll(".year").forEach((el) => {
  el.innerText = new Date().getFullYear();
});

// MOBILE MENU
let menuUnderlay = select(".nav-underlay");
let menuOpenImg = select(".menu-btn-img");
let menuCloseImg = select(".menu-close-img");
let menuMobile = select(".mob-menu");

const menuOpening = () => {
  menuMobile.style.right = "0.5rem";
  menuUnderlay.classList.add("active");
};

const menuClosing = () => {
  menuMobile.style.right = "-100%";
  menuUnderlay.classList.remove("active");
};

menuOpenImg.addEventListener("click", () => {
  menuOpening();
});
menuCloseImg.addEventListener("click", () => {
  menuClosing();
});
menuUnderlay.addEventListener("click", () => {
  menuClosing();
});
