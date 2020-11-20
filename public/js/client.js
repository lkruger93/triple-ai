// Asynchronous fetch(): request the JSON array from the new JSON endpoint using fetch().
// Gallery
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
          <img src=${product.imagePath} alt="${product.title}" >
          <figcaption> 
            <h2>[${product.title}]</h1>
            <h3>${product.description}</h2>
              <a href="${product.url}" alt="${product.credit}">${product.credit}</a>
          </figcaption>
        </figure>`;
    });

    //Send output to Dom
    document.querySelector('.gallery').innerHTML = output;
})

// Check errors 
.catch((err) => {
  console.log('Error!');
});


