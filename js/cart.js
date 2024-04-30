document.addEventListener("DOMContentLoaded", function() {
    let cartItems = [
        { id: 1, name: "LEVI", price: 2000, quantity: 2, image: "item.jpg" },
        { id: 2, name: "PETER ENGLAND", price: 3000, quantity: 1, image: "item2.jpg" }
        // Add more items here if needed
    ];

    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Function to convert price to INR format
    function formatPrice(price) {
        return "₹" + price.toFixed(2); // Assuming the prices are in decimal format
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        cartItems.forEach(item => {
            const itemTotalPrice = item.price * item.quantity;
            totalPrice += itemTotalPrice;
            const cartItem = `
                <div class="cart-item">
                    <img src="images/${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <p>${item.name}</p>
                        <p>Price: ${formatPrice(item.price)} each</p>
                        <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                    <p class="item-total">${formatPrice(itemTotalPrice)}</p>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItem;
        });
        totalPriceElement.textContent = formatPrice(totalPrice);
    }

    renderCartItems();

    function updateCart() {
        cartItems = [];
        const cartItemElements = document.querySelectorAll('.cart-item');
        let totalPrice = 0;
        cartItemElements.forEach(item => {
            const id = parseInt(item.querySelector('.remove-item').getAttribute('data-id'));
            const name = item.querySelector('p:first-child').textContent;
            const price = parseFloat(item.querySelector('p:nth-child(2)').textContent.split(' ')[1]);
            const quantity = parseInt(item.querySelector('.item-quantity').value);
            const image = item.querySelector('img').getAttribute('src').split('/')[1];
            cartItems.push({ id, name, price, quantity, image });
            totalPrice += price * quantity;
        });
        totalPriceElement.textContent = formatPrice(totalPrice);
    }

    cartItemsContainer.addEventListener('change', function(event) {
        if (event.target.classList.contains('item-quantity')) {
            updateCart();
        }
    });

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const itemId = parseInt(event.target.getAttribute('data-id'));
            cartItems = cartItems.filter(item => item.id !== itemId);
            updateCart();
        }
    });

    checkoutBtn.addEventListener('click', function() {
        // Send cart data to backend for checkout process
        // Example AJAX request to backend goes here
        console.log("Checkout button clicked. Cart data sent to backend.");
    });
});
