/* RSquared IT Technologies — scroll choreography.
   Everything animates with transform/opacity only and
   backs off entirely under prefers-reduced-motion. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ----- nav: background on scroll + mobile menu ----- */

  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  function onNavScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  onNavScroll();
  window.addEventListener("scroll", onNavScroll, { passive: true });

  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ----- reveal on scroll ----- */

  var revealed = document.querySelectorAll("[data-reveal]");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealed.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealed.forEach(function (el) { io.observe(el); });
  }

  /* ----- stat count-up ----- */

  var counters = document.querySelectorAll("[data-count]");

  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = (el.getAttribute("data-count").split(".")[1] || "").length;
    var duration = 1400;
    var start = null;

    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  } else {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ----- scroll progress + gentle parallax ----- */

  var progress = document.querySelector(".progress");
  var layers = document.querySelectorAll(".parallax");
  var ticking = false;

  function paint() {
    ticking = false;

    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    progress.style.transform =
      "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";

    layers.forEach(function (layer) {
      var rect = layer.parentElement.getBoundingClientRect();
      var mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      var shift = Math.max(-1, Math.min(1, mid / window.innerHeight));
      layer.style.transform =
        "translateY(" + (shift * -1 * rect.height * 0.06).toFixed(1) + "px)";
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(paint);
    }
  }

  if (!reduceMotion.matches) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    paint();
  }

  /* ----- footer year ----- */

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
