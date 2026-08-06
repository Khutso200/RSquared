/* RSquared IT Technologies — motion and interaction layer.

   GSAP with ScrollTrigger drives the choreography when the library is
   available. If it is blocked, offline or slow, an IntersectionObserver
   fallback still reveals every element, so no content depends on the CDN.
   Both paths stand down entirely under prefers-reduced-motion. */

(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  var root = document.documentElement;

  var gsap, ST, animated;

  /* ============================================================
     helpers
     ============================================================ */

  function all(sel, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(sel));
  }

  function revealDelay(el) {
    var d = el.style.getPropertyValue("--d");
    return d ? parseFloat(d) || 0 : 0;
  }

  /* Wrap the words of a heading so they can be staggered out of a mask.
     Element children (the gradient span) are kept whole so their
     background-clip keeps working. */
  function splitWords(el) {
    var units = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (!part.trim()) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          var mask = document.createElement("span");
          mask.className = "w";
          var inner = document.createElement("span");
          inner.className = "wi";
          inner.textContent = part;
          mask.appendChild(inner);
          frag.appendChild(mask);
          units.push(inner);
        });
        el.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        node.classList.add("wi");
        units.push(node);
      }
    });
    return units;
  }

  /* ============================================================
     static bindings — always run
     ============================================================ */

  function bindPageLoader() {
    var screen = document.querySelector(".page-loader");
    if (!screen) return;

    var hide = function () {
      if (screen.classList.contains("is-hidden")) return;
      screen.classList.add("is-hidden");
      screen.setAttribute("aria-hidden", "true");
      window.setTimeout(function () {
        if (screen.parentNode) screen.parentNode.removeChild(screen);
      }, 550);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }
    /* safety net: never let a slow third-party asset hold the loader forever */
    window.setTimeout(hide, 4000);
  }

  function bindChrome() {
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    var backdrop = document.querySelector(".nav-backdrop");

    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);

    if (toggle && links) {
      var setOpen = function (open) {
        links.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (backdrop) backdrop.classList.toggle("open", open);
        document.documentElement.classList.toggle("nav-lock", open);
        document.body.classList.toggle("nav-lock", open);
      };

      toggle.addEventListener("click", function () {
        setOpen(!links.classList.contains("open"));
      });

      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
      });

      if (backdrop) {
        backdrop.addEventListener("click", function () { setOpen(false); });
      }

      document.addEventListener("click", function (e) {
        if (!links.classList.contains("open")) return;
        if (e.target.closest(".nav-links") || e.target.closest(".nav-toggle")) return;
        setOpen(false);
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && links.classList.contains("open")) {
          setOpen(false);
          toggle.focus();
        }
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth > 860 && links.classList.contains("open")) setOpen(false);
      }, { passive: true });
    }

    var form = document.getElementById("enquiry");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var d = new FormData(form);
        var get = function (k) { return (d.get(k) || "").toString().trim(); };
        var who = get("company") || get("name") || "enquiry";
        var subject = "Enquiry: " + (get("service") || "General") + " for " + who;
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

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function showEverything() {
    all("[data-reveal]").forEach(function (el) { el.classList.add("in"); });
    all("[data-count]").forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  }

  /* ============================================================
     interaction — pointer driven, independent of scroll library
     ============================================================ */

  function bindSpotlight() {
    if (!finePointer.matches) return;
    all(".cap, .ccard, .figure").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(2) + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(2) + "%");
      });
    });
  }

  function bindMagnetic() {
    if (!finePointer.matches || !gsap) return;
    all(".btn").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.16,
          y: (e.clientY - r.top - r.height / 2) * 0.24,
          duration: 0.5,
          ease: "power3.out"
        });
      });
      btn.addEventListener("pointerleave", function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
      });
    });
  }

  /* ============================================================
     GSAP choreography
     ============================================================ */

  function gsapIntro() {
    var scope = document.querySelector(".hero") || document.querySelector(".page-head");
    if (!scope) return;

    var heading = scope.querySelector("h1");
    var items = all("[data-reveal]", scope);

    /* split once: re-running init must reuse the existing word spans,
       otherwise a second pass nests them and the inner word stays
       parked inside its mask */
    var words = [];
    if (heading) {
      if (heading.getAttribute("data-split") === "true") {
        words = all(".wi", heading);
      } else {
        words = splitWords(heading);
        heading.setAttribute("data-split", "true");
      }
    }

    var rest = items.filter(function (el) { return el !== heading; });

    gsap.set(items, { opacity: 1, y: 0 });
    gsap.set(words, { yPercent: 118, opacity: 0 });
    gsap.set(rest, { opacity: 0, y: 24 });

    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    var media = scope.querySelector(".hero-media img, .page-head-media img");
    if (media) tl.fromTo(media, { scale: 1.09 }, { scale: 1, duration: 1.8, ease: "power2.out" }, 0);

    if (words.length) {
      tl.to(words, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.05 }, 0.1);
    }
    tl.to(rest, { opacity: 1, y: 0, duration: 0.85, stagger: 0.09 }, 0.3);
  }

  function gsapReveals() {
    all("[data-reveal]").forEach(function (el) {
      if (el.closest(".hero") || el.closest(".page-head")) return;
      gsap.fromTo(el,
        { opacity: 0, y: 26 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          delay: revealDelay(el),
          scrollTrigger: { trigger: el, start: "top 88%", once: true }
        });
    });

    /* deliverable lists tick in behind their service */
    all(".svc").forEach(function (svc) {
      var bullets = all(".svc-list li", svc);
      if (!bullets.length) return;
      gsap.fromTo(bullets,
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.035,
          scrollTrigger: { trigger: svc, start: "top 78%", once: true }
        });
    });

    /* pipeline steps in the automation band */
    var pipe = document.querySelector(".pipeline");
    if (pipe) {
      gsap.fromTo(all("span, i", pipe),
        { opacity: 0, scale: 0.88 },
        {
          opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)", stagger: 0.07,
          scrollTrigger: { trigger: pipe, start: "top 88%", once: true }
        });
    }
  }

  function gsapParallax() {
    all(".parallax").forEach(function (layer) {
      var host = layer.parentElement;
      if (!host || host.classList.contains("hero")) {
        gsap.to(layer, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: host, start: "top top", end: "bottom top", scrub: true }
        });
        return;
      }
      gsap.fromTo(layer, { yPercent: -5 }, {
        yPercent: 5, ease: "none",
        scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }

  function gsapCounters() {
    all("[data-count]").forEach(function (el) {
      var raw = el.getAttribute("data-count");
      var target = parseFloat(raw);
      var decimals = (raw.split(".")[1] || "").length;
      var proxy = { v: 0 };
      gsap.to(proxy, {
        v: target, duration: 1.7, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
        onUpdate: function () { el.textContent = proxy.v.toFixed(decimals); }
      });
    });
  }

  function gsapProgress() {
    var bar = document.querySelector(".progress");
    if (!bar) return;
    gsap.fromTo(bar, { scaleX: 0 }, {
      scaleX: 1, ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 }
    });
  }

  function gsapMarquee() {
    var track = document.querySelector(".marquee-track");
    var band = document.querySelector(".marquee");
    if (!track || !band) return;

    var first = track.querySelector("ul");
    if (!first) return;

    var loop = null;
    var resizeTimer = null;

    /* the two <ul> lists are exact duplicates, so the seamless-loop
       distance is exactly the first list's width plus the track's own
       gap between them — but that width shifts once the webfont swaps
       in (Aruba / ThousandEyes render in a fallback face first), so
       measuring before fonts settle bakes in a stale distance and the
       loop visibly skips the moment the real font lands. */
    function build() {
      if (loop) { loop.kill(); loop = null; }
      gsap.set(track, { x: 0 });

      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      var distance = first.getBoundingClientRect().width + gap;
      if (!distance) return;

      loop = gsap.fromTo(track, { x: 0 }, {
        x: -distance, duration: distance / 58, ease: "none", repeat: -1
      });
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    }

    var ready = (document.fonts && document.fonts.ready) || Promise.resolve();
    var settled = false;
    var settle = function () {
      if (settled) return;
      settled = true;
      build();
    };
    ready.then(settle).catch(settle);
    setTimeout(settle, 1200); // fonts.ready can hang on a slow connection

    window.addEventListener("resize", onResize, { passive: true });

    band.addEventListener("pointerenter", function () {
      if (loop) gsap.to(loop, { timeScale: 0.2, duration: 0.4 });
    });
    band.addEventListener("pointerleave", function () {
      if (loop) gsap.to(loop, { timeScale: 1, duration: 0.4 });
    });
  }

  function gsapNav() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    ST.create({
      start: 24,
      end: "max",
      onToggle: function (self) { nav.classList.toggle("scrolled", self.isActive); }
    });
  }

  /* ============================================================
     fallback choreography — no GSAP
     ============================================================ */

  var fallbackBound = false;

  function fallbackMotion() {
    var revealed = all("[data-reveal]");
    if (!("IntersectionObserver" in window)) { showEverything(); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealed.forEach(function (el) { io.observe(el); });

    var counters = all("[data-count]");
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        cio.unobserve(entry.target);
        var el = entry.target;
        var raw = el.getAttribute("data-count");
        var target = parseFloat(raw);
        var decimals = (raw.split(".")[1] || "").length;
        var start = null;
        (function tick(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / 1400, 1);
          el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
          if (p < 1) requestAnimationFrame(tick);
        })(performance.now());
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });

    if (fallbackBound) return;
    fallbackBound = true;

    var ticking = false;
    function paint() {
      ticking = false;
      var nav = document.querySelector(".nav");
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
      var bar = document.querySelector(".progress");
      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
      }
      all(".parallax").forEach(function (layer) {
        var rect = layer.parentElement.getBoundingClientRect();
        var mid = rect.top + rect.height / 2 - window.innerHeight / 2;
        var shift = Math.max(-1, Math.min(1, mid / window.innerHeight));
        layer.style.transform = "translateY(" + (shift * -1 * rect.height * 0.06).toFixed(1) + "px)";
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    }, { passive: true });
    window.addEventListener("resize", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    }, { passive: true });
    paint();
  }

  /* ============================================================
     boot
     ============================================================ */

  function initPage() {
    bindPageLoader();
    bindChrome();
    bindSpotlight();

    if (reduce.matches) {
      root.classList.remove("gsap-on");
      showEverything();
      return;
    }

    gsap = window.gsap;
    ST = window.ScrollTrigger;
    animated = !!(gsap && ST);

    if (!animated) {
      root.classList.remove("gsap-on");
      fallbackMotion();
      return;
    }

    gsap.registerPlugin(ST);
    root.classList.add("gsap-on");

    /* the preview router swaps pages in place, so clear the old scene */
    ST.getAll().forEach(function (t) { t.kill(); });
    gsap.globalTimeline.clear();

    gsapIntro();
    gsapReveals();
    gsapParallax();
    gsapCounters();
    gsapProgress();
    gsapMarquee();
    gsapNav();
    bindMagnetic();

    ST.refresh();
    window.addEventListener("load", function () { ST.refresh(); }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }

  window.__rsqInitPage = initPage;
})();
