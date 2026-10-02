/// ================= DATA =================
let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

// ================= ADD PRODUCT =================
function addProduct() {
  let name = document.getElementById("name").value.trim();
  let category = document.getElementById("category").value.trim();
  let price = document.getElementById("price").value.trim();
  let quantity = document.getElementById("quantity").value.trim();
  let direction = document.getElementById("text").value.trim();
  let file = document.getElementById("file").files[0];

  // ================= VALIDATION =================
  if (name === "") {
    alert("The name input should be filled");
    return;
  }

  if (category === "") {
    alert("The category input should be filled");
    return;
  }

  if (price === "") {
    alert("The price input should be filled");
    return;
  }

  if (quantity === "") {
    alert("The quantity input should be filled");
    return;
  }

  if (direction === "") {
    alert("The description input should be filled");
    return;
  }

  // ================= IMAGE =================
  if (file) {
    let reader = new FileReader();

    reader.onload = function (e) {
      saveProduct(e.target.result);
    };

    reader.readAsDataURL(file);
  } else {
    // If editing and user doesn't select a new image,
    // keep the old image
    let image = editIndex !== -1 ? products[editIndex].image : "";

    saveProduct(image);
  }

  // ================= SAVE PRODUCT =================
  function saveProduct(image) {
    let product = {
      name: name,
      category: category,
      price: price,
      quantity: quantity,
      direction: direction,
      image: image,
    };

    // ================= ADD =================
    if (editIndex === -1) {
      products.push(product);
    }

    // ================= EDIT =================
    else {
      products[editIndex] = product;
      editIndex = -1;
    }

    // Save to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Display products
    displayProducts();

    // ================= CLEAR INPUTS =================
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("file").value = "";
    document.getElementById("text").value = "";
  }
}

// ================= DISPLAY PRODUCTS =================
function displayProducts(list = products) {
  let container = document.getElementById("products");

  container.innerHTML = "";

  // Product counter
  document.getElementById("count").innerText = list.length;

  list.forEach(function (product, index) {
    container.innerHTML += `
      <div class="card">

        <h3>${product.name}</h3>

        <p>
          <strong>Category:</strong>
          ${product.category}
        </p>

        <p>
          <strong>Price:</strong>
          $${product.price}
        </p>

        <p>
          <strong>Quantity:</strong>
          ${product.quantity}
        </p>

        <img 
          src="${product.image}" 
          width="200"
          height="200"
          style="object-fit: cover;"
        >

        <p>
          <strong>Description:</strong>
          ${product.direction}
        </p>

        <button onclick="editProduct(${index})">
          Edit
        </button>

        <button onclick="deleteProduct(${index})">
          Delete
        </button>

      </div>
    `;
  });
}

// ================= EDIT PRODUCT =================
function editProduct(index) {
  let product = products[index];

  document.getElementById("name").value = product.name;
  document.getElementById("category").value = product.category;
  document.getElementById("price").value = product.price;
  document.getElementById("quantity").value = product.quantity;
  document.getElementById("text").value = product.direction;

  editIndex = index;
}

// ================= DELETE PRODUCT =================
function deleteProduct(index) {
  products.splice(index, 1);

  localStorage.setItem("products", JSON.stringify(products));

  displayProducts();
}

// ================= SEARCH BY NAME =================
function searchByName() {
  let searchValue = document.getElementById("searchName").value.toLowerCase();

  let filteredProducts = products
    .map((product, index) => ({
      product,
      index,
    }))
    .filter((item) => item.product.name.toLowerCase().includes(searchValue));

  displayFilteredProducts(filteredProducts);
}

// ================= DISPLAY FILTERED PRODUCTS =================
function displayFilteredProducts(list) {
  let container = document.getElementById("products");

  container.innerHTML = "";

  document.getElementById("count").innerText = list.length;

  list.forEach(function (item) {
    let product = item.product;
    let index = item.index;

    container.innerHTML += `
      <div class="card">

        <h3>${product.name}</h3>

        <p>
          <strong>Category:</strong>
          ${product.category}
        </p>

        <p>
          <strong>Price:</strong>
          $${product.price}
        </p>

        <p>
          <strong>Quantity:</strong>
          ${product.quantity}
        </p>

        <img 
          src="${product.image}" 
          width="200"
          height="200"
          style="object-fit: cover;"
        >

        <p>
          <strong>Description:</strong>
          ${product.direction}
        </p>

        <button onclick="editProduct(${index})">
          Edit
        </button>

        <button onclick="deleteProduct(${index})">
          Delete
        </button>

      </div>
    `;
  });
}

// ================= SEARCH BY CATEGORY =================
function searchByCategory() {
  let searchValue = document
    .getElementById("searchCategory")
    .value.toLowerCase();

  let filteredProducts = products
    .map((product, index) => ({
      product,
      index,
    }))
    .filter((item) =>
      item.product.category.toLowerCase().includes(searchValue),
    );

  displayFilteredProducts(filteredProducts);
}

// ================= DARK MODE =================
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// ================= LOAD ON START =================
window.onload = function () {
  let theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");
  }

  // Display saved products when page loads
  displayProducts();
};
