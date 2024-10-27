function displayDishes() {
    const categories = ["soup", "main", "drink"];

    categories.forEach(category => {
        const dishesContainer = document.querySelector(`.${category}-dishes`);
        dishesContainer.innerHTML = ""; 

        const sortedDishes = dishes
            .filter(dish => dish.category === category)
            .sort((a, b) => a.name.localeCompare(b.name));

        sortedDishes.forEach(dish => {
            const dishCard = document.createElement("div");
            dishCard.classList.add("dish");
            dishCard.setAttribute("data-dish", dish.keyword);

            dishCard.innerHTML = `
                <img src="${dish.image}" alt="${dish.keyword}">
                <p class="price">${dish.price}₽</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button>Добавить</button>
            `;

            dishesContainer.appendChild(dishCard);
        });
    });
}

document.addEventListener("DOMContentLoaded", displayDishes);