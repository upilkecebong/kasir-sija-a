if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var hapusCart = document.getElementsByClassName("delete-button");
  for (var i = 0; i < hapusCart.length; i++) {
    var button = hapusCart[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("jumlah");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButton = document.getElementsByClassName("add");
  for (var i = 0; i < addToCartButton.length; i++) {
    var input = addToCartButton[i];
    input.addEventListener("click", addToCartClicked);
  }

  document.getElementsByClassName("bayar")[0].addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  var cartItems = document.getElementsByClassName("chart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  UpdateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  UpdateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.getElementsByClassName("title")[0].innerText;
  var price = shopItem.getElementsByClassName("harga")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("foto")[0].src;
  console.log(price);
  addItemToCart(title, price, imageSrc);
  UpdateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartItems = document.getElementsByClassName("chart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  // Periksa apakah item dengan nama yang sama sudah ada di keranjang
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert("Menu ini sudah ditambahkan ke keranjang.");
      return;
    }
  }

  // Jika tidak ada item dengan nama yang sama, tambahkan item ke keranjang
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-item");
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
        </div>`;

  cartRow.innerHTML = cartRowContents;
  cartItems.appendChild(cartRow);

  // Tambahkan event listener untuk tombol hapus dan input jumlah
  cartRow.getElementsByClassName("delete-button")[0].addEventListener("click", removeCartItem);
  cartRow.getElementsByClassName("jumlah")[0].addEventListener("change", quantityChanged);

  // Perbarui total harga
  UpdateCartTotal();
}

function UpdateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("chart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-item");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("angka")[0];
    var quantityElement = cartRow.getElementsByClassName("jumlah")[0];
    var price = parseFloat(priceElement.innerText.replace("Rp", ""));
    var quantity = quantityElement.value;
    // Only add to the total if quantity is greater than 0
    if (quantity > 0) {
      total += price * quantity;
    }
  }
  document.getElementById("agree").addEventListener("click", function () {
    location.reload(); // Reloads the current page
  });
  document.getElementsByClassName("total-harga")[0].innerText = total;
}
