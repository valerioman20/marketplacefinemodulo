
 /* Creo le card prodotto*/
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTZkNGQ2MzdmMzAwMTVhZGJmNWIiLCJpYXQiOjE3MTUwNzY3MTEsImV4cCI6MTcxNjI4NjMxMX0.ybPRtuaqJMk9IfXO1KEf7ZjGHeZbBSDe2KvR8B2w8po",
      },
    });

    const products = await response.json();
    console.log("Prodotti:", products);
    const row = document.querySelector("#products");

    products.forEach((prod) => {
      row.innerHTML += `
      <div class='col col-6 col-md-4 col-lg-3 mb-4'>  
        <div class="card">
          <img src="${prod.imageUrl}" class="card-img-top img-fluid" alt="${prod._id}_${prod.name}">
          <div class="card-body">
            <h5 class="card-title">${prod.name}</h5>
            <h5 class="card-title">${prod.price}</h5>
            <a href="./backoffice.html?id=${prod._id}" class="btn btn-danger">Modifica</a>
            <a href="./details.html?id=${prod._id}" class="btn btn-secondary">Dettagli</a>
          </div>
        </div> 
      </div>`;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

