// Admin: Subscribers list
export const admin = fetch(`${window.location.origin}/api/v0/subscribers`)
.then((res) => {
  // JSON 'data' returned from server
  return res.json();
})
.then((subscribers) => {
  console.log(subscribers);

  let output = '';

  // Loop through `products` array using `array.forEach()`to create an image card
  subscribers.forEach((subscriber) => {
    output += 
     `<ul>
        <li>${subscriber.name}</li>
        <li>${subscriber.email}</li>
        <li>${subscriber.date}</li>
      </ul>
    `;
  });

  //Send output to Dom
  document.querySelector('.subscriber').innerHTML = output;
})

// Check errors 
.catch((err) => {
  console.log('Error!');
});





