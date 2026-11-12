/* PQC Learn — reading progress + checkpoint toggles */
(function () {
  var STORAGE_KEY = "pqc-learn-progress-v1";
  var CHECK_KEY = "pqc-learn-checks-v1";

  function ready(fn) {
    if (typeof document$ !== "undefined" && document$.subscribe) {
      document$.subscribe(fn);
    } else if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  function load(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  function save(key, obj) {
    try {
      localStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
      /* private mode / quota — ignore */
    }
  }

  function pathKey() {
    var path = location.pathname || "/";
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    return path;
  }

  function teachLinks() {
    return Array.prototype.slice.call(
      document.querySelectorAll(
        '.md-nav--primary a.md-nav__link[href]:not([href^="#"]):not([href^="http"])'
      )
    );
  }

  function markVisitedNav(progress) {
    teachLinks().forEach(function (a) {
      try {
        var u = new URL(a.href, location.origin);
        var key = u.pathname;
        if (key.length > 1 && key.endsWith("/")) key = key.slice(0, -1);
        if (progress[key]) a.classList.add("pqc-visited");
        else a.classList.remove("pqc-visited");
      } catch (e) {
        /* ignore bad hrefs */
      }
    });
  }

  function ensureProgressChip(progress) {
    var article = document.querySelector("article.md-content__inner");
    if (!article) return;

    var total = 0;
    var seen = {};
    teachLinks().forEach(function (a) {
      try {
        var u = new URL(a.href, location.origin);
        var key = u.pathname;
        if (key.length > 1 && key.endsWith("/")) key = key.slice(0, -1);
        if (!seen[key]) {
          seen[key] = true;
          total += 1;
        }
      } catch (e) {}
    });
    if (!total) return;

    var done = 0;
    Object.keys(seen).forEach(function (k) {
      if (progress[k]) done += 1;
    });
    var pct = Math.round((done / total) * 100);

    var chip = document.getElementById("pqc-progress");
    if (!chip) {
      chip = document.createElement("div");
      chip.id = "pqc-progress";
      chip.className = "pqc-progress";
      chip.innerHTML =
        '<span class="pqc-progress__label"></span>' +
        '<div class="pqc-progress__bar" aria-hidden="true"><div class="pqc-progress__fill"></div></div>' +
        '<button type="button" class="pqc-progress__reset" title="Clear local reading progress">Reset</button>';
      article.insertBefore(chip, article.firstChild);
      chip.querySelector(".pqc-progress__reset").addEventListener("click", function () {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(CHECK_KEY);
        location.reload();
      });
    }
    chip.querySelector(".pqc-progress__label").textContent =
      "Read " + done + " / " + total + " pages (" + pct + "%)";
    chip.querySelector(".pqc-progress__fill").style.width = pct + "%";
    chip.setAttribute("aria-label", "Reading progress " + pct + " percent");
  }

  function wireCheckpoints() {
    var checks = load(CHECK_KEY);
    var page = pathKey();
    var nodes = document.querySelectorAll(".md-typeset strong");
    Array.prototype.forEach.call(nodes, function (strong) {
      if ((strong.textContent || "").trim() !== "Checkpoint:") return;
      var p = strong.closest("p");
      if (!p || p.dataset.pqcCheckWired) return;
      p.dataset.pqcCheckWired = "1";

      var id =
        "cp:" +
        page +
        ":" +
        (p.textContent || "")
          .trim()
          .slice(0, 80)
          .toLowerCase()
          .replace(/\s+/g, " ");

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pqc-check";
      btn.textContent = "Mark checkpoint done";
      var pressed = !!checks[id];
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");
      if (pressed) btn.textContent = "Checkpoint done";

      btn.addEventListener("click", function () {
        var on = btn.getAttribute("aria-pressed") !== "true";
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        btn.textContent = on ? "Checkpoint done" : "Mark checkpoint done";
        var next = load(CHECK_KEY);
        if (on) next[id] = true;
        else delete next[id];
        save(CHECK_KEY, next);
      });

      p.insertAdjacentElement("afterend", btn);
    });
  }

  function enhanceDetails() {
    document.querySelectorAll(".md-typeset details > summary").forEach(function (s) {
      if (s.dataset.pqcDetails) return;
      s.dataset.pqcDetails = "1";
      s.setAttribute("role", "button");
    });
  }

  function isDarkScheme() {
    return (
      document.body.getAttribute("data-md-color-scheme") === "slate" ||
      document.documentElement.getAttribute("data-md-color-scheme") === "slate"
    );
  }

  function ensureMermaidApi(cb) {
    if (window.mermaid && typeof window.mermaid.render === "function") {
      cb(window.mermaid);
      return;
    }
    if (window.__pqcMermaidLoading) {
      window.__pqcMermaidLoading.push(cb);
      return;
    }
    window.__pqcMermaidLoading = [cb];
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
    s.onload = function () {
      var api = window.mermaid;
      var q = window.__pqcMermaidLoading || [];
      window.__pqcMermaidLoading = null;
      q.forEach(function (fn) {
        fn(api);
      });
    };
    s.onerror = function () {
      window.__pqcMermaidLoading = null;
    };
    document.head.appendChild(s);
  }

  function configureMermaid(api) {
    var dark = isDarkScheme();
    api.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: dark ? "dark" : "base",
      themeVariables: dark
        ? {
            background: "#000000",
            primaryColor: "#115e59",
            primaryTextColor: "#ecfeff",
            primaryBorderColor: "#99f6e4",
            lineColor: "#99f6e4",
            secondaryColor: "#0f766e",
            tertiaryColor: "#134e4a",
            fontFamily: "IBM Plex Sans, system-ui, sans-serif",
            fontSize: "16px"
          }
        : {
            background: "#ffffff",
            primaryColor: "#0f766e",
            primaryTextColor: "#ecfeff",
            primaryBorderColor: "#5eead4",
            lineColor: "#0f766e",
            secondaryColor: "#115e59",
            tertiaryColor: "#ccfbf1",
            fontFamily: "IBM Plex Sans, system-ui, sans-serif",
            fontSize: "16px"
          },
      flowchart: {
        htmlLabels: true,
        curve: "basis",
        nodeSpacing: 48,
        rankSpacing: 64,
        padding: 16
      }
    });
  }

  function sourceFromPre(pre) {
    var code = pre.querySelector("code");
    return ((code && code.textContent) || pre.textContent || "").trim();
  }

  function mountDiagramStage(pre) {
    if (pre.closest(".pqc-diagram")) return pre.closest(".pqc-diagram");
    var stage = document.createElement("div");
    stage.className = "pqc-diagram";
    stage.innerHTML =
      '<div class="pqc-diagram__toolbar">' +
      '<span class="pqc-diagram__hint">Drag to pan · Ctrl/⌘+scroll to zoom</span>' +
      '<button type="button" class="pqc-diagram__btn" data-act="out" aria-label="Zoom out">−</button>' +
      '<button type="button" class="pqc-diagram__btn" data-act="in" aria-label="Zoom in">+</button>' +
      '<button type="button" class="pqc-diagram__btn" data-act="reset" aria-label="Reset view">Reset</button>' +
      "</div>" +
      '<div class="pqc-diagram__viewport" tabindex="0">' +
      '<div class="pqc-diagram__canvas"></div>' +
      "</div>";
    pre.parentNode.insertBefore(stage, pre);
    var canvas = stage.querySelector(".pqc-diagram__canvas");
    var host = document.createElement("div");
    host.className = "pqc-mermaid-host";
    host.dataset.source = sourceFromPre(pre);
    canvas.appendChild(host);
    pre.remove();
    wireDiagramStage(stage);
    return stage;
  }

  function renderPqcMermaidHosts(api) {
    configureMermaid(api);
    var hosts = document.querySelectorAll(".pqc-mermaid-host");
    var i = 0;
    function next() {
      if (i >= hosts.length) return;
      var host = hosts[i++];
      var src = host.dataset.source || "";
      if (!src) {
        next();
        return;
      }
      /* Re-render when theme flips or first paint */
      var sig = (isDarkScheme() ? "d:" : "l:") + src.length;
      if (host.dataset.rendered === sig && host.querySelector("svg")) {
        next();
        return;
      }
      var id = "pqc-mmd-" + Math.random().toString(36).slice(2, 10);
      api
        .render(id, src)
        .then(function (out) {
          host.innerHTML = out.svg;
          host.dataset.rendered = sig;
          if (out.bindFunctions) out.bindFunctions(host);
          var stage = host.closest(".pqc-diagram");
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              if (stage && stage.__pqcFit) stage.__pqcFit();
            });
          });
          next();
        })
        .catch(function (err) {
          host.innerHTML =
            '<p class="pqc-diagram__error">Diagram failed to render.</p>';
          host.dataset.rendered = "err";
          console.warn("pqc-mermaid render failed", err);
          next();
        });
    }
    next();
  }

  var __pqcEnhanceBusy = false;
  function enhancePqcMermaid() {
    if (__pqcEnhanceBusy) return;
    __pqcEnhanceBusy = true;
    try {
      document.querySelectorAll("pre.pqc-mermaid").forEach(mountDiagramStage);
      /* Refresh fit handlers on already-mounted stages (hot JS updates / instant nav). */
      document.querySelectorAll(".pqc-diagram").forEach(wireDiagramStage);
    } finally {
      window.setTimeout(function () {
        __pqcEnhanceBusy = false;
      }, 0);
    }
    ensureMermaidApi(function (api) {
      renderPqcMermaidHosts(api);
      window.setTimeout(fitVisibleDiagrams, 50);
    });
  }

  function wireDiagramStage(stage) {
    var viewport = stage.querySelector(".pqc-diagram__viewport");
    var canvas = stage.querySelector(".pqc-diagram__canvas");
    var state = stage.__pqcZoomState || {
      scale: 1,
      tx: 0,
      ty: 0,
      dragging: false,
      lastX: 0,
      lastY: 0
    };
    stage.__pqcZoomState = state;

    function apply() {
      canvas.style.transform =
        "translate(" + state.tx + "px," + state.ty + "px) scale(" + state.scale + ")";
    }

    function normalizeSvgSizing(svg) {
      /*
        Mermaid often emits width="100%". Measuring that as if it were viewBox
        pixels, then scaling again, double-shrinks the drawing.
      */
      var vb = svg.viewBox && svg.viewBox.baseVal;
      var w = vb && vb.width > 1 ? vb.width : 0;
      var h = vb && vb.height > 1 ? vb.height : 0;
      if (!(w > 1 && h > 1)) return;
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));
      svg.style.width = w + "px";
      svg.style.height = h + "px";
      svg.style.maxWidth = "none";
      svg.style.maxHeight = "none";
    }

    function fitToViewport() {
      var svg = canvas.querySelector("svg");
      if (!svg) return;
      var vw = viewport.clientWidth;
      var vh = viewport.clientHeight;
      if (vw < 8 || vh < 8) {
        stage.dataset.pqcNeedsFit = "1";
        return;
      }
      canvas.style.transform = "translate(0px, 0px) scale(1)";
      normalizeSvgSizing(svg);
      void svg.getBoundingClientRect();
      var rect = svg.getBoundingClientRect();
      var sw = rect.width;
      var sh = rect.height;
      if (!sw || !sh) {
        stage.dataset.pqcNeedsFit = "1";
        return;
      }
      var pad = 8;
      var availW = Math.max(8, vw - pad * 2);
      var availH = Math.max(8, vh - pad * 2);
      state.scale = Math.min(availW / sw, availH / sh);
      state.tx = pad + (availW - sw * state.scale) / 2;
      state.ty = pad + (availH - sh * state.scale) / 2;
      stage.dataset.pqcNeedsFit = "0";
      apply();
    }

    stage.__pqcFit = fitToViewport;

    /* Already wired: refresh fit only; do not bind duplicate listeners. */
    if (stage.dataset.pqcZoomWired === "1") {
      fitToViewport();
      return;
    }
    stage.dataset.pqcZoomWired = "1";

    function zoomAt(factor, cx, cy) {
      var next = Math.min(4, Math.max(0.2, state.scale * factor));
      if (next === state.scale) return;
      var rect = viewport.getBoundingClientRect();
      var px = (cx != null ? cx : rect.left + rect.width / 2) - rect.left;
      var py = (cy != null ? cy : rect.top + rect.height / 2) - rect.top;
      state.tx = px - (px - state.tx) * (next / state.scale);
      state.ty = py - (py - state.ty) * (next / state.scale);
      state.scale = next;
      apply();
    }

    stage.querySelectorAll(".pqc-diagram__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var act = btn.getAttribute("data-act");
        if (act === "in") zoomAt(1.18);
        else if (act === "out") zoomAt(1 / 1.18);
        else fitToViewport();
      });
    });

    viewport.addEventListener(
      "wheel",
      function (e) {
        if (!(e.ctrlKey || e.metaKey)) return;
        e.preventDefault();
        zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX, e.clientY);
      },
      { passive: false }
    );

    viewport.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      viewport.classList.add("is-dragging");
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener("pointermove", function (e) {
      if (!state.dragging) return;
      state.tx += e.clientX - state.lastX;
      state.ty += e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      apply();
    });
    function endDrag(e) {
      if (!state.dragging) return;
      state.dragging = false;
      viewport.classList.remove("is-dragging");
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    if (typeof ResizeObserver !== "undefined") {
      var roTimer = null;
      var ro = new ResizeObserver(function () {
        window.clearTimeout(roTimer);
        roTimer = window.setTimeout(fitToViewport, 40);
      });
      ro.observe(viewport);
    }
  }

  function fitVisibleDiagrams() {
    document.querySelectorAll(".pqc-diagram").forEach(function (stage) {
      var viewport = stage.querySelector(".pqc-diagram__viewport");
      if (!viewport || viewport.clientWidth < 8 || viewport.clientHeight < 8) {
        stage.dataset.pqcNeedsFit = "1";
        return;
      }
      if (stage.__pqcFit) stage.__pqcFit();
    });
  }

  function wireTabFit() {
    if (window.__pqcTabFitWired) return;
    window.__pqcTabFitWired = true;
    document.addEventListener(
      "change",
      function (e) {
        var t = e.target;
        if (!t || !t.matches || !t.matches('.tabbed-set input[type="radio"]'))
          return;
        window.setTimeout(fitVisibleDiagrams, 30);
        window.setTimeout(fitVisibleDiagrams, 120);
      },
      true
    );
    window.addEventListener("resize", function () {
      window.clearTimeout(window.__pqcFitResizeTimer);
      window.__pqcFitResizeTimer = window.setTimeout(fitVisibleDiagrams, 80);
    });
  }

  function scheduleDiagramEnhance() {
    enhancePqcMermaid();
    wireTabFit();
    /* Instant-nav / late tab paint — finite retries only (no childList observer). */
    window.setTimeout(enhancePqcMermaid, 300);
    window.setTimeout(function () {
      enhancePqcMermaid();
      fitVisibleDiagrams();
    }, 1200);

    if (!window.__pqcThemeObs && typeof MutationObserver !== "undefined") {
      var themeTimer = null;
      window.__pqcThemeObs = new MutationObserver(function () {
        /* Theme flip only — never observe childList (that caused a tab hang). */
        document.querySelectorAll(".pqc-mermaid-host").forEach(function (h) {
          delete h.dataset.rendered;
        });
        window.clearTimeout(themeTimer);
        themeTimer = window.setTimeout(function () {
          enhancePqcMermaid();
          window.setTimeout(fitVisibleDiagrams, 80);
        }, 50);
      });
      window.__pqcThemeObs.observe(document.body, {
        attributes: true,
        attributeFilter: ["data-md-color-scheme"]
      });
    }
  }

  ready(function () {
    var progress = load(STORAGE_KEY);
    var key = pathKey();
    if (key.indexOf("/learning") !== -1 || key.length > 1) {
      progress[key] = Date.now();
      save(STORAGE_KEY, progress);
    }
    markVisitedNav(progress);
    ensureProgressChip(progress);
    wireCheckpoints();
    enhanceDetails();
    scheduleDiagramEnhance();
  });
})();
