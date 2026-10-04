/* Interactive search / category filter / column sort for papers.md */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var root = document.getElementById("papers-catalog");
    if (!root) return;

    var search = document.getElementById("papers-search");
    var category = document.getElementById("papers-category");
    var countEl = document.getElementById("papers-count");
    var table = document.getElementById("papers-table");
    if (!table || !search || !category) return;

    var tbody = table.tBodies[0];
    var rows = Array.prototype.slice.call(tbody.rows);
    var sortKey = "year";
    var sortDir = -1; // newest first by default

    function cellText(row, idx) {
      var cell = row.cells[idx];
      return cell ? (cell.textContent || "").trim() : "";
    }

    var colIndex = {
      title: 0,
      authors: 1,
      year: 2,
      venue: 3,
      category: 4,
    };

    function applySort() {
      var idx = colIndex[sortKey] != null ? colIndex[sortKey] : 2;
      rows.sort(function (a, b) {
        var av = cellText(a, idx);
        var bv = cellText(b, idx);
        if (sortKey === "year") {
          var an = parseInt(av, 10) || 0;
          var bn = parseInt(bv, 10) || 0;
          return (an - bn) * sortDir;
        }
        return av.localeCompare(bv, undefined, { sensitivity: "base" }) * sortDir;
      });
      rows.forEach(function (r) {
        tbody.appendChild(r);
      });
    }

    function updateCount(visible) {
      if (!countEl) return;
      countEl.textContent = "Showing " + visible + " of " + rows.length + " papers";
    }

    function applyFilter() {
      var q = (search.value || "").trim().toLowerCase();
      var cat = (category.value || "").trim().toLowerCase();
      var visible = 0;
      rows.forEach(function (row) {
        var text = row.getAttribute("data-text") || "";
        var rowCat = row.getAttribute("data-category") || "";
        var okQ = !q || text.indexOf(q) !== -1;
        var okC = !cat || rowCat.split(",").some(function (part) {
          return part.trim() === cat;
        });
        var show = okQ && okC;
        row.hidden = !show;
        if (show) visible += 1;
      });
      updateCount(visible);
    }

    search.addEventListener("input", applyFilter);
    category.addEventListener("change", applyFilter);

    Array.prototype.forEach.call(table.querySelectorAll("th[data-sort]"), function (th) {
      var btn = th.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var key = th.getAttribute("data-sort");
        if (sortKey === key) sortDir = -sortDir;
        else {
          sortKey = key;
          sortDir = key === "year" ? -1 : 1;
        }
        Array.prototype.forEach.call(table.querySelectorAll("th[data-sort]"), function (h) {
          h.removeAttribute("aria-sort");
        });
        th.setAttribute("aria-sort", sortDir > 0 ? "ascending" : "descending");
        applySort();
        applyFilter();
      });
    });

    applySort();
    applyFilter();
  });
})();
