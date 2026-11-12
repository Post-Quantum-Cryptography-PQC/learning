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

  function enhancePqcMermaid() {
    document.querySelectorAll("pre.pqc-mermaid").forEach(mountDiagramStage);
    ensureMermaidApi(function (api) {
      renderPqcMermaidHosts(api);
    });
  }

  function wireDiagramStage(stage) {
    if (stage.dataset.pqcZoomWired) return;
    stage.dataset.pqcZoomWired = "1";

    var viewport = stage.querySelector(".pqc-diagram__viewport");
    var canvas = stage.querySelector(".pqc-diagram__canvas");
    var scale = 1;
    var tx = 0;
    var ty = 0;
    var dragging = false;
    var lastX = 0;
    var lastY = 0;

    function apply() {
      canvas.style.transform =
        "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
    }

    function zoomAt(factor, cx, cy) {
      var next = Math.min(3.2, Math.max(0.45, scale * factor));
      if (next === scale) return;
      var rect = viewport.getBoundingClientRect();
      var px = (cx != null ? cx : rect.left + rect.width / 2) - rect.left;
      var py = (cy != null ? cy : rect.top + rect.height / 2) - rect.top;
      tx = px - (px - tx) * (next / scale);
      ty = py - (py - ty) * (next / scale);
      scale = next;
      apply();
    }

    stage.querySelectorAll(".pqc-diagram__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var act = btn.getAttribute("data-act");
        if (act === "in") zoomAt(1.18);
        else if (act === "out") zoomAt(1 / 1.18);
        else {
          scale = 1;
          tx = 0;
          ty = 0;
          apply();
        }
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
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      viewport.classList.add("is-dragging");
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      tx += e.clientX - lastX;
      ty += e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      apply();
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove("is-dragging");
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
  }

  function scheduleDiagramEnhance() {
    enhancePqcMermaid();
    window.setTimeout(enhancePqcMermaid, 250);
    window.setTimeout(enhancePqcMermaid, 900);
    if (!window.__pqcMermaidObs && typeof MutationObserver !== "undefined") {
      window.__pqcMermaidObs = new MutationObserver(function () {
        enhancePqcMermaid();
      });
      window.__pqcMermaidObs.observe(document.body, {
        childList: true,
        subtree: true,
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

/* Theme toggle: Material flips data-md-color-scheme on body */
(function () {
  if (typeof MutationObserver === "undefined") return;
  var obs = new MutationObserver(function () {
    if (typeof document$ !== "undefined" && document$.next) {
      /* rely on page ready + diagram scheduler */
    }
    var ev = new Event("pqc-theme");
    document.dispatchEvent(ev);
  });
  obs.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-md-color-scheme"]
  });
  document.addEventListener("pqc-theme", function () {
    document.querySelectorAll(".pqc-mermaid-host").forEach(function (h) {
      delete h.dataset.rendered;
    });
  });
})();
