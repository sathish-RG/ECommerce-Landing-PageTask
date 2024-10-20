let list = document.getElementById("list");
let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];


fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    json.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('listItem', 'bg-white', 'shadow-md', 'rounded-xl', 'p-0', 'flex', 'flex-col', 'items-center', 'mb-4', 'w-full', 'sm:w-[300px]', 'min-h-[420px]','relative');

      const img = document.createElement('img');
      img.src = product.image;
      img.classList.add('flex','hover:cursor-pointer','absolute', 'self-center', 'p-4', 't-5', 'max-h-64', 'max-w-56', 'hover:w-96', 'hover:h-80', 'items-center');
      productItem.appendChild(img);

      const title = document.createElement('h1');
      title.textContent = product.title;
      productItem.appendChild(title);
      title.classList.add('w-60', 'text-center','hover:cursor-pointer', 'font-bold', 'pb-4', 'pt-60', 'p-2', 'items-center','relative');

      const addToCartButton = document.createElement('button');
      addToCartButton.textContent = 'Add to Cart';
      addToCartButton.classList.add('bg-indigo-900', 'hover:bg-red-600', 'font-bold', 'text-xl', 'text-white', 'rounded-2xl', 'flex', 'absolute', 'top-80', 'mt-7', 'text-justify', 'w-full', 'h-20', 'p-8', 'pl-[100px]');
      productItem.appendChild(addToCartButton);

      const price = document.createElement('h2');
      price.innerHTML = `Rs. ${product.price}`;
      productItem.appendChild(price);
      price.classList.add('bg-indigo-600', 'w-full', 'text-gray-100', 'font-bold', 'p-2', 'pb-7', 'pt-2', 'absolute', 'text-center', 'h-2', 'bottom-1', 'items-center', 'mb-12');

      
      addToCartButton.addEventListener('click', () => {
        const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        
        
        const existingProductIndex = selectedProducts.findIndex(item => item.id === product.id);
        
        if (existingProductIndex > -1) {
          
          selectedProducts[existingProductIndex].quantity += 1;
        } else {
          
          selectedProducts.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1 
          });
        }

        
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        alert('Product added to cart');
      
        window.location.href = `cart.html`; 
      });

      
      productItem.addEventListener('click', (event) => {
        if (event.target === img || event.target === title || event.target === price) {
          window.location.href = `product.html?id=${product.id}`;
        }
      });

      const cart1 = document.getElementById("cart");
      cart1.addEventListener('click', () => {
        window.location.href = `cart.html`;
      });

      list.appendChild(productItem);
    });

   
    searchBtn.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = json.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm) || 
               product.description.toLowerCase().includes(searchTerm);
      });
    
      list.innerHTML = '';
      filteredProducts.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('flex', 'min-h-[420px]', 'w-72', 'flex-col', 'justify-between', 'bg-white', 'mt-6', 'ml-4', 'mr-4', 'rounded-2xl', 'relative', 'items-center');
        productDiv.innerHTML = `
          <img src="${product.image}" class="flex absolute self-center p-4 t-5 max-h-64 max-w-56 hover:w-96 hover:h-80 items-center">
          <h1 class="w-72 text-center font-bold pb-4 pt-60 p-2 items-center">${product.title}</h1>
          <h2 class="bg-indigo-600 w-full text-gray-100 font-bold p-2 pb-7 pt-2 absolute text-center h-2 bottom-1 items-center mb-12 z-[1]">Rs. ${product.price}</h2>
          <button class="bg-indigo-900 hover:bg-red-600 font-bold text-xl text-white rounded-2xl flex absolute top-80 mt-7 text-center w-full h-20 p-8 pl-24">Add To Cart</button>
        `;

        productDiv.addEventListener('click', () => {
          window.location.href = `product.html?id=${product.id}`;
        });

        list.appendChild(productDiv);
      });
    });
  })
  .catch(err => console.error('Error fetching products:', err));
