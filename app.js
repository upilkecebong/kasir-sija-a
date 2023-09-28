if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){
    var hapusCart = document.getElementsByClassName('delete-button')
    for (var i = 0; i < hapusCart.length; i++){
        var button = hapusCart[i]
        button.addEventListener('click', removeCartItem)            
    }

    var quantityInputs = document.getElementsByClassName('jumlah')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButton = document.getElementsByClassName('add')
    for (var i = 0; i < addToCartButton.length; i++){
        var input = addToCartButton[i]
        input.addEventListener('click', addToCartClicked)
    }  

    document.getElementsByClassName('bayar')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    var cartItems = document.getElementsByClassName('chart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove()
    UpdateCartTotal()
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    UpdateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var price = shopItem.getElementsByClassName('harga')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('foto')[0].src
    console.log(price)
    addItemToCart(title, price, imageSrc)
    UpdateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-item')
    var cartItems = document.getElementsByClassName('chart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('Menu ini sudah ditambahkan ke keranjang.')
            return
        }
    }
    var cartRowContents = `
            <div class="cart-item-image">
                <div class="item-image"><img src=${imageSrc}></div>
                </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${title}</div>
                <div class="cart-item-price">
                    <span class="angka">${price}</span>
                </div>
            </div>
            <div class="cart-item-quantity">
                <input class="jumlah" type="number" value="1">
                <button class="delete-button">&times</button>
            </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('delete-button')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('jumlah')[0].addEventListener('click', quantityChanged)
}

function UpdateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('chart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-item')
    var total = 0
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('angka')[0]
        var quantityElement = cartRow.getElementsByClassName('jumlah')[0]
        var price = parseFloat(priceElement.innerText.replace('Rp', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('total-harga')[0].innerText = total
}