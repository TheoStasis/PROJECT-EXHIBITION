// Select all sections
const sections = document.querySelectorAll('.section');

// Function to handle scrolling
const handleScroll = () => {
    const windowHeight = window.innerHeight; // Get the window height

    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top; // Get the section's position

        // Check if the section is in the viewport
        if (sectionTop < windowHeight * 0.8 && sectionTop > 0) {
            section.classList.add('visible'); // Add visible class when in view
        } else {
            section.classList.remove('visible'); // Remove visible class when out of view
        }
    });
};

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Trigger scroll event once to apply effect on page load
handleScroll();
