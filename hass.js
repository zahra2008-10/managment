
// ================= DATA =================
let products=JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

// ================= ADD PRODUCT =================
  function addProduct(){
    let name=document.getElementById("name").value;
    let category=document.getElementById("category").value;
    let price=document.getElementById("price").value;
    let quantity=document.getElementById("quantity").value;
    let direction=document.getElementById("text").value;
    let file=document.getElementById("file").files[0];

    let reader= new FileReader();
    if (file) {
        reader.onload = function(e){
            saveProduct(e.target.result);
        }
        reader.readAsDataURL(file);       
     }
    
 else{
    let image = editIndex !== -1 ? products[editIndex].image : "";
        saveProduct(image);
    }

    // ===== VALIDATION =====
        if (name=="") {
        alert("the name input should be fulled");
        return
    } 
    if (category=="") {
        alert("the category input should be fulled");
        return
    }
    if (price=="") {
        alert("the price input should be fulled");
        return
     }
     if (quantity=="") {
        alert("this quantity input should be fulled");
        return
    }
    if (direction=="") {
        alert("the direction input should be fulled");
        return
    }

    // ===== SAVE PRODUCT FUNCTION =====
    function saveProduct(image){
        let product = {
            name: name,
            category: category,
            price: price,
            quantity: quantity,
            direction: direction,
            image: image
        };
    
        if (editIndex === -1) {
            products.push(product);
        } else {
            products[editIndex] = product;
            editIndex = -1;
        }
        
    
        displayProducts();

        // ================= CLEAR INPUTS =================
        document.getElementById("name").value = "";
        document.getElementById("category").value = "";
        document.getElementById("price").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("file").value="";
        document.getElementById("text").value="";
    }

// ===== SAVE TO STORAGE =====
    localStorage.setItem("products", JSON.stringify(products));;

}

// ================= DISPLAY PRODUCTS =================
    function displayProducts(list = products) {
        let container = document.getElementById("products");
        container.innerHTML = "";
        document.getElementById("count").innerText = list.length;
    
        list.forEach(function(product, index) {
            container.innerHTML += `
        <div class="card">

        <img src="${product.image}" width="100">
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Quantity:</strong> ${product.quantity}</p>
        <p>${product.description}</p>


            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
           
        </div>
        `;
    })
}

  // ================= EDIT PRODUCT =================
function editProduct(index){
    let product=products[index];
   document.getElementById("name").value=product.name;
    document.getElementById("category").value=product.category;
    document.getElementById("price").value=product.price;
    document.getElementById("quantity").value=product.quantity;
    document.getElementById("text").value=product.direction;
    editIndex = index;
}

// ================= DELETE PRODUCT =================
function deleteProduct(index){
    products.splice(index,1);

    localStorage.setItem("products", JSON.stringify(products));
    
    displayProducts(); 

}

// ================= SEARCH BY NAME =================
function searchByName(){
    let searchValue=document.getElementById("searchName").value.toLowerCase();

    let  filteredProducts = products
    .map((product,index)=>({product,index}))
    .filter(item=>
        item.product.name.toLowerCase().includes(searchValue)||
        item.product.category.toLowerCase().includes(searchValue)
        );
       
    displayFilteredProducts(filteredProducts);
}

// ================= SEARCH BY CATEGORY =================
function  displayFilteredProducts(list){
    let container=document.getElementById("products");
    container.innerHTML="";

    list.forEach(function(item){
        let product = item.product;
        let index = item.index;
      
        container.innerHTML+= `
        <div>
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>${product.price}</p>
            <p>${product.quantity}</p>
            <img src="${product.image}" width="200%" height="300px" style="object-fit:cover;">
            <p> ${product.direction}</p>

            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        </div>
        `;
       
    })
}

// ================= SEARCH BY CATEGORY =================
function searchByCategory() {
    let searchValue = document.getElementById("searchCategory").value.toLowerCase();

    let filteredProducts = products
    .map((product, index) => ({ product, index }))
    .filter(item =>
        item.product.category.toLowerCase().includes(searchValue)
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
}
