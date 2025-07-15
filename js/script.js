// window.addEventListener('resize', () => {
//   location.reload(); // Simple solution for demo
// });
document.addEventListener('DOMContentLoaded', function () {
  const navIcon = document.querySelector('.nav-icon');
  const offcanvasMenu = document.getElementById('offcanvasMenu');
  const offcanvasNavItems = offcanvasMenu.querySelectorAll('.nav-item');
  const desktopNavItems = document.querySelectorAll('.navbar-collapse .nav-item');
  const bsOffcanvasMenu = new bootstrap.Offcanvas(offcanvasMenu);

  // Logo animation (on page load)
  gsap.from(navIcon, {
    duration: 1,
    y: -150,
    opacity: 0,
    ease: "back.out(1.7)"
  });

  // Desktop nav animation (once on load)
  gsap.from(desktopNavItems, {
    duration: 0.8,
    y: -50,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out"
  });

  // Mobile nav animation timeline (offcanvas)
  const tl = gsap.timeline({ paused: true });

  tl.from(offcanvasNavItems, {
    duration: 0.8,
    x: 100,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out"
  });

  // Animate when offcanvas opens
  offcanvasMenu.addEventListener('show.bs.offcanvas', () => {
    tl.restart();
  });

  // Close offcanvas when any link is clicked
  offcanvasMenu.querySelectorAll('.main-menu a').forEach(link => {
    link.addEventListener('click', () => {
      bsOffcanvasMenu.hide();
    });
  });
});






//contect canvas

document.addEventListener('DOMContentLoaded', function () {
  const offcanvasEl = document.getElementById('staticBackdrop');

  offcanvasEl.addEventListener('shown.bs.offcanvas', () => {
    gsap.from('.offcanvas-body > div', {
      opacity: 0,
      x: -50,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    });

    gsap.from('.offcanvas-body a', {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.6,
      ease: "back.out(1.7)"
    });
  });
});









//banner

(function() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.querySelector("#svg");
  const ViewportX = window.innerWidth;
  const ViewportY = window.innerHeight;
  const listItems = Array.from(document.querySelectorAll(".list-item"));
  
  // Constellation paths data
  const pathArr = [
      {
          id: 0,
          path: createPathStr([74, 34.4, "L", 65.1, 26.8, "L", 68.1, 18.69, "L", 74.8, 24.9, "Z", "M", 74, 34.4, "L", 76.49, 43.2, "L", 78.4, 51.9, "L", 83.35, 55.2]),
          // description: "Web Development - Developing websites and web applications"
      },
      {
          id: 1,
          path: createPathStr([71.61, 83.66, "L", 74.47, 75.95, "L", 77.34, 78.68, "L", 73.95, 87.43, "Z", "M", 71.61, 83.6, "L", 66.66, 89.07, "L", 61.45, 89.07, "L", 56.77, 86.88]),
        //   description: "UI/UX Design - Designing user interfaces and user experiences"
      },
      {
          id: 2,
          path: createPathStr([62.5, 12.56, "L", 46.875, 21.3, "L", 36.45, 27.86, "L", 28.125, 39.89, "M", 46.875, 21.30, "L", 47.65, 30, "L", 49.2, 36]),
        //   description: "SEO - Optimizing websites for search engines"
      },
      {
          id: 3,
          path: createPathStr([19.27, 56.3, "L", 21.875, 50.8, "L", 20.3125, 46.45, "L", 16.66, 45.9, "L", 14, 45.4, "L", 13.28, 51.91 ,"L", 12.76, 61.75, "L", 9.65, 74.68, "L", 8.59, 77.6, "L", 6.8, 78.69, "M", 6.8, 78.69, "L", 4.7, 89.57]),
        //   description: "Digital Marketing - Marketing websites and products online"
      },
  ];

  function createPathStr(pArr) {
      let path = 'M';
      let index = 1;
      pArr.forEach(function(p) {
          if(typeof p === "number") {
              if(index % 2 == 0) {
                  path += " " + (ViewportY - ((p / 100) * ViewportY)).toFixed(0);
                  index++;
              } else {
                  path += " " + (ViewportX - ((p / 100) * ViewportX)).toFixed(0);
                  index++;
              }
          } else {
              path += " " + p;
          }
      });
      return path;
  }

  function drawStars() {
      const starCount = ViewportX >= 1000 ? 200 : 100;
      const animStarCount = ViewportX >= 1000 ? 50 : 25;

      // Static stars
      for (let i = 0; i < starCount; i++) {
          const circle = document.createElementNS(svgNS, "circle");
          const x = Math.random() * ViewportX;
          const y = Math.random() * ViewportY;
          const r = Math.random() * 1.5 + 0.5;
          
          circle.setAttribute("cx", x);
          circle.setAttribute("cy", y);
          circle.setAttribute("r", r);
          circle.setAttribute("fill", "#fff");
          circle.setAttribute("opacity", Math.random() * 0.8 + 0.2);
          circle.classList.add("star");
          svg.appendChild(circle);
      }

      // Animated stars
      for(let i = 0; i < animStarCount; i++) {
          const circle = document.createElementNS(svgNS, "circle");
          const x = Math.random() * ViewportX;
          const y = Math.random() * ViewportY;
          const delay = Math.random() * -6 - 1;

          circle.setAttribute("cx", x);
          circle.setAttribute("cy", y);
          circle.setAttribute("r", 2);
          circle.setAttribute("fill", "#fff");
          circle.classList.add("animate");
          circle.style.animationDelay = delay + "s";
          svg.appendChild(circle);
      }
  }

  function drawConstellation() {
      const id = +this.id;
      const currentPath = pathArr.find(obj => obj.id === id);
      
      // Remove existing constellation
      const existingPath = svg.querySelector("#constellation");
      const existingText = svg.querySelector(".constellation-text");
      if(existingPath) svg.removeChild(existingPath);
      if(existingText) svg.removeChild(existingText);

      // Create path
      const pathEl = document.createElementNS(svgNS, "path");
      pathEl.setAttribute("id", "constellation");
      pathEl.setAttribute("fill", "none");
      pathEl.setAttribute("stroke", "#fff");
      pathEl.setAttribute("stroke-width", 2);
      pathEl.setAttribute("opacity", 0.8);
      pathEl.setAttribute("d", currentPath.path);

      const totalLength = pathEl.getTotalLength();
      pathEl.setAttribute("stroke-dasharray", totalLength);
      pathEl.setAttribute("stroke-dashoffset", totalLength);
      svg.appendChild(pathEl);

      // Add description text
      const textEl = document.createElementNS(svgNS, "text");
      textEl.setAttribute("x", ViewportX * 0.05);
      textEl.setAttribute("y", ViewportY * 0.85);
      textEl.setAttribute("class", "constellation-text");
      textEl.textContent = currentPath.description;
      svg.appendChild(textEl);

      // Add constellation stars
      const pathRegex = /\w\s\d+\s\d+/gi;
      const coords = currentPath.path.match(pathRegex);
      if(coords) {
          coords.forEach(coord => {
              const cleanCoord = coord.replace(/[MLZ]\s/gi, '');
              const [x, y] = cleanCoord.split(' ').map(Number);
              if(x && y) {
                  const star = document.createElementNS(svgNS, "circle");
                  star.setAttribute("cx", x);
                  star.setAttribute("cy", y);
                  star.setAttribute("r", 3);
                  star.setAttribute("class", "cStar");
                  star.setAttribute("stroke", "rgba(255,255,255,0.3)");
                  star.setAttribute("stroke-width", 8);
                  svg.appendChild(star);
              }
          });
      }
  }

  function removeConstellation() {
      const path = svg.querySelector("#constellation");
      const text = svg.querySelector(".constellation-text");
      const stars = svg.querySelectorAll(".cStar");
      
      if(path) svg.removeChild(path);
      if(text) svg.removeChild(text);
      stars.forEach(star => svg.removeChild(star));
  }

  // Initialize
  drawStars();
  
  // Event listeners
  listItems.forEach(item => {
      item.addEventListener("mouseover", drawConstellation);
      item.addEventListener("mouseout", removeConstellation);
  });

  // Responsive resize
  // window.addEventListener('resize', () => {
  //     location.reload(); // Simple solution for demo
  // });
})();





//About me



  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".about-img", {
    scrollTrigger: {
      trigger: ".about-img",
      start: "top 80%",
    },
    duration: 1,
    opacity: 0,
    scale: 0.8,
    ease: "back.out(1.7)"
  });

  gsap.to(".line", {
    scrollTrigger: {
      trigger: ".about-description",
      start: "top 90%",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: "power2.out"
  });

  gsap.from(".edu-card", {
    scrollTrigger: {
      trigger: ".education-section",
      start: "top 90%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: "power2.out"
  });
  

//skills

document.querySelectorAll('.skill-card').forEach(card => {
  const percent = +card.getAttribute('data-percent');
  const fgRing = card.querySelector('.fg-ring');
  const text = card.querySelector('.percent-text');
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  let current = 0;

  const getColor = (val) => {
    if (val >= 90) return 'lime';
    if (val >= 75) return 'gold';
    if (val >= 60) return 'orange';
    return 'red';
  };

  const animate = () => {
    current++;
    const offset = circumference - (current / 100) * circumference;
    fgRing.style.strokeDashoffset = offset;
    fgRing.style.stroke = getColor(current);
    text.textContent = `${current}%`;
    if (current < percent) requestAnimationFrame(animate);
  };

  fgRing.style.strokeDasharray = circumference;
  fgRing.style.strokeDashoffset = circumference;

  setTimeout(() => requestAnimationFrame(animate), 400);
});












//projects
// Academic Projects
const academicProjects = [
  {
    title: "Stock Management",
    description: "Stock management of different companies and their products, customer can buy Stock of their choice as available.",
    tools: [".NET", "C#", "SQL"],
    images: ["./images/stock.webp"],
    link: "https://github.com/akash-8181/Stock_management.git"
  },
  {
    title: "Travel App",
    description: "Travel app is best for travel agency to manage customers travelling and bookings.",
    tools: ["Flutter", "Dart", "Firebase"],
    images: ["./images/travel.png"],
    link: "https://github.com/akash-8181/Travel_application.git"
  },
  {
    title: "Champion Squad",
    description: "Champion Squad includes hotel, flight, car booking, stock management, movie booking, e-commerce, and food ordering.",
    tools: ["Flutter", "Dart", "Firebase"],
    images: ["./images/one-for-all.png"],
    link: "https://github.com/akash-8181/Champion_Sqard-one-for-all-.git"
  }
];

// Freelancing Projects
const freelanceProjects = [
  {
    title: "Freelance Website UI",
    description: "Responsive business portfolio with custom animations and contact form integration.",
    tools: ["HTML", "CSS", "JavaScript", "GSAP"],
    images: ["./images/parth_project.png"],
    link: "https://parthplastopack.com/"
  }
  
];

// Function to render projects into any container
function renderProjects(projectArray, containerId) {
  const container = document.getElementById(containerId);
  const modal = document.getElementById("project-modal");

  projectArray.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${project.images[0]}" alt="${project.title}">
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description.slice(0, 80)}...</p>
      </div>
    `;

    card.addEventListener("click", () => {
      document.getElementById("modal-title").textContent = project.title;
      document.getElementById("modal-desc").textContent = project.description;
      document.getElementById("modal-tools").textContent = `Tools: ${project.tools.join(", ")}`;
      document.getElementById("modal-link").href = project.link;

      const imageContainer = document.getElementById("modal-images");
      imageContainer.innerHTML = "";
      project.images.forEach(img => {
        const imgEl = document.createElement("img");
        imgEl.src = img;
        imgEl.alt = project.title;
        imageContainer.appendChild(imgEl);
      });

      modal.style.display = "block";
    });

    container.appendChild(card);
  });
}

// Render both categories
renderProjects(academicProjects, "academic-projects-container");
renderProjects(freelanceProjects, "freelance-projects-container");

// Close modal on outside click
window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("project-modal")) {
    document.getElementById("project-modal").style.display = "none";
  }
});






//form


// Function to open Gmail with message details from the form
function openMailClientWithMessage(name, email, phone, message) {
  const subject = encodeURIComponent("Contact From Portfolio");
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`);
  const mailtoUrl = `mailto:akashprajapati2563@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;
}

document.querySelector(".send-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !phone || !message) return;
  openMailClientWithMessage(name, email, phone, message);
});


// Minimal Gmail link (no form data)
document.getElementById("emailLink2").addEventListener("click", function (e) {
  e.preventDefault();
  const subject = encodeURIComponent("Contact From Portfolio");
  const body = encodeURIComponent("Hi Akash,\n\nI visited your portfolio and would like to connect.");
  window.location.href = `mailto:akashprajapati2563@gmail.com?subject=${subject}&body=${body}`;
});


// WhatsApp link using name from form
document.getElementById("whatsappLink").addEventListener("click", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim() || "Visitor";
  const phone = "919327424030";
  const text = encodeURIComponent(`Hi, I'm ${name}. I saw your portfolio and want to connect.`);
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
});

// Call button
document.getElementById("callLink").addEventListener("click", function (e) {
  e.preventDefault();
  window.open("tel:9327424030");
});












//footer

document.getElementById("footer-year").textContent = new Date().getFullYear();
