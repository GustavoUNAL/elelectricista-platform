(function () {
  const fullText = "el electricista .com";
  const el = document.getElementById("typewriter");
  const wrap = document.querySelector(".typewriter-wrap");
  if (!el || !wrap) return;

  let i = 0;
  const speedMs = 85;
  const pauseAfterDone = 600;

  function tick() {
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      i += 1;
      setTimeout(tick, speedMs);
    } else {
      setTimeout(function () {
        wrap.classList.add("typewriter-done");
      }, pauseAfterDone);
    }
  }

  tick();

  const toggle = document.querySelector(".nav-toggle");
  const mobile = document.getElementById("nav-mobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
    });
    mobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      });
    });
  }
})();
