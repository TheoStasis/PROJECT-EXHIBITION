// Select all sections
const sections = document.querySelectorAll('.section');

// Function to handle scrolling
const handleScroll = () => {
  const windowHeight = window.innerHeight; // Get the window height

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top; // Get the section's top position
    const sectionBottom = section.getBoundingClientRect().bottom; // Get the section's bottom position

    // Check if the section is primarily in the viewport
    if (
      sectionTop < windowHeight * 0.5 && // Section's top is above the middle of the viewport
      sectionBottom > windowHeight * 0.5 // Section's bottom is below the middle of the viewport
    ) {
      section.classList.add('visible'); // Add visible class for the focused section
    } else {
      section.classList.remove('visible'); // Remove visible class for unfocused sections
    }
  });
};

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Trigger scroll event once to apply effect on page load
handleScroll();

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.form-control[type="search"]');

  if (searchInput) {
    // Handle focus event
    searchInput.addEventListener('focus', function () {
      const siblingElement = this.nextElementSibling; // Get the next sibling
      if (siblingElement) {
        siblingElement.style.opacity = '0'; // Hide sibling
      }
    });

    // Handle blur event
    searchInput.addEventListener('blur', function () {
      const siblingElement = this.nextElementSibling; // Get the next sibling
      if (siblingElement && this.value === '') {
        siblingElement.style.opacity = '1'; // Show sibling if input is empty
      }
    });
  }
});
