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

  function wrapMermaidDiagrams() {
    document.querySelectorAll(".md-typeset .mermaid").forEach(function (host) {
      if (host.closest(".pqc-diagram")) return;
      /* Wait until Mermaid has painted an SVG (or keep retrying via observer) */
      if (!host.querySelector("svg") && host.tagName !== "SVG") return;

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

      host.parentNode.insertBefore(stage, host);
      stage.querySelector(".pqc-diagram__canvas").appendChild(host);
      wireDiagramStage(stage);
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
    wrapMermaidDiagrams();
    window.setTimeout(wrapMermaidDiagrams, 200);
    window.setTimeout(wrapMermaidDiagrams, 800);
    window.setTimeout(wrapMermaidDiagrams, 1800);
    if (!window.__pqcMermaidObs && typeof MutationObserver !== "undefined") {
      window.__pqcMermaidObs = new MutationObserver(function () {
        wrapMermaidDiagrams();
      });
      window.__pqcMermaidObs.observe(document.body, {
        childList: true,
        subtree: true
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
