/* server-bot docs — 共通スクリプト
   1. ページ内目次(.toc)のスクロール連動ハイライト
   2. コードブロックのコピーボタン
   3. "/" キーで絞り込みボックスへフォーカス */
(function () {
  "use strict";

  /* ---------- 1. 目次のスクロール連動 ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if (tocLinks.length) {
    var targets = [];
    tocLinks.forEach(function (a) {
      var el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (el) targets.push({ el: el, link: a });
    });
    var headerOffset = function () {
      var h = document.querySelector(".site-header");
      return (h ? h.offsetHeight : 0) + 32;
    };
    var onScroll = function () {
      var y = window.scrollY + headerOffset();
      var current = null;
      targets.forEach(function (t) {
        if (t.el.offsetTop <= y) current = t.link;
      });
      tocLinks.forEach(function (a) {
        a.classList.toggle("active", a === current);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---------- 2. コードブロックのコピーボタン ---------- */
  Array.prototype.slice.call(document.querySelectorAll("pre")).forEach(function (pre) {
    var code = pre.querySelector("code");
    if (!code || !navigator.clipboard) return;
    var wrap = document.createElement("div");
    wrap.className = "pre-wrap";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.setAttribute("aria-label", "コードをコピー");
    btn.title = "コードをコピー";
    /* mdi-content-copy */
    btn.innerHTML = '<svg class="mdi" viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>';
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(code.innerText).then(function () {
        btn.classList.add("copied");
        setTimeout(function () { btn.classList.remove("copied"); }, 1200);
      });
    });
    wrap.appendChild(btn);
  });

  /* ---------- 3. "/" で絞り込みボックスへフォーカス ---------- */
  var filter = document.getElementById("filter");
  if (filter) {
    document.addEventListener("keydown", function (e) {
      var tag = document.activeElement && document.activeElement.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        filter.focus();
      }
    });
  }
})();
