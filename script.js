
// Typing Animation
const typedText = document.querySelector(".typing-text");
const words = ["AI Enthusiast", "Python Developer", "Web Automator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typedText) return;
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  typedText.textContent = currentChar;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 120);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(type, 1000);
  }
}

window.addEventListener("load", () => {
  setTimeout(type, 500);

  // Reveal animations
  const reveals = document.querySelectorAll(".reveal");
  function checkReveal() {
    for (let el of reveals) {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    }
  }
  window.addEventListener("scroll", checkReveal);
  checkReveal();

  // Scroll to top button
  const scrollBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const contactTyping = new Typed('#contact-typing', {
  strings: ['Let\'s Connect!', 'Have a Project?', 'Say Hi 👋'],
  typeSpeed: 80,
  backSpeed: 40,
  loop: true
});

console.log("%cHey dev! Curious mind? 🤓", "color: #7f5af0; font-size: 16px;");

/*cursor effect */
const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'rgba(127, 90, 240, 0.8)'; // purple glow
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

function handleParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].size < 0.5) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  handleParticles();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
ctx.globalCompositeOperation = "lighter";



/*otto suggests */
const ottoTips = [
  "Check out AutoApplyAI — it's job-ready 💼",
  "Otto is not just a bot, he's *the* assistant 🤖",
  "Peek into the EV Monitor project ⚡",
  "Download the resume — it’s 🔥",
  "Explore Projects — 100% hands-on 🚀",
];

let ottoIndex = 0;
const ottoText = document.getElementById("otto-text");
const ottoBox = document.getElementById("otto-suggests");
const ottoBtn = document.getElementById("otto-toggle");

function updateOttoTip() {
  ottoText.textContent = ottoTips[ottoIndex];
  ottoIndex = (ottoIndex + 1) % ottoTips.length;
}
setInterval(updateOttoTip, 5000);
updateOttoTip();

// Toggle display on click
ottoBtn.addEventListener("click", () => {
  ottoBox.style.display = ottoBox.style.display === "none" ? "block" : "none";
});



/* email message */


const form = document.querySelector("form");
const toast = document.getElementById("toast");

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.className = "toast" + (isError ? " error" : "");
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = form.elements["name"].value.trim();
  const email = form.elements["_replyto"].value.trim();
  const message = form.elements["message"].value.trim();

  // 🧪 Custom Validation
  if (name.length < 2) {
    return showToast("Name must be at least 2 characters", true);
  }
  if (!email.includes("@") || !email.includes(".")) {
    return showToast("Please enter a valid email address", true);
  }
  if (message.length < 5) {
    return showToast("Message is too short", true);
  }

  const formData = new FormData(form);
  const response = await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (response.ok) {
    form.reset(); // ✅ Reset form
    showToast("✅ Message sent successfully!");
  } else {
    showToast("❌ Failed to send message. Try again.", true);
  }
});


const devStatus = document.getElementById("dev-status");
const phrases = [
  "🚀 Shipping ideas",
  "🎯 Working on AutoApplyAI",
  "🤖 Training Otto",
  "🧠 Learning new stuff",
  "🔧 Debugging reality"
];
let i = 0;

setInterval(() => {
  devStatus.textContent = phrases[i];
  i = (i + 1) % phrases.length;
}, 2500);

// Optional: Easter Egg click action
document.querySelector('.easter-egg').addEventListener('click', () => {
  alert("✨ You found the magic! Otto says hi 💬");
});
