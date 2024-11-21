const comboRequirements = {
    combo1: ['soup', 'main', 'salad', 'drink'],
    combo2: ['soup', 'main', 'drink'],
    combo3: ['soup', 'salad', 'drink'],
    combo4: ['main', 'salad', 'drink'],
    combo5: ['main', 'drink'],
};


function checkOrder() {
    const selectedDishes = Object.keys(order)
        .filter(key => key !== "totalCost" && order[key] !== null);
    let missing = [];

    const isComboValid = Object.values(comboRequirements).some(combo => {
        const missingDishes = combo
            .filter(dish => !selectedDishes.includes(dish));
        if (missingDishes.length === 0) {
            return true;
        }
        return false;
    });

    if (!isComboValid) {
        missing = Object.values(comboRequirements)
            .map(combo => combo.filter(dish => !selectedDishes.includes(dish)))
            .reduce((shortest, current) => 
                current.length < shortest.length ? current : shortest, 
            Object.values(comboRequirements)[0]
            );
    }

    console.log(missing);
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
        if (selectedDishes.length === 0) {
            message = 'Ничего не выбрано. Выберите блюда для заказа';
        } else if (missing.includes('drink') && missing.length === 1) {
            message = 'Выберите напиток';
        } else if (selectedDishes.includes('soup')
            && (missing.includes('main') || missing.includes('salad'))) {
            message = 'Выберите главное блюдо/салат/стартер';
        } else if (selectedDishes.includes('salad')
            && (missing.includes('soup') || missing.includes('main'))) {
            message = 'Выберите суп или главное блюдо';
        } else {
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
    if (order.main) formData.append('main', order.main.keyword);
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
