const toggle = document.querySelector(".menu-btn");
const menu = document.querySelector("[data-menu]");
const year = document.querySelector("[data-year]");
const forms = document.querySelectorAll("form");
const revealItems = document.querySelectorAll(
  ".stats, .stat-box, .services .section-title, .services-grid article, .support-photo, .support-card, .why-heading, .why-card, .why-strip, .testimonials .section-title, .testimonial-grid figure, .cta-copy, .lead-form, .final-close"
);

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

if ("IntersectionObserver" in window) {
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-on-scroll");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
