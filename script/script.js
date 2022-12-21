
const form = document.querySelector('#form');
const card_container = document.querySelector('.cards_container');
const info_container = document.querySelector('.total_info');

let products = [];

form.addEventListener('submit', event => {
    event.preventDefault();
    const title = event.target.title.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;
    
    const product = { title, price, quantity };
    products.push(product);

    event.target.title.value = '';
    event.target.price.value = '';
    event.target.quantity.value = '';

    rerender();
});

function createCard(title, price, quantity){
    const card_container = document.createElement('div');
    const card_title = document.createElement('p');
    const card_price = document.createElement('p');
    const card_quantity = document.createElement('p');
    card_container.classList.add('card');
    card_title.classList.add('prod_title');

    let card_sum = 0;
    card_sum = price * quantity;

    card_title.innerText = title;
    card_price.innerText = price;
    card_quantity.innerText = `${price} X ${quantity} = ${card_sum}`;
    card_container.append(card_title, card_price, card_quantity);

    return card_container;
};

function totalInfo(products){
    const info_total_container = document.createElement('div');
    const info_total_sum = document.createElement('p');
    const info_total_quantity = document.createElement('p');

    let total_sum = 0;
    for (let i = 0; i < products.length; i++){
        total_sum += +products[i].price * products[i].quantity;
    };

    let total_quantity = 0;
    for (let i = 0; i < products.length; i++){
        total_quantity += +products[i].quantity;
    };

    info_total_sum.innerText = 'Общая стоимость: ' +total_sum;
    info_total_quantity.innerText = 'Общее количество: ' +total_quantity;

    info_total_container.append(info_total_sum, info_total_quantity);

    info_container.append(info_total_container);
    
};

function rerender(){
    card_container.innerText = '';
    info_container.innerText = '';

    if (products.length === 0){

        const card_none = document.createElement('p');
        card_none.innerText = 'Товаров нет';
        card_container.append(card_none);

        const info_none = document.createElement('p');
        info_none.innerText = 'Товаров нет';
        info_container.append(info_none);

    } else{

        for(let i = 0; i < products.length; i++){
            const card = createCard(products[i].title, products[i].price, products[i].quantity);
            card_container.append(card);
        };

        totalInfo(products);
    };

};

rerender();