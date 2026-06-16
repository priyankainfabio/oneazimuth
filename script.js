const toggle = document.querySelector(".menu-btn");
const menu = document.querySelector("[data-menu]");
const year = document.querySelector("[data-year]");
const forms = document.querySelectorAll("form");
const heroNav = document.querySelector(".hero-nav");
const audienceCarousel = document.querySelector("[data-audience-carousel]");
const revealItems = document.querySelectorAll(
  ".stats, .stat-box, .problem-section .section-title, .problem-grid article, .infra-copy, .infra-map, .services .section-title, .services-grid article, .why-heading, .why-card, .partner-audience-copy, .audience-card, .audience-controls, .features-copy, .feature-grid article, .features-vehicle, .partner-vehicle, .cta-copy, .lead-form, .partner-final"
);

if (year) {
  year.textContent = new Date().getFullYear();
}

if (window.lucide) {
  window.lucide.createIcons();
}

const updateNavState = () => {
  if (!heroNav) return;
  heroNav.classList.toggle("is-scrolled", window.scrollY > 40);
};

updateNavState();
window.addEventListener("scroll", updateNavState, { passive: true });

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

if (audienceCarousel) {
  const track = audienceCarousel.querySelector("[data-audience-track]");
  const previous = audienceCarousel.querySelector("[data-audience-prev]");
  const next = audienceCarousel.querySelector("[data-audience-next]");
  const dotsWrap = audienceCarousel.querySelector("[data-audience-dots]");

  if (track && previous && next && dotsWrap) {
    const cards = Array.from(track.querySelectorAll(".audience-card"));
    const dots = cards.map((_, index) => {
      const dot = document.createElement("button");
      dot.className = "audience-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to partner audience ${index + 1}`);
      dotsWrap.appendChild(dot);
      return dot;
    });

    const getStep = () => {
      const firstCard = cards[0];
      if (!firstCard) return track.clientWidth;
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const getActiveIndex = () => {
      const step = getStep();
      if (!step) return 0;
      return Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    };

    const updateDots = () => {
      const activeIndex = getActiveIndex();
      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === activeIndex);
      });
    };

    const scrollToIndex = (index) => {
      const targetIndex = Math.min(cards.length - 1, Math.max(0, index));
      track.scrollTo({ left: getStep() * targetIndex, behavior: "smooth" });
    };

    previous.addEventListener("click", () => scrollToIndex(getActiveIndex() - 1));
    next.addEventListener("click", () => scrollToIndex(getActiveIndex() + 1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => scrollToIndex(index)));
    track.addEventListener("scroll", window.requestAnimationFrame ? () => window.requestAnimationFrame(updateDots) : updateDots, {
      passive: true,
    });
    window.addEventListener("resize", updateDots);
    updateDots();
  }
}

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
