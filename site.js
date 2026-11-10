/* ===== Menu, footer and dark mode — shared by every page =====
   To add, rename or reorder a tab, edit the TABS list below. */
const TABS = [
  ["index.html",        "Home"],
  ["research.html",     "Research"],
  ["publications.html", "Publications"],
  ["education.html",    "Education"],
  ["activities.html",   "Activities & Awards"],
  ["gallery.html",      "Gallery"],
];
const LINKS = [
  ["mailto:kundalkavi98@gmail.com", "Email"],
  ["https://scholar.google.com/citations?user=zPvxbW8AAAAJ&hl=en", "Google Scholar"],
  ["https://www.linkedin.com/in/kavitakundal/", "LinkedIn"],
  ["https://github.com/kundalkavita", "GitHub"],
  ["https://twitter.com/KundalKavita", "X / Twitter"],
];

(function () {
  const here = location.pathname.split("/").pop() || "index.html";
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark"
                                          : matchMedia("(prefers-color-scheme: dark)").matches;

  const header = document.createElement("header");
  header.innerHTML = `<div class="container bar">
      <a class="brand" href="index.html">Kavita Kundal</a>
      <nav aria-label="Main"><ul class="tabs">${TABS.map(([href, name]) =>
        `<li><a href="${href}"${href === here ? ' aria-current="page"' : ""}>${name}</a></li>`).join("")}</ul></nav>
      <button class="theme" type="button"></button>
    </div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.innerHTML = `<div class="container foot">
      <div>© ${new Date().getFullYear()} Kavita Kundal · Department of Radiology, University of California, Davis</div>
      <div class="foot-links">${LINKS.map(([h, n]) => `<a href="${h}">${n}</a>`).join("")}</div>
    </div>`;
  document.body.append(footer);

  const btn = header.querySelector(".theme");
  const label = () => {
    btn.textContent = isDark() ? "☀" : "☾";
    btn.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  };
  label();
  btn.addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    label();
  });

  // keep the current tab visible on phones
  const cur = header.querySelector('[aria-current="page"]');
  const center = () => { if (!cur) return; const t = header.querySelector(".tabs");
    t.scrollLeft = cur.parentElement.offsetLeft - t.offsetLeft - (t.clientWidth - cur.offsetWidth) / 2; };
  center(); addEventListener("load", center);
})();
