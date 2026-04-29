document.addEventListener("DOMContentLoaded", () => {

  // ✅ WORD TYPING (same)
  const words = [
    "UI/UX Designer",
    "CSE Graduate",
    "Nerd Coder",
    "Tech Learner"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const el = document.getElementById("changing-text");

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      el.innerHTML = currentWord.substring(0, charIndex++);
      if (charIndex > currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      el.innerHTML = currentWord.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }

  typeEffect();

  // ✅ PROJECT
  let currentImages = [];
  let currentIndex = 0;

  const container = document.getElementById("project-container");
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modal-img");

  fetch("projects.json")
    .then(res => res.json())
    .then(data => {

      window.projectsData = data;

      container.innerHTML = data.map((p, index) => `
        <div class="card">
          <img src="${p.images[0]}" />
          <div class="card-content">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <button class="view-btn" onclick="openGallery(${index})">Preview</button>
          </div>
        </div>
      `).join("");
    });

  window.openGallery = (i) => {
    currentImages = window.projectsData[i].images;
    currentIndex = 0;
    modal.style.display = "flex";
    modalImg.src = currentImages[0];
  };

  window.nextImg = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  };

  window.prevImg = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  };

  document.querySelector(".close").onclick = () => modal.style.display = "none";

  // ✅ FIXED SCROLL ANIMATION (🔥 repeat every time)
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;

      if (top < window.innerHeight - 80) {
        el.classList.add("active");
      } else {
        el.classList.remove("active"); // 🔥 THIS LINE FIXES REPEAT ANIMATION
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
});

function toggleMenu() {
  document.querySelector(".nav ul").classList.toggle("show");
}