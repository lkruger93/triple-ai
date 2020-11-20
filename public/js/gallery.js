// Asynchronous fetch(): request the JSON array from the new JSON endpoint using fetch().
fetch(`${window.location.origin}/api/v0/gallery`)
  .then((res) => {
    // JSON 'data' returned from server
    return res.json();
  })
  .then((products) => {
    console.log(products);

    let output = '';

    // Loop through `products` array using `array.forEach()`to create an image card
    products.forEach((product) => {
      output += 
        `<figure class="card">
          <a href="${product.credit}" alt="${product.title}"><img src="${product.imagePath}" width="${product.width}" alt="${product.title}" >
            <figcaption> 
              <h2>[${product.title}]</h2>
              <h3>${product.description}</h3>
              <h3>$${product.price}</h3>
            </figcaption>
          </a>
        </figure>`;
    });

    //Send output to Dom
    document.querySelector('.gallery').innerHTML = output;
})

// Check errors 
.catch((err) => {
  console.log('Error!');
});


