 /* Pagina con il dettaglio prodotto*/
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
      fetchProductDetails(productId);
    }
  
    async function fetchProductDetails(id) {
      const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
      try {
        const response = await fetch(apiUrl + id, {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTZkNGQ2MzdmMzAwMTVhZGJmNWIiLCJpYXQiOjE3MTUwNzY3MTEsImV4cCI6MTcxNjI4NjMxMX0.ybPRtuaqJMk9IfXO1KEf7ZjGHeZbBSDe2KvR8B2w8po"
          }
        });
        const product = await response.json();
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-image').src = product.imageUrl;
        document.getElementById('product-image').alt = 'Image of ' + product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = 'Price: ' + product.price + ' €';
        document.getElementById('product-brand').textContent = 'Brand: ' + product.brand;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
  });
  