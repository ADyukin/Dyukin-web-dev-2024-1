'use strict';

const order = {
    soup: null,
    main: null,
    drink: null,
    salad: null,
    dessert: null,
    totalCost: 0
};

function updateOrderDisplay() {
    const orderSection = document.querySelector(".order");
    let orderSummary = orderSection.querySelector('.order-summary');
    let totalCostSection = orderSection.querySelector('.total-cost');

    if (!orderSummary) {
        orderSummary = document.createElement('div');
        orderSummary.classList.add('order-summary');
        orderSection.insertBefore(orderSummary, orderSection.firstChild);
    }

    if (!totalCostSection) {
        totalCostSection = document.createElement('div');
        totalCostSection.classList.add('total-cost');
        orderSection.insertBefore(totalCostSection, orderSummary.nextSibling);
    }

    orderSummary.innerHTML = '';
    totalCostSection.innerHTML = '';
    order.totalCost = 0;

    if (
        !order.soup &&
        !order.main &&
        !order.drink &&
        !order.salad &&
        !order.dessert
    ) {
        orderSummary.innerHTML = `<p>Ничего не выбрано</p>`;
        totalCostSection.style.display = 'none';
    } else {
        Object.keys(order).forEach(category => {
            if (category === 'totalCost') return;

            const dish = order[category];
            const categoryTitle = category === 'soup' ? "Суп" :
                category === 'main' ? "Главное блюдо" :
                    category === 'drink' ? "Напиток" :
                        category === 'salad' ? "Салат" : "Десерт";
            const displayText = dish ? `${dish.name} ${dish.price}` : 
                `${categoryTitle} не выбран`;

            orderSummary.innerHTML += `<p><strong>${categoryTitle}
            </strong></p><p>${displayText}</p>`;

            if (dish) {
                const priceValue = parseFloat(
                    dish.price.replace('₽', '').trim()
                );
                order.totalCost += priceValue;
            }
        });

        if (order.totalCost > 0) {
            totalCostSection.innerHTML = `
            <p>
                <strong>Стоимость заказа:</strong> ${order.totalCost}₽
            </p>
            `;
            totalCostSection.style.display = 'block';
        }
    }
}

function handleAddButtonClick(event) {
    const button = event.target;
    const dishElement = button.closest(".dish");

    const keywordWithDataset = dishElement.dataset.dish;
    const name = dishElement.querySelector('.name').textContent;
    const priceElement = dishElement.querySelector('.price').textContent.trim();
    const price = priceElement.replace(/₽/g, '').trim();

    let category = '';
    const sectionTitle = dishElement
        .closest('section')
        .querySelector('h2')
        .textContent
        .toLowerCase();

    if (sectionTitle.includes('суп')) {
        category = 'soup';
    } else if (sectionTitle.includes('главное блюдо')) {
        category = 'main';
    } else if (sectionTitle.includes('напиток')) {
        category = 'drink';
    } else if (sectionTitle.includes('салат')) {
        category = 'salad';
    } else if (sectionTitle.includes('десерт')) {
        category = 'dessert';
    }

    if (!category) {
        console.error("Не удалось определить категорию для блюда:", name);
        return;
    }

    if (order[category] && order[category].name === name) {
        order[category] = null;
        dishElement.classList.remove("selected");
    } else {
        order[category] = {
            name,
            price: `${price}₽`,
            keyword: keywordWithDataset
        };
        
        document
            .querySelectorAll(`.${category}-dishes .dish`)
            .forEach(div => div.classList.remove("selected"));
        dishElement.classList.add("selected");
    }
    
    updateOrderDisplay();
}

function toggleActiveButton(button) {
    const section = button.closest(".filters");
    const buttons = section.querySelectorAll("button"); 
    buttons.forEach(btn => btn.classList.remove("active")); 
    button.classList.add("active");     
}

function filterDishes(category, kind) {
    const dishes = document.querySelectorAll(`.${category}-dishes .dish`);

    dishes.forEach(dish => {
        const dishKind = dish.dataset.kind;
        console.error(dishKind);
        if (!kind || dishKind === kind) {
            dish.style.display = ""; 
        } else {
            dish.style.display = "none";
        }
    });
}

function initFilters() {
    const filterButtons = document.querySelectorAll(".filters button");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button
                .closest("section")
                .querySelector(".dishes")
                .classList[1].split("-")[0];
            const kind = button.dataset.kind;

            if (button.classList.contains("active")) {
                button.classList.remove("active");
                filterDishes(category, null);
            } else {
                toggleActiveButton(button);
                filterDishes(category, kind);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initFilters);


document.addEventListener("DOMContentLoaded", () => {
    const dishesContainer = document.querySelectorAll('.dishes');

    dishesContainer.forEach(container => {
        container.querySelectorAll('button').forEach(button => {
            button.addEventListener("click", handleAddButtonClick);
        });
    });

    updateOrderDisplay();
});
