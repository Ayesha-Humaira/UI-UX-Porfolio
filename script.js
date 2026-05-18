document.addEventListener("DOMContentLoaded", () => {

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

  // =========================
  // PROJECT + GALLERY FIX
  // =========================

  let currentMedia = [];
  let currentIndex = 0;

  const container = document.getElementById("project-container");
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modal-img");

  // create video element for modal (NEW)
  let modalVideo = document.createElement("video");
  modalVideo.className = "modal-img";
  modalVideo.controls = true;
  modalVideo.style.display = "none";
  modal.appendChild(modalVideo);

  function isVideo(file) {
    return file && file.toLowerCase().endsWith(".mp4");
  }

  fetch("projects.json")
    .then(res => res.json())
    .then(data => {

      window.projectsData = data;

      container.innerHTML = data.map((p, index) => {

        const first = p.images[0];
        const mediaTag = isVideo(first)
          ? `<video src="${first}" class="project-media" muted></video>`
          : `<img src="${first}" />`;

        return `
          <div class="card">
            ${mediaTag}
            <div class="card-content">
              <h3>${p.title}</h3>
              <p>${p.desc}</p>
              <button class="view-btn" onclick="openGallery(${index})">Preview</button>
            </div>
          </div>
        `;
      }).join("");
    });

  window.openGallery = (i) => {
    currentMedia = window.projectsData[i].images;
    currentIndex = 0;
    modal.style.display = "flex";

    showMedia(currentMedia[0]);
  };

  function showMedia(src) {
    if (isVideo(src)) {
      modalImg.style.display = "none";
      modalVideo.style.display = "block";
      modalVideo.src = src;
      modalVideo.play();
    } else {
      modalVideo.pause();
      modalVideo.style.display = "none";
      modalImg.style.display = "block";
      modalImg.src = src;
    }
  }

  window.nextImg = () => {
    currentIndex = (currentIndex + 1) % currentMedia.length;
    showMedia(currentMedia[currentIndex]);
  };

  window.prevImg = () => {
    currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
    showMedia(currentMedia[currentIndex]);
  };

  document.querySelector(".close").onclick = () => {
    modal.style.display = "none";
    modalVideo.pause();
  };

  // SCROLL ANIMATION
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;

      if (top < window.innerHeight - 80) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
});

function toggleMenu() {
  document.querySelector(".nav ul").classList.toggle("show");
}
