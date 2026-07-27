/* RSquared IT Technologies — shared site behaviour.
   Everything animates with transform/opacity only and
   backs off entirely under prefers-reduced-motion. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var progress = null;
  var layers = [];
  var ticking = false;

  /* ---------------- per-page bindings ---------------- */

  function initPage() {
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");

    progress = document.querySelector(".progress");
    layers = [].slice.call(document.querySelectorAll(".parallax"));

    /* nav background on scroll + mobile menu */
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    }

    if (toggle && links) {
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
    }

    /* reveal on scroll */
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

    /* stat count-up */
    var counters = document.querySelectorAll("[data-count]");

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

    /* enquiry form composes an email — no backend involved */
    var form = document.getElementById("enquiry");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var d = new FormData(form);
        var get = function (k) { return (d.get(k) || "").toString().trim(); };
        var who = get("company") || get("name") || "enquiry";
        var subject = "Enquiry — " + (get("service") || "General") + " — " + who;
        var body = [
          "Name: " + get("name"),
          "Company: " + get("company"),
          "Email: " + get("email"),
          "Phone: " + get("phone"),
          "Service: " + get("service"),
          "",
          get("message")
        ].join("\n");
        window.location.href =
          "mailto:infor@rsquaredit.com?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
      });
    }

    /* footer year */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    if (!reduceMotion.matches) paint();
  }

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

  /* ---------------- scroll progress + parallax ---------------- */

  function paint() {
    ticking = false;

    var nav = document.querySelector(".nav");
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);

    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      progress.style.transform =
        "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    }

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

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }

  /* the single-file preview swaps pages in place and re-runs this */
  window.__rsqInitPage = initPage;
})();
