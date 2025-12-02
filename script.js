// Mock product data
const products = [
    { id: 1, name: 'Laptop', price: 999, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Phone', price: 599, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Headphones', price: 199, image: 'https://via.placeholder.com/150' },
];

let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Render products
const productList = document.getElementById('product-list');
products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
});

// Add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    cartCount++;
    cartTotal += product.price;
    updateCart();
}

// Update cart display
function updateCart() {
    document.getElementById('cart-count').textContent = cartCount;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemDiv);
    });
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
    document.getElementById('cart').style.display = cart.length ? 'block' : 'none';
}

// Remove from cart
function removeFromCart(index) {
    const removed = cart.splice(index, 1)[0];
    cartCount--;
    cartTotal -= removed.price;
    updateCart();
}

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';
});

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed! (This is a demo; no real processing.)');
    cart = [];
    cartCount = 0;
    cartTotal = 0;
    updateCart();
    document.getElementById('checkout').style.display = 'none';
});