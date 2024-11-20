'use strict';

function displayDishes(dishes) {
    const categories = ["soup", "main-course", "drink", "salad", "dessert"];

    categories.forEach(category => {
        const dishesContainer = document.querySelector(`.${category}-dishes`);

        const sortedDishes = dishes
            .filter(dish => dish.category === category)
            .sort((a, b) => a.name.localeCompare(b.name));

        sortedDishes.forEach(dish => {
            const dishCard = document.createElement("div");
            dishCard.classList.add("dish");
            dishCard.setAttribute("data-dish", dish.keyword);
            dishCard.setAttribute("data-kind", dish.kind);

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

function setupButtonListeners() {
    const dishesContainer = document.querySelectorAll('.dishes');

    dishesContainer.forEach(container => {
        container.querySelectorAll('button').forEach(button => {
            button.addEventListener("click", handleAddButtonClick);
        });
    });

    updateOrderDisplay();
}

async function loadDishes() {
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
        }

        const dishes = await response.json();

        displayDishes(dishes);

        // Вызов установки обработчиков после рендеринга карточек
        setupButtonListeners();
    } catch (error) {
        alert("Не удалось загрузить блюда. Проверьте подключение к серверу.");
    }
}

// Основной скрипт
document.addEventListener("DOMContentLoaded", loadDishes);
