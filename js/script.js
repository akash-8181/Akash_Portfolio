
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.offcanvas-toggle');
  const offcanvas = document.getElementById('offcanvasRight');
  const closeBtn = offcanvas.querySelector('.offcanvas-close');
  const navItems = document.querySelectorAll('.nav-item');
  const navIcon = document.querySelector('.nav-icon');

  // Bootstrap Offcanvas instance
  const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);

    gsap.from(navIcon, {
    duration: 1,
    y: -150,
    opacity: 0,
    ease: "back.out(1.7)"
  });

  // GSAP timeline (paused initially)
  const tl = gsap.timeline({ paused: false });

  tl.from(navItems, {
    duration: 1,
    x: 200,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out"
  });

  // When Offcanvas opens
  offcanvas.addEventListener('show.bs.offcanvas', () => {
    tl.restart(); // play GSAP animation on open
  });



  // Optional: Close offcanvas when any nav link is clicked
  document.querySelectorAll('.main-menu a').forEach(link => {
    link.addEventListener('click', () => {
      bsOffcanvas.hide();
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
  window.addEventListener('resize', () => {
      location.reload(); // Simple solution for demo
  });
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
const projects = [
  {
    title: "Stock Management",
    description: "Stock management of different companies and their products, customer can buy Stock of their choice as available.",
    tools: [".NET", "C#", "SQL"],
    images: [
      "./images/stock.webp",
    ],
    link: "https://github.com/akash-8181/Stock_management.git"
  },
  {
    title: "Travel App",
    description: "Travel app is best for travel agency to manage customers travelling and bookings.",
    tools: ["Flutter", "Dart", "Firebase"],
    images: [
      "./images/travel.png",
    ],
    link: "https://github.com/akash-8181/Travel_application.git"
  },
  {
    title: "Champion Squad",
    description: "Champion Squad is includes all kind of bookings(hotel, flight, car, etc.), stock management, Movie Booking, E-commerce, Food Ordering.",
    tools: ["Flutter", "Dart", "Firebase"],
    images: [
      "./images/one-for-all.png",
    ],
    link: "https://github.com/akash-8181/Champion_Sqard-one-for-all-.git"
  }
];

const container = document.getElementById("projects-container");
const modal = document.getElementById("project-modal");

projects.forEach(project => {
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

    const imgEl = document.createElement("img");
    imgEl.src = project.images[0];
    imgEl.alt = project.title;
    imgEl.classList.add("main-modal-image");
    imageContainer.appendChild(imgEl);

    modal.style.display = "block";
  });

  container.appendChild(card);
});

// Close modal on outside click
window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});