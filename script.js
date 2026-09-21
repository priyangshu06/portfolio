const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => observer.observe(element));
const navItems = document.querySelectorAll(".nav-item");
const pageSections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => {
          item.classList.toggle(
            "active",
            item.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

pageSections.forEach((section) => navObserver.observe(section));
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
const projectTriggers = document.querySelectorAll(".project-trigger");
const dialogCloseButtons = document.querySelectorAll(".dialog-close");

projectTriggers.forEach((project) => {
  const dialog = document.getElementById(project.dataset.dialog);

  project.addEventListener("click", () => dialog.showModal());

  project.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      dialog.showModal();
    }
  });
});

dialogCloseButtons.forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
const projectInformation = {
  "url-audit": {
    label: "PROJECT 02 · BACKEND SERVICE",
    title: "URL Audit Service",
    summary: "A production-focused backend service designed to analyze and validate web URLs.",
    details: [
      "Analyzes and validates web URLs",
      "Built as a backend-focused TypeScript application",
      "Structured for reliable URL auditing workflows",
      "Focuses on clean validation and service design"
    ],
    tech: ["TypeScript", "Backend Development", "URL Validation"]
  },

  translation: {
    label: "PROJECT 03 · GENERATIVE AI",
    title: "Language Translation using Generative AI",
    summary: "A real-time multilingual translation application that processes user input and generates efficient translations.",
    details: [
      "Accepts user input for translation",
      "Uses Generative AI models",
      "Supports multilingual translation workflows",
      "Designed for efficient real-time output"
    ],
    tech: ["Generative AI", "NLP", "Multilingual", "AI"]
  },

  "sales-analysis": {
    label: "PROJECT 04 · AI / ML ANALYTICS",
    title: "Sales Store and Profit Analysis",
    summary: "An AI/ML-based analytics application for finding sales and profit trends from business data.",
    details: [
      "Processes sales and profit data",
      "Generates insights into business performance",
      "Identifies useful trends and patterns",
      "Uses AI/ML for analytical exploration"
    ],
    tech: ["AI / ML", "Data Analysis", "Sales Analytics"]
  },

  "ott-platform": {
    label: "PROJECT 05 · FULL-STACK APP",
    title: "OTT Platform using MERN Stack",
    summary: "A prototype streaming platform built with full-stack functionality for users, video playback, and subscriptions.",
    details: [
      "Includes user authentication",
      "Supports video playback features",
      "Includes subscription-related functionality",
      "Manages users and application data with the MERN stack"
    ],
    tech: ["MERN Stack", "Authentication", "Video Playback", "MongoDB"]
  }
};

const dynamicProjectCards = document.querySelectorAll(".dynamic-project");
const workDetailsDialog = document.getElementById("work-details");

dynamicProjectCards.forEach((card) => {
  const project = projectInformation[card.dataset.project];

  const openProjectDialog = () => {
    document.getElementById("detail-label").textContent = project.label;
    document.getElementById("detail-title").textContent = project.title;
    document.getElementById("detail-summary").textContent = project.summary;

    document.getElementById("detail-list").innerHTML = project.details
      .map((detail) => `<li>${detail}</li>`)
      .join("");

    document.getElementById("detail-tech").innerHTML = project.tech
      .map((technology) => `<span>${technology}</span>`)
      .join("");

    workDetailsDialog.showModal();
  };

  card.addEventListener("click", openProjectDialog);

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectDialog();
    }
  });
});
const progressBar = document.querySelector(".scroll-progress span");

window.addEventListener("scroll", () => {
  const pageHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercent = (window.scrollY / pageHeight) * 100;

  progressBar.style.width = `${scrollPercent}%`;
});
const filterButtons = document.querySelectorAll(".filter-button");
const allProjectCards = document.querySelectorAll(
  "#projects .professional-project"
);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    allProjectCards.forEach((card) => {
      const shouldShow =
        filter === "all" || card.dataset.category === filter;

      card.hidden = !shouldShow;
    });
  });
});