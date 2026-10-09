/* =========================================================
   STRENGTH OF MATERIALS 3 TUTOR E-PORTFOLIO
   MAIN JAVASCRIPT FILE
========================================================= */


/* =========================================================
   1. MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        /*
            Change the menu icon depending on whether
            the navigation is open or closed.
        */

        if (navLinks.classList.contains("show")) {

            menuToggle.textContent = "✕";

        } else {

            menuToggle.textContent = "☰";

        }

    });


    /*
        Close the mobile menu when a navigation
        link is selected.
    */

    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

            menuToggle.textContent = "☰";

        });

    });

}


/* =========================================================
   2. DARK / LIGHT MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");


/*
    Check whether the visitor previously selected
    a theme.
*/

const savedTheme = localStorage.getItem("portfolioTheme");


if (savedTheme === "light") {

    document.body.classList.add("light-mode");

}


/*
    Update the theme button icon.
*/

function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }


    if (document.body.classList.contains("light-mode")) {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to dark mode"
        );

    } else {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );

    }

}


updateThemeIcon();


/*
    Change between dark and light mode.
*/

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");


        /*
            Save the user's choice.
        */

        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem(
                "portfolioTheme",
                "light"
            );

        } else {

            localStorage.setItem(
                "portfolioTheme",
                "dark"
            );

        }


        updateThemeIcon();

    });

}


/* =========================================================
   3. AUTOMATIC ACTIVE NAVIGATION
========================================================= */

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";


const allNavLinks =
    document.querySelectorAll(".nav-links a");


allNavLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href");


    /*
        Remove active class first.
    */

    link.classList.remove("active");


    /*
        Add active class to the current page.
    */

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});


/* =========================================================
   4. SMOOTH SCROLLING
========================================================= */

const internalLinks =
    document.querySelectorAll('a[href^="#"]');


internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetID =
            this.getAttribute("href");


        if (targetID === "#") {
            return;
        }


        const target =
            document.querySelector(targetID);


        if (target) {

            event.preventDefault();


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


/* =========================================================
   5. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".stat-card, .process-card, .feature-card, .highlight-box"
    );


/*
    Add the initial class.
*/

revealElements.forEach(function (element) {

    element.classList.add("scroll-reveal");

});


/*
    Create the observer.
*/

const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


/*
    Observe each element.
*/

revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   6. GALLERY IMAGE ZOOM
========================================================= */

/*
    This section prepares images for the Gallery page.

    Any image with the class:

        class="zoom-image"

    can be clicked to view it larger.
*/


const zoomImages =
    document.querySelectorAll(".zoom-image");


if (zoomImages.length > 0) {


    /*
        Create the image modal.
    */

    const imageModal =
        document.createElement("div");


    imageModal.className =
        "image-modal";


    imageModal.innerHTML = `

        <button class="close-modal">
            ✕
        </button>

        <img src="" alt="Enlarged gallery image">

    `;


    document.body.appendChild(imageModal);


    const modalImage =
        imageModal.querySelector("img");


    const closeModal =
        imageModal.querySelector(".close-modal");


    /*
        Open image.
    */

    zoomImages.forEach(function (image) {

        image.addEventListener("click", function () {

            modalImage.src =
                image.src;


            modalImage.alt =
                image.alt;


            imageModal.classList.add("show");


            document.body.style.overflow =
                "hidden";

        });

    });


    /*
        Close image.
    */

    closeModal.addEventListener(
        "click",
        closeImageModal
    );


    imageModal.addEventListener(
        "click",
        function (event) {

            if (event.target === imageModal) {

                closeImageModal();

            }

        }
    );


    /*
        Close image with ESC key.
    */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                imageModal.classList.contains("show")
            ) {

                closeImageModal();

            }

        }
    );


    function closeImageModal() {

        imageModal.classList.remove("show");

        document.body.style.overflow =
            "";

    }

}


document.querySelectorAll(".evidence-image").forEach(function (image) {

    const placeholder = image.parentElement.querySelector(".evidence-placeholder");

    function showImage() {
        image.hidden = false;
        placeholder.hidden = true;
    }

    image.addEventListener("load", showImage);

    image.addEventListener("error", function () {
        image.hidden = true;
        placeholder.hidden = false;
    });

    if (image.complete && image.naturalWidth > 0) {
        showImage();
    }

});


/* =========================================================
   7. CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
                Find the message area.
            */

            let formMessage =
                document.getElementById(
                    "formMessage"
                );


            /*
                If the message area does not exist,
                create one.
            */

            if (!formMessage) {

                formMessage =
                    document.createElement("p");

                formMessage.id =
                    "formMessage";

                contactForm.appendChild(
                    formMessage
                );

            }


            const subject = "Strength of Materials 3 tutoring enquiry";
            const body = [
                "Name: " + document.getElementById("name").value,
                "Email address or WhatsApp number: " + document.getElementById("email").value,
                "Topic: " + document.getElementById("topicSelect").value,
                "Session preference: " + document.getElementById("sessionType").value,
                "Message: " + document.getElementById("message").value
            ].join("\n");

            formMessage.textContent =
                "Your email application should open with the enquiry ready. Send it from there. If it does not open, contact Vhulenda directly using the links.";

            window.location.href =
                "mailto:sivhadavulenda@gmail.com?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(body);

        }
    );

}


/* =========================================================
   8. BACK TO TOP BUTTON
========================================================= */


/*
    Create the button automatically.
*/

const backToTop =
    document.createElement("button");


backToTop.className =
    "back-to-top";


backToTop.innerHTML =
    "↑";


backToTop.setAttribute(
    "aria-label",
    "Back to top"
);


backToTop.setAttribute(
    "title",
    "Back to top"
);


document.body.appendChild(
    backToTop
);


/*
    Show button after scrolling.
*/

window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


/*
    Scroll back to the top.
*/

backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


const showMoreButton = document.getElementById("showMoreBtn");
const moreAboutInfo = document.getElementById("moreInfo");

if (showMoreButton && moreAboutInfo) {

    showMoreButton.addEventListener("click", function () {

        const isExpanded =
            showMoreButton.getAttribute("aria-expanded") === "true";

        moreAboutInfo.hidden = isExpanded;
        showMoreButton.setAttribute("aria-expanded", String(!isExpanded));
        showMoreButton.textContent = isExpanded
            ? "Show More About My Approach"
            : "Show Less About My Approach";

    });

}


/* =========================================================
   9. PAGE LOADED MESSAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Strength of Materials 3 Tutor Portfolio loaded successfully."
        );

    }
);