const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let foodList = []

// Hide user cards by default
userCardContainer.style.display = 'none';

searchInput.addEventListener("focus", () => {
    userCardContainer.style.display = 'grid'; // Show user cards when search input is focused
});

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    console.log("Search value:", value);
    foodList.forEach(food => {
        const isVisible =
            food.name.toLowerCase().includes(value) ||
            food.price.toLowerCase().includes(value)
        console.log(`Food: ${food.name}, Visible: ${isVisible}`);
        food.element.classList.toggle("hide", !isVisible)
    })

    // Show or hide user cards based on input
    if (value) {
        userCardContainer.style.display = 'grid'; // Show user cards if there is input
    } else {
        userCardContainer.style.display = 'none'; // Hide user cards if input is empty
    }
})

searchInput.addEventListener("blur", () => {
    // Optionally hide user cards when input loses focus
    if (!searchInput.value) {
        userCardContainer.style.display = 'none'; // Hide if input is empty
    }
});

// Fetch food items from both sources
Promise.all([
    fetch('./json/mayuri.json').then(res => res.json()),
    fetch('./json/ub.json').then(res => res.json())
])
.then(([mayuriData, ubData]) => {
    foodList = [...mayuriData, ...ubData].map(food => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const image = card.querySelector("[data-image]")
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        image.src = food.image
        header.textContent = food.name
        body.textContent = food.price

        // Add click event to redirect to the specific food item
        card.addEventListener("click", () => {
            const id = food.id; // Get the ID of the food item
            const baseUrl = food.id.startsWith("MAY") ? "mayuri.html" : "ub.html"; // Determine the base URL
            window.location.href = `${baseUrl}#${id}`; // Redirect to the specific food item
        });

        userCardContainer.append(card)
        return { image: food.image, name: food.name, price: food.price, element: card, id: food.id }
    })
})
