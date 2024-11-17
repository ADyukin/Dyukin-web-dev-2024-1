const dishes = [
    // Супы
    {
        keyword: "gazpacho",
        name: "Гаспачо",
        price: 195,
        category: "soup",
        count: "350 г",
        image: "images/soups/gazpacho.jpg",
        kind: "veg"
    },
    {
        keyword: "mushroom_soup",
        name: "Грибной суп-пюре",
        price: 185,
        category: "soup",
        count: "330 г",
        image: "images/soups/mushroom_soup.jpg",
        kind: "veg"
    },
    {
        keyword: "norwegian_soup",
        name: "Норвежский суп",
        price: 270,
        category: "soup",
        count: "330 г",
        image: "images/soups/norwegian_soup.jpg",
        kind: "fish"
    },
    {
        keyword: "tomyum",
        name: "Том Ям",
        price: 320,
        category: "soup",
        count: "340 г",
        image: "images/soups/tomyum.jpg",
        kind: "fish"
    },
    {
        keyword: "chicken_soup",
        name: "Куриный суп",
        price: 175,
        category: "soup",
        count: "300 г",
        image: "images/soups/chicken.jpg",
        kind: "meat"
    },
    {
        keyword: "ramen",
        name: "Рамен",
        price: 285,
        category: "soup",
        count: "400 г",
        image: "images/soups/ramen.jpg",
        kind: "meat"
    },
    // Главное блюдо
    {
        keyword: "fried_potatoes",
        name: "Жареная картошка с грибами",
        price: 150,
        category: "main",
        count: "250 г",
        image: "images/main_course/friedpotatoeswithmushrooms1.jpg",
        kind: "veg"
    },
    {
        keyword: "pasta",
        name: "Паста с креветками",
        price: 310,
        category: "main",
        count: "300 г",
        image: "images/main_course/shrimppasta.jpg",
        kind: "fish"
    },
    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 385,
        category: "main",
        count: "310 г",
        image: "images/main_course/lasagna.jpg",
        kind: "meat"
    },
    {
        keyword: "pizza",
        name: "Пицца",
        price: 450,
        category: "main",
        count: "400 г",
        image: "images/main_course/pizza.jpg",
        kind: "meat"
    },
    {
        keyword: "fish_rice",
        name: "Рыба с рисом",
        price: 275,
        category: "main",
        count: "300 г",
        image: "images/main_course/fishrice.jpg",
        kind: "fish"
    },
    // Салаты и стартеры
    {
        keyword: "caesar",
        name: "Цезарь",
        price: 210,
        category: "salad",
        count: "200 г",
        image: "images/salads_starters/caesar.jpg",
        kind: "meat"
    },
    {
        keyword: "tuna_salad",
        name: "Салат с тунцом",
        price: 240,
        category: "salad",
        count: "180 г",
        image: "images/salads_starters/tunasalad.jpg",
        kind: "fish"
    },
    {
        keyword: "caprese",
        name: "Капрезе",
        price: 180,
        category: "salad",
        count: "150 г",
        image: "images/salads_starters/caprese.jpg",
        kind: "veg"
    },
    {
        keyword: "frenchfries1_cheese",
        name: "Картошка с сырным соусом",
        price: 175,
        category: "salad",
        count: "200 г",
        image: "images/salads_starters/frenchfries1.jpg",
        kind: "veg"
    },
    {
        keyword: "salad_with_egg",
        name: "Салат с яйцом",
        price: 160,
        category: "salad",
        count: "190 г",
        image: "images/salads_starters/saladwithegg.jpg",
        kind: "veg"
    },
    {
        keyword: "frenchfries_ket",
        name: "Картошка с кетчупом",
        price: 140,
        category: "salad",
        count: "200 г",
        image: "images/salads_starters/frenchfries2.jpg",
        kind: "veg"
    },
    // Напитки
    {
        keyword: "orange_juice",
        name: "Апельсиновый сок",
        price: 120,
        category: "drink",
        count: "300 мл",
        image: "images/beverages/orangejuice.jpg",
        kind: "cold"
    },
    {
        keyword: "apple_juice",
        name: "Яблочный сок",
        price: 90,
        category: "drink",
        count: "300 мл",
        image: "images/beverages/applejuice.jpg",
        kind: "cold"
    },
    {
        keyword: "carrot_juice",
        name: "Морковный сок",
        price: 110,
        category: "drink",
        count: "300 мл",
        image: "images/beverages/carrotjuice.jpg",
        kind: "cold"
    },
    {
        keyword: "tea",
        name: "Чай",
        price: 80,
        category: "drink",
        count: "250 мл",
        image: "images/beverages/tea.jpg",
        kind: "hot"
    },
    {
        keyword: "green_tea",
        name: "Зеленый чай",
        price: 85,
        category: "drink",
        count: "250 мл",
        image: "images/beverages/greentea.jpg",
        kind: "hot"
    },
    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 130,
        category: "drink",
        count: "200 мл",
        image: "images/beverages/cappuccino.jpg",
        kind: "hot"
    },
    // Десерты
    {
        keyword: "baklava",
        name: "Баклава",
        price: 120,
        category: "dessert",
        count: "100 г",
        image: "images/desserts/baklava.jpg",
        kind: "small"
    },
    {
        keyword: "chocolate_cheesecake",
        name: "Шоколадный чизкейк",
        price: 190,
        category: "dessert",
        count: "150 г",
        image: "images/desserts/chocolatecheesecake.jpg",
        kind: "medium"
    },
    {
        keyword: "chocolate_cake",
        name: "Шоколадный торт",
        price: 230,
        category: "dessert",
        count: "180 г",
        image: "images/desserts/chocolatecake.jpg",
        kind: "large"
    },
    {
        keyword: "donuts",
        name: "Пончики",
        price: 140,
        category: "dessert",
        count: "80 г",
        image: "images/desserts/donuts.jpg",
        kind: "small"
    },
    {
        keyword: "donuts2",
        name: "Пончики с глазурью",
        price: 160,
        category: "dessert",
        count: "85 г",
        image: "images/desserts/donuts2.jpg",
        kind: "small"
    },
    {
        keyword: "cheesecake",
        name: "Чизкейк",
        price: 180,
        category: "dessert",
        count: "150 г",
        image: "images/desserts/checheesecake.jpg",
        kind: "medium"
    }
];
