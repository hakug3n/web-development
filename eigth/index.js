window.onload = () => {

    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links").cloneNode(true);
    navLinks.classList.remove("nav-links");
    mobileMenu.appendChild(navLinks);

    document.getElementById("burgerMenu").addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    let slideIndex = 0;
    const slides = document.querySelector(".slides");
    const totalSlides = slides.children.length;
    const dotsContainer = document.querySelector(".dots");

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll(".dot");

    const showSlide = (index) => {
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d) => d.classList.remove("active"));
        dots[index].classList.add("active");
    };

    const nextSlide = () => {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    };

    const prevSlide = () => {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        showSlide(slideIndex);
    };

    const goToSlide = (index) => {
        slideIndex = index;
        showSlide(index);
    };

    document
        .querySelector(".arrows button:first-child")
        .addEventListener("click", prevSlide);

    document
        .querySelector(".arrows button:last-child")
        .addEventListener("click", nextSlide);

    setInterval(nextSlide, 4000);
    showSlide(slideIndex);
};