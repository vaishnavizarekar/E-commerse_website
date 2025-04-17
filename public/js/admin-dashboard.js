let productCount = 0; // To track total products
let orderCount = 2; // Initial order count based on sample orders
let products = []; // To store product objects with id, name, price, description
let isEditing = false; // Track if a product is being edited

// Handle Add Product Form Submission
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('name').value;
    const productPrice = document.getElementById('price').value;
    const productDescription = document.getElementById('description').value;

    if (isEditing) {
        // If editing, find the product and update it
        const productIndex = products.findIndex(p => p.id == productId);
        if (productIndex !== -1) {
            products[productIndex].name = productName;
            products[productIndex].price = parseFloat(productPrice).toFixed(2);
            products[productIndex].description = productDescription;
            isEditing = false; // Reset the editing flag
        }
    } else {
        // Otherwise, create a new product object and add to products array
        const newProduct = {
            id: Date.now(), // Unique ID for each product
            name: productName,
            price: parseFloat(productPrice).toFixed(2),
            description: productDescription
        };
        products.push(newProduct);
        productCount++; // Increment product count
    }

    // Render the product list
    renderProducts();

    // Update total products
    document.getElementById('totalProducts').innerText = productCount;

    // Reset the form
    this.reset();
    document.getElementById('productId').value = ''; // Clear hidden product ID field
});

// Function to render products
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear the table body

    products.forEach(product => {
        const productRow = `
            <tr data-id="${product.id}">
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                </td>
            </tr>
        `;
        productList.insertAdjacentHTML('beforeend', productRow);
    });

    // Attach event listeners for edit and delete buttons AFTER rendering
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', handleEditProduct);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDeleteProduct);
    });
}

// Handle editing a product
function handleEditProduct(event) {
    const productId = event.target.closest('tr').getAttribute('data-id');
    const product = products.find(p => p.id == productId);
    if (product) {
        document.getElementById('productId').value = product.id;  // Set product ID in hidden field
        document.getElementById('name').value = product.name;  // Set product name in form
        document.getElementById('price').value = product.price;  // Set product price in form
        document.getElementById('description').value = product.description;  // Set product description
        isEditing = true; // Set editing flag to true
    }
}

// Handle deleting a product
function handleDeleteProduct(event) {
    const productId = event.target.closest('tr').getAttribute('data-id');
    products = products.filter(p => p.id != productId); // Remove the product from the array
    productCount--; // Decrement the product count
    document.getElementById('totalProducts').innerText = productCount;
    renderProducts(); // Re-render the product list
}

// Update the total orders display
document.getElementById('totalOrders').innerText = orderCount;
