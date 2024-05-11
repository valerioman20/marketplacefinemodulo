// Richiesta API
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
let id;
// Funzione che si avvia al caricamento della pagina web
window.onload = async () => {
  // Recupero il parametro 'id'
  const param = new URLSearchParams(window.location.search);
  id = param.get("id");
  if (id) {
    await loadProductData();  // Se esiste un id, carica i dati del prodotto per modificarlo
  } else {
    setupNewProductForm(); // Se non esiste passo alla creazione di un nuovo prodotto
  }
};

// Funzione per recuperare i dati del prodotto basati sull'id 
const loadProductData = async () => {
  try {
    const res = await fetch(apiUrl + id, {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTZkNGQ2MzdmMzAwMTVhZGJmNWIiLCJpYXQiOjE3MTUwNzY3MTEsImV4cCI6MTcxNjI4NjMxMX0.ybPRtuaqJMk9IfXO1KEf7ZjGHeZbBSDe2KvR8B2w8po",
      },
    });
    const product = await res.json();
    populateFormFields(product);
  } catch (error) {
    console.error("Error loading product data:", error);
  }
};



const populateFormFields = (product) => {
  //Qui invece popolo i campi del form con i dati del prodotto
};

const handleApiResponse = (res, successMessage) => {
  if (res.ok) {
    alert(successMessage);
  } else {
    console.error("API request failed:", res.statusText);
  }
};

// Crea o aggiorno un prodotto se l'id è presente o meno
const createOrUpdateProduct = async (method) => {
  const product = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  };

  try {
    const res = await fetch(id ? apiUrl + id : apiUrl, {
      method,
      headers: {
        "content-type": "application/json",
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTZkNGQ2MzdmMzAwMTVhZGJmNWIiLCJpYXQiOjE3MTUwNzY3MTEsImV4cCI6MTcxNjI4NjMxMX0.ybPRtuaqJMk9IfXO1KEf7ZjGHeZbBSDe2KvR8B2w8po",
      },
      body: JSON.stringify(product),
    });
    handleApiResponse(res, id ? "Prodotto modificato" : "Prodotto creato");
  } catch (error) {
    console.error("Error creating/updating product:", error);
  }
};

// Per eleiminare un prodotto
const deleteProduct = async () => {
  try {
    const res = await fetch(apiUrl + id, {
      method: "DELETE",
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTZkNGQ2MzdmMzAwMTVhZGJmNWIiLCJpYXQiOjE3MTUwNzY3MTEsImV4cCI6MTcxNjI4NjMxMX0.ybPRtuaqJMk9IfXO1KEf7ZjGHeZbBSDe2KvR8B2w8po",
      },
    });
    handleApiResponse(res, "Product deleted");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


// Event listener per i bottoni di aggiunta, modifica ed eliminazione
document.getElementById("addProductBtn").addEventListener("click", () => {
  createOrUpdateProduct("POST");
});

document.getElementById("editProductBtn").addEventListener("click", () => {
  createOrUpdateProduct("PUT");
});

document.getElementById("deleteProductBtn").addEventListener("click", deleteProduct);



/* Tramite questa funzione quando clicchiamo sul tasto Vedi dettagli, nel back office troveremo le informazioni compilate
cosi facendo per l'utene sarà piu facile modificare i dettagli di un rodotto*/
document.addEventListener("DOMContentLoaded", async () => {

  async function loadProductDetails(productId) {
    try {
      const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
      const response = await fetch(apiUrl + productId, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTZkNGQ2MzdmMzAwMTVhZGJmNWIiLCJpYXQiOjE3MTUwNzY3MTEsImV4cCI6MTcxNjI4NjMxMX0.ybPRtuaqJMk9IfXO1KEf7ZjGHeZbBSDe2KvR8B2w8po",
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const product = await response.json();

      // Riempimento dei campi del form con i dettagli del prodotto
      document.getElementById('name').value = product.name || '';
      document.getElementById('description').value = product.description || '';
      document.getElementById('imageUrl').value = product.imageUrl || '';
      document.getElementById('brand').value = product.brand || '';
      document.getElementById('price').value = product.price || '';
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }

  // Estraggo l'id del prodotto dall'URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  // Se c'è un id prodotto, carica i dettagli del prodotto
  if (productId) {
    loadProductDetails(productId);
  }
});




