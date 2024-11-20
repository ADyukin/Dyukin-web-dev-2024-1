const comboRequirements = {
    combo1: ['soup', 'main-course', 'salad', 'drink'],
    combo2: ['soup', 'main-course', 'drink'],
    combo3: ['soup', 'salad', 'drink'],
    combo4: ['main-course', 'salad', 'drink'],
    combo5: ['main-course', 'drink'],
};


function checkOrder() {
    const selectedDishes = Object.keys(order)
        .filter(key => key !== "totalCost" && order[key] !== null);
    let missing = [];

    const isComboValid = Object.values(comboRequirements).some(combo => {
        const missingDishes = combo
            .filter(dish => !selectedDishes.includes(dish));
        if (missingDishes.length === combo.length) {
            missing = missingDishes;
        }
        return missingDishes.length === 0;
    });

    if (!isComboValid) {
        missing = Object.values(comboRequirements)
            .map(combo => combo.filter(dish => !selectedDishes.includes(dish)))
            .find(missingDishes => missingDishes.length > 0) || [];
    }

    return { isComboValid, missing, selectedDishes };
}

function showNotification(message) {

    const notification = document.createElement('div');
    notification.classList.add('notification');

    const text = document.createElement('h3');
    text.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Окей 👌';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(notification);
    });

    notification.appendChild(text);
    notification.appendChild(closeButton);
    document.body.appendChild(notification);
}

function validateForm() {
    const { isComboValid, missing, selectedDishes } = checkOrder();

    if (!isComboValid) {
        let message;

        if (selectedDishes.length === 0) {
            message = 'Ничего не выбрано. Выберите блюда для заказа';
        } else if (missing.includes('drink')) {
            message = 'Выберите напиток';
        } else if (selectedDishes.includes('soup')
            && (missing.includes('main-course')
            || missing.includes('salad'))) {
            message = 'Выберите главное блюдо/салат/стартер';
        } else if (selectedDishes.includes('salad')
            && (missing.includes('soup') || missing.includes('main-course'))) {
            message = 'Выберите суп или главное блюдо';
        } else if ((selectedDishes.includes('drink') ||
            selectedDishes.includes('dessert'))
            && !selectedDishes.includes('main-course')) {
            message = 'Выберите главное блюдо';
        }

        showNotification(message);
        return false; 
    }

    return true;
}

function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(form);
    if (order.soup) formData.append('soup', order.soup.keyword);
    if (order.main) formData.append('main-course', order.main.keyword);
    if (order.drink) formData.append('drink', order.drink.keyword);
    if (order.salad) formData.append('salad', order.salad.keyword);
    if (order.dessert) formData.append('dessert', order.dessert.keyword);
    formData.append('totalCost', `${order.totalCost}₽`);

    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            const newWindow = window.open('', '_blank');
            newWindow.document
                .write('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
            newWindow.document.close();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке заказа.');
        });
}

const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
    if (validateForm()) {
        submitForm(event); 
    } else {
        event.preventDefault();
    }
});
