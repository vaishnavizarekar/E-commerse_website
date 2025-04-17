// Sample cart data (to be replaced with dynamic data or APIs)
const cartItems = [
    { id: 1, name: "Product 1", price: 45000, quantity: 1, image: "images/image_1.jpg" },
    { id: 2, name: "Product 2", price: 38000, quantity: 2, image: "images/image_2.jpg" },
  ];
  
  // Function to render cart items
  function renderCart() {
    const cartTable = document.getElementById("cartItems");
    const totalAmount = document.getElementById("cartTotal");
    cartTable.innerHTML = "";
  
    let total = 0;
    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      const row = `
        <tr>
          <td><img src="${item.image}" alt="${item.name}" class="cart-image"></td>
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td>
            <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" data-id="${item.id}" />
          </td>
          <td>₹${itemTotal}</td>
          <td>
            <button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">Remove</button>
          </td>
        </tr>
      `;
      cartTable.innerHTML += row;
    });
  
    totalAmount.innerText = `Total: ₹${total}`;
  }
  
  // Update quantity
  document.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantity-input")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      const quantity = parseInt(e.target.value);
  
      const item = cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        renderCart();
      }
    }
  });
  
  // Remove item
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      const index = cartItems.findIndex((item) => item.id === id);
  
      if (index !== -1) {
        cartItems.splice(index, 1);
        renderCart();
      }
    }
  });
  
  // Initial render
  renderCart();
  