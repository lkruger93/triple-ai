// Admin: Subscriners list
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
     `<h2> Admin: Suscribers List </h2>
      <table>
	      <thead>
          <tr>
            <th>No</th>
		        <th>Name</th>
            <th>E-mail</th>
            <th>Subscription Date</th>
	        </tr>
	      </thead>
	      <tbody>
          <tr>
            <td>${subscriber.id}</td>
            <td>${subscriber.name}</td>
            <td>${subscriber.email}</td>
            <td>${subscriber.date}</td>
          </tr>
        </tbody>
      </table>
    `;
  });

  //Send output to Dom
  document.querySelector('.subscriber').innerHTML = output;
})

// Check errors 
.catch((err) => {
  console.log('Error!');
});





