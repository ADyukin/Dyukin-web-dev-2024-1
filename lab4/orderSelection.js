const order = {
    soup: null,
    main: null,
    drink: null
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
    let totalCost = 0;

    if (!order.soup && !order.main && !order.drink) {
        orderSummary.innerHTML = `<p>Ничего не выбрано</p>`;
        totalCostSection.style.display = 'none';
    } else {
        Object.keys(order).forEach(category => {
            const dish = order[category];
            const categoryTitle = category === 'soup' ? "Суп" : category === 'main' ? "Главное блюдо" : "Напиток";
            const displayText = dish ? `${dish.name} ${dish.price}` : `${categoryTitle} не выбран`;

            orderSummary.innerHTML += `<p><strong>${categoryTitle}</strong></p><p>${displayText}</p>`;

            if (dish) {
                const priceValue = parseFloat(dish.price.replace('₽', '').trim());
                totalCost += priceValue;
            }
        });

        if (totalCost > 0) {
            totalCostSection.innerHTML = `<p><strong>Стоимость заказа:</strong> ${totalCost}₽</p>`;
            totalCostSection.style.display = 'block';
        }
    }
}

function handleAddButtonClick(event) {
    const button = event.target;
    if (button.tagName !== 'BUTTON') return;

    const dishElement = button.closest(".dish");
    const name = dishElement.querySelector('.name').textContent;
    const priceElement = dishElement.querySelector('.price').textContent.trim();
    const price = priceElement.replace(/₽/g, '').trim(); 
    const keyword = dishElement.dataset.keyword; 

    let category = '';
    const sectionTitle = dishElement.closest('section').querySelector('h2').textContent.toLowerCase();
    
    // Проверяем, к какой категории относится выбранный элемент
    if (sectionTitle.includes('суп')) {
        category = 'soup';
    } else if (sectionTitle.includes('главное блюдо')) {
        category = 'main';
    } else if (sectionTitle.includes('напиток')) {
        category = 'drink';
    }

    // Если категория не была определена
    if (!category) {
        console.error("Не удалось определить категорию для блюда:", name);
        return;
    }

    // Обновление заказа в зависимости от выбранного блюда
    if (order[category] && order[category].name === name) {
        order[category] = null;
        dishElement.classList.remove("selected");
    } else {
        order[category] = { name, price: `${price}₽`, keyword };
        
        document.querySelectorAll(`.${category}-dishes .dish`).forEach(div => div.classList.remove("selected"));
        dishElement.classList.add("selected");
    }
    
    updateOrderDisplay();
}


// Обработчик отправки формы
function submitForm(event) {
    event.preventDefault();

    const form = document.querySelector('.form');
    const formData = new FormData(form);

    // Добавляем выбранные блюда в `FormData`
    if (order.soup) {
        formData.append('soup', order.soup.keyword);
    }
    if (order.main) {
        formData.append('main', order.main.keyword);
    }
    if (order.drink) {
        formData.append('drink', order.drink.keyword);
    }

    // Отправка данных на сервер
    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // проверка данных в ответе сервера
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const dishesContainer = document.querySelectorAll('.dishes');
    dishesContainer.forEach(container => {
        container.addEventListener("click", handleAddButtonClick);
    });
    
    document.querySelector('.form').addEventListener('submit', submitForm);
    updateOrderDisplay();
});
