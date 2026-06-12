const toggle = document.querySelector(".menu-btn");
const menu = document.querySelector("[data-menu]");
const year = document.querySelector("[data-year]");
const forms = document.querySelectorAll("form");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (window.lucide) {
  window.lucide.createIcons();
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (!button) return;

    const original = button.textContent;
    button.textContent = "Request Noted";
    window.setTimeout(() => {
      button.textContent = original;
    }, 2600);
  });
});
