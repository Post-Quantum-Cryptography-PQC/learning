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
  });
})();
