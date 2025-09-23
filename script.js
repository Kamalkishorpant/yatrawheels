// A simple array to simulate car data from a backend
const cars = [
    {
        id: 1,
        make: "Toyota",
        model: "Camry",
        price: 45,
        image: "https://source.unsplash.com/600x400/?toyota,camry"
    },
    {
        id: 2,
        make: "Mercedes",
        model: "C-Class",
        price: 90,
        image: "https://source.unsplash.com/600x400/?mercedes,c-class"
    },
    {
        id: 3,
        make: "Honda",
        model: "Civic",
        price: 50,
        image: "https://source.unsplash.com/600x400/?honda,civic"
    }
];

// Function to generate and display car cards
function displayCars(carList) {
    const carListContainer = document.querySelector('.car-list');
    carListContainer.innerHTML = ''; // Clear existing cars

    carList.forEach(car => {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.make} ${car.model}">
            <div class="car-card-content">
                <h3>${car.make} ${car.model}</h3>
                <p>From $${car.price}/day</p>
                <button>View Details</button>
            </div>
        `;
        carListContainer.appendChild(carCard);
    });
}

// Initial call to display cars on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCars(cars);
});

// Add form submission logic (for demonstration purposes)
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Searching for cars... (This would send data to a backend)');
    // In a real application, you would collect form data and make an API call here.
});