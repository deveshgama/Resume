document.getElementById('viewProductsBtn').addEventListener('click', function () {
    fetchProducts();
  });
  
  document.getElementById('addProductBtn').addEventListener('click', function () {
    showForm('Add Product');
  });
  
  document.getElementById('editProductBtn').addEventListener('click', function () {
    showForm('Edit Product');
  });
  
  document.getElementById('deleteProductBtn').addEventListener('click', function () {
    deleteProduct();
  });
  
  function fetchProducts() {
    // Fetch product data from backend (mocked here for now)
    const products = [
      { id: 1, name: 'Shirt', type: 'Casual', size: 'M', brand: 'BrandA', cost: 500, selling: 800, quantity: 20 },
      { id: 2, name: 'Jeans', type: 'Denim', size: '32', brand: 'BrandB', cost: 1200, selling: 1800, quantity: 10 },
    ];
  
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.type}</td>
        <td>${product.size}</td>
        <td>${product.brand}</td>
        <td>${product.cost}</td>
        <td>${product.selling}</td>
        <td>${product.quantity}</td>
      `;
      tableBody.appendChild(row);
    });
  
    document.getElementById('productTableContainer').classList.remove('hidden');
    document.getElementById('productFormContainer').classList.add('hidden');
  }
  
  function showForm(title) {
    document.getElementById('formTitle').innerText = title;
    document.getElementById('productTableContainer').classList.add('hidden');
    document.getElementById('productFormContainer').classList.remove('hidden');
  }
  
  function deleteProduct() {
    alert('Delete product logic goes here!');
  }
  