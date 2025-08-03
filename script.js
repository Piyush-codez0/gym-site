const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform
    ? "transform"
    : "fixed"
});

scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

let tl = gsap.timeline();

tl.from('.nav', {
  opacity:0,
  y:-30,
  delay: 1,
  stagger: 0.3,
  ease: "power1.out"
})

tl.from('.hero-content', {
  opacity:0,
  scale: 0.5,
  duration: 1,
  stagger: 0.4,
  ease: "power1.out"
});

gsap.from('#aboutpic', {
  opacity: 0,
  x: -500,
  duration:2,
  scrollTrigger: {
    trigger: "#aboutpic",
    scroller: "[data-scroll-container]", // <-- Add this line!
    // markers: true,
    start: "top 80%",
    end: "top 30%",
    scrub: 3,
    toggleActions: 'play none none reset'
  }
});

gsap.from('.card', {
  opacity: 0,
  y: -200,
  x:200,
  stagger: 0.5,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".cards",
    scroller: "[data-scroll-container]", // <-- Add this line!
    // markers: true,
    start: "top 70%",
    end: "top 30%",
    scrub: 3,
    toggleActions: 'play none none reset'
  }
});

gsap.from('.contact', {
  opacity: 0,
  x: 200,
  ease: "easein",
  scrollTrigger: {
    trigger: ".contact",
    scroller: "[data-scroll-container]", // <-- Add this line!
    // markers: true,
    start: "top 90%",
    end: "top 40%",
    scrub: 3,
  }
});


function toggleNavbar(collapseID) {
  const nav = document.getElementById(collapseID);
  const overlay = document.getElementById('navbar-blur-overlay');
  nav.classList.toggle('hidden');
  if (!nav.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
  } else {
    overlay.classList.add('hidden');  
  }
  // Optional: close nav if overlay is clicked
  overlay.onclick = function() {
    nav.classList.add('hidden');
    overlay.classList.add('hidden');
  };
}

const words = ["Power", "Energy", "Strength"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-effect");
const typingSpeed = 120;
const erasingSpeed = 60;
const delayBetweenWords = 1200;

function type() {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenWords);
        } else {
            setTimeout(type, typingSpeed);
        }
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(type, erasingSpeed);
        }
    }
}

document.addEventListener("DOMContentLoaded", type);