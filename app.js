let list = document.querySelector('.list')
let listCard = document.querySelector('.citem')
let total = document.querySelector('.total')
let quantity = document.querySelector('.quantity')
let products = [
    {
        id: 0,
        name: 'DAWET SEGER',
        image: 'dawet.jpeg',
        price: 5000
    },
    {
        id: 1,
        name: 'CENIL MUNGIL',
        image: 'cenil.jpeg',
        price: 2000
    },
    {
        id: 2,
        name: 'BAKWAN TELO',
        image: 'bakwan.jfif',
        price: 2000
    },
    {
        id: 3,
        name: 'WAJIK KETAN',
        image: 'wajik.jpg',
        price: 2000
    },
]
let listCards = [];
// fungsi menampilkan list menu
function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <div class="foto"><img src="images/${value.image}"/></div>
            <div class="title">${value.name}</div>
            <div class="harga">Rp <span id="angka">${value.price.toLocaleString()}</div>
            <button class="add" onclick="addToCard(${key})">Masukkan Keranjang</button>
        `;
        list.appendChild(newDiv);
    })
}
initApp();
// fungsi menambahkan ke keranjang
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    reloadCard();
}
// fungsi reload keranjang (refresh hitungan)
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="images/${value.image}"/></div>
            <div>${value.name}</div>
            <div>Rp${value.price.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
            `;
            listCard.appendChild(newDiv);
        }
    })
        total.innerHTML = `<div class="total">
                            <h5>TOTAL</h5>
                            <h3>Rp <span id="total">${totalPrice.toLocaleString()}</span></h3>
                           </div>`;
        quantity.innerHTML = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
