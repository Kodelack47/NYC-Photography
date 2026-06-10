// Get the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Initialize an empty cart array
let cart = [];

// Get the cart element
const cartElement = document.querySelector(".cart");

// Add event listener to each "Add to Cart" button
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

// Add product to cart
function addToCart(event) {
  // Get the product details
  const product = event.target.parentElement;
  const productName = product.querySelector("h3").innerText;
  const productPrice = product.querySelector("p").innerText;
  const productImage = product.querySelector("img").src;
  
  // Check if the product is already in the cart
  const cartItem = cart.find((item) => item.name === productName);
  
  if (cartItem) {
    // Increase the quantity of the existing product in the cart
    cartItem.quantity++;
  } else {
    // Add the product to the cart
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }
  
  // Update the cart
  updateCart();
}

// Update the cart
function updateCart() {
  // Get the cart list element
  const cartList = cartElement.querySelector("ul");
  
  // Clear the cart list
  cartList.innerHTML = "";
  
  // Calculate the total price
  let totalPrice = 0;
  
  // Create a new list item for each product in the cart
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    
    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    
    const nameElement = document.createElement("span");
    nameElement.innerText = item.name;
    
    const quantityElement = document.createElement("span");
    quantityElement.innerText = ` x ${item.quantity}`;
    
    const priceElement = document.createElement("span");
    priceElement.innerText = item.price;
    
    listItem.appendChild(imageElement);
    listItem.appendChild(nameElement);
    listItem.appendChild(quantityElement);
    listItem.appendChild(priceElement);
    
    cartList.appendChild(listItem);
    
    // Calculate the total price
    totalPrice += parseFloat(item.price.replace("$", "")) * item.quantity;
  });
  
  // Update the total price in the cart
  cartElement.querySelector("p").innerText = `Total: $${totalPrice.toFixed(2)}`;
}