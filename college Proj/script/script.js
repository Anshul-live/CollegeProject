const button = document.getElementById("search");
const routeContainer = document.getElementById("routeContainer");
isloggedin=false;
currentUserName="";
currentSearchInfo={};
button.addEventListener("click", () => {
  const name = document.getElementById("name");
  const mobileNumber = document.getElementById("mobileNumber");
  const source = document.getElementById("source");
  const destination = document.getElementById("destination");
  const date = document.getElementById("date");
  const passengers = document.getElementById("passengers");

  const obj = {
    name: name.value.toLowerCase(),
    mobileNum: mobileNumber.value,
    source: source.value.toLowerCase(),
    destination: destination.value.toLowerCase(),
    date: date.value,
    passengers: passengers.value,
  };

  currentSearchInfo = obj;

  alert(JSON.stringify(obj));

  const routes = {
    "routes": [
      {
        "source": "Delhi",
        "destinations": [
          {
            "busId": 1,
            "name": "Gurugram",
            "time": "10:00 AM",
            "seatsAvailable": 20,
            "bookedSeats": 5,
            "price": 10,
            "rating": 4.5
          },
          {
            "busId": 2,
            "name": "Gurugram",
            "time": "2:00 PM",
            "seatsAvailable": 15,
            "bookedSeats": 8,
            "price": 12,
            "rating": 4.2
          },
          {
            "busId": 3,
            "name": "Noida",
            "time": "11:30 AM",
            "seatsAvailable": 18,
            "bookedSeats": 2,
            "price": 8,
            "rating": 4.8
          },
          {
            "busId": 4,
            "name": "Faridabad",
            "time": "1:30 PM",
            "seatsAvailable": 12,
            "bookedSeats": 4,
            "price": 9,
            "rating": 4.0
          },
          {
            "busId": 5,
            "name": "Ghaziabad",
            "time": "3:00 PM",
            "seatsAvailable": 10,
            "bookedSeats": 6,
            "price": 11,
            "rating": 4.3
          }
        ]
      },
      {
        "source": "Gurugram",
        "destinations": [
          {
            "busId": 6,
            "name": "Delhi",
            "time": "9:00 AM",
            "seatsAvailable": 25,
            "bookedSeats": 3,
            "price": 10,
            "rating": 4.7
          },
          {
            "busId": 7,
            "name": "Noida",
            "time": "12:00 PM",
            "seatsAvailable": 20,
            "bookedSeats": 10,
            "price": 11,
            "rating": 4.5
          },
          {
            "busId": 8,
            "name": "Faridabad",
            "time": "3:30 PM",
            "seatsAvailable": 15,
            "bookedSeats": 6,
            "price": 12,
            "rating": 4.0
          }
        ]
      },
      {
        "source": "Noida",
        "destinations": [
          {
            "busId": 9,
            "name": "Delhi",
            "time": "11:00 AM",
            "seatsAvailable": 22,
            "bookedSeats": 7,
            "price": 9,
            "rating": 4.2
          },
          {
            "busId": 10,
            "name": "Gurugram",
            "time": "1:30 PM",
            "seatsAvailable": 18,
            "bookedSeats": 4,
            "price": 10,
            "rating": 4.5
          },
          {
            "busId": 11,
            "name": "Faridabad",
            "time": "4:00 PM",
            "seatsAvailable": 20,
            "bookedSeats": 5,
            "price": 11,
            "rating": 4.3
          }
        ]
      },
      {
        "source": "Faridabad",
        "destinations": [
          {
            "busId": 12,
            "name": "Delhi",
            "time": "12:30 PM",
            "seatsAvailable": 15,
            "bookedSeats": 6,
            "price": 9,
            "rating": 4.0
          },
          {
            "busId": 13,
            "name": "Gurugram",
            "time": "3:00 PM",
            "seatsAvailable": 12,
            "bookedSeats": 3,
            "price": 10,
            "rating": 4.2
          },
          {
            "busId": 14,
            "name": "Noida",
            "time": "5:30 PM",
            "seatsAvailable": 16,
            "bookedSeats": 2,
            "price": 11,
            "rating": 4.4
          }
        ]
      },
      {
        "source": "Ghaziabad",
        "destinations": [
          {
            "busId": 15,
            "name": "Delhi",
            "time": "1:00 PM",
            "seatsAvailable": 18,
            "bookedSeats": 5,
            "price": 10,
            "rating": 4.3
          },
          {
            "busId": 16,
            "name": "Noida",
            "time": "3:30 PM",
            "seatsAvailable": 14,
            "bookedSeats": 3,
            "price": 9,
            "rating": 4.1
          },
          {
            "busId": 17,
            "name": "Faridabad",
            "time": "5:00 PM",
            "seatsAvailable": 10,
            "bookedSeats": 8,
            "price": 12,
            "rating": 4.2
          }
        ]
      }
    ]
  };

  const selectedSource = obj.source;
  const selectedDestination = obj.destination;
  const selectedRoute = routes.routes.find(route => route.source.toLowerCase() === selectedSource.toLowerCase());
  if (selectedRoute) {
    const availableDestinations = selectedRoute.destinations.filter(dest => dest.name.toLowerCase() === selectedDestination.toLowerCase());
    if (availableDestinations.length > 0) {
      displayRoutes(selectedSource, selectedDestination, availableDestinations);
    } else {
      alert("No route found for the selected destination");
    }
  } else {
    alert("No route found for the selected source");
  }
});

function displayRoutes(source, destination, availableDestinations) {
  const routeContainer = document.getElementById("routeContainer");
  routeContainer.innerHTML = ""; // Clear previous results

  const routeTitle = document.createElement("h3");
  routeTitle.textContent = "Routes Available";
  routeContainer.appendChild(routeTitle);

  const routeList = document.createElement("ul");

  availableDestinations.forEach(dest => {
    const routeItem = document.createElement("li");
    routeItem.classList.add("card");

    const sourceText = document.createElement("p");
    sourceText.textContent = "Source: " + source;

    const destinationText = document.createElement("p");
    destinationText.textContent = "Destination: " + dest.name;

    const timeText = document.createElement("p");
    timeText.textContent = "Time: " + dest.time;

    const seatsText = document.createElement("p");
    seatsText.textContent = "Seats Available: " + dest.seatsAvailable;

    const bookedSeatsText = document.createElement("p");
    bookedSeatsText.textContent = "Booked Seats: " + dest.bookedSeats;

    const priceText = document.createElement("p");
    priceText.textContent = "Price: $" + dest.price;

    const ratingText = document.createElement("p");
    ratingText.textContent = "Rating: " + dest.rating;

    const bookButton = document.createElement("button");
    bookButton.textContent = "Book Now";
    bookButton.addEventListener("click", () => {
      if (!isloggedin) {
        showLoginPopup();
      }
      if (isloggedin) openPopup(source, dest);
    });

    routeItem.appendChild(sourceText);
    routeItem.appendChild(destinationText);
    routeItem.appendChild(timeText);
    routeItem.appendChild(seatsText);
    routeItem.appendChild(bookedSeatsText);
    routeItem.appendChild(priceText);
    routeItem.appendChild(ratingText);
    routeItem.appendChild(bookButton);

    routeList.appendChild(routeItem);
  });

  routeContainer.appendChild(routeList);
}

function openPopup(source, dest) {
  popupOverlay.style.display = "flex";

  const busInfo = {
    filename:currentUserName,
    busId:dest.busId,
    name:currentSearchInfo.name,
    number:currentSearchInfo.number,
    source: source,
    destination: dest.name,
    date:currentSearchInfo.date,
    passengers:currentSearchInfo.passengers,
    price: dest.price,
  };

  alert(JSON.stringify(busInfo));

  
const paymentForm=document.getElementById('paymentForm');

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the payment details
  const cardNumber = document.getElementById("cardNumber").value;
  const cardExpiry = document.getElementById("cardExpiry").value;
  const cardCVV = document.getElementById("cardCVV").value;
  closePopup();

  // Show a confirmation message or redirect to a thank you page
  alert("Payment successful! Thank you for booking.");

  fetch('/addBooking',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(busInfo),
  }
  )
  .then(response => response.json())
    .then((data) => {
      if (data.success) {
        alert('booking succesful');
        // Additional actions or redirection
      } else {
        alert('booking failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

});

}

popupClose.addEventListener("click", () => {
  closePopup();
});

function closePopup() {
  popupOverlay.style.display = "none";
}


 // Get popup elements
const signupPopup = document.getElementById('signupPopup');
const loginPopup = document.getElementById('loginPopup');

// Get popup close buttons
const signupCloseBtn = document.getElementById('signupClose');
const loginCloseBtn = document.getElementById('loginClose');

// Get account options elements
const accountOptions = document.getElementById('accountOptions');
const signInLink = document.getElementById('signInLink');
const loginLink = document.getElementById('loginLink');

// Function to display the signup popup
function showSignupPopup() {
  signupPopup.style.display = 'block';
}

// Function to display the login popup
function showLoginPopup() {
  loginPopup.style.display = 'block';
}

// Function to close the signup popup
function closeSignupPopup() {
  signupPopup.style.display = 'none';
}

// Function to close the login popup
function closeLoginPopup() {
  loginPopup.style.display = 'none';
}

// Function to show the account icon if user is logged in
function showAccountIcon(){
  if(isloggedin){
    const accountImg=document.getElementById("profileImg");
        closeSignupPopup();
        accountImg.style.display="block";
  }
}

function hideAccountIcon(){
    const accountImg=document.getElementById("profileImg");
        closeSignupPopup();
        accountImg.style.display="none";
        isloggedin=false;

}

// Event listener for signup link click
signInLink.addEventListener('click', showSignupPopup);

// Event listener for login link click
loginLink.addEventListener('click', showLoginPopup);

// Event listener for signup close button click
signupCloseBtn.addEventListener('click', closeSignupPopup);

// Event listener for login close button click
loginCloseBtn.addEventListener('click', closeLoginPopup);


const signupButton = document.getElementById('signupButton');

signupButton.addEventListener('click', () => {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const mobile = document.getElementById('signupMobile').value;

  const userData = {
    name:name,
    email:email,
    password:password,
    mobile:mobile,
  };
  // Use the userData object as needed (e.g., send it via fetch request)
  alert(JSON.stringify(userData));

  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success) {
        isloggedin=true;
        currentUserName = userData.email.slice(0, userData.email.indexOf('@'));
        alert(currentUserName);


        showAccountIcon();
        alert('Account created successfully!');
        // Additional actions or redirection
      } else {
        alert('Account creation failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });


});

const accountImg = document.getElementById('profileImg');
const accountPopup = document.getElementById('userAccountPopup');
const profileImg= document.getElementById('userProfileImage');
const accountCloseBtn = document.getElementById('accountPopupClose');
const editPopupCLose = document.getElementById('editPopupClose');
const accountEdit=document.getElementById('editProfileBtn');
const accountLogout=document.getElementById('logoutBtn');
const editProfile=document.getElementById('editProfilePopup');

function showeditPopup(){
  editProfile.style.display='block';

}


function closeEditPopup(){
  editProfile.style.display='none';
}

accountEdit.addEventListener('click',showeditPopup);

editPopupCLose.addEventListener('click',closeEditPopup);

// Function to display the user account popup
function showAccountPopup() {
  accountPopup.style.display = 'block';
}

// Function to close the user account popup
function closeAccountPopup() {
  accountPopup.style.display = 'none';
}

// Event listener for account icon click
accountImg.addEventListener('click', showAccountPopup);

// Event listener for account popup close button click
accountCloseBtn.addEventListener('click', closeAccountPopup);


accountLogout.addEventListener('click',()=>{
  hideAccountIcon();
  closeAccountPopup();
  location.reload();
});


const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', () => {
  alert("clicked");
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const userData = {
    email: email,
    password: password,
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.message === 'Login successful') {
        isloggedin = true;
        currentUserName = userData.email.slice(0, userData.email.indexOf('@'));
        alert(currentUserName);

        showAccountIcon();
        
        alert(data.user.name);
        loadProfile(data.user);
        closeLoginPopup();
        alert('Login successful');
        // Additional actions or redirection
      } else {
        alert('Login failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


function loadProfile(data) {
  const accountImg = document.getElementById('profileImg');
  const profileImg= document.getElementById('userProfileImage');
  profileImg.src=data.image;
  accountImg.src = data.image;
}

const confirmEdit = document.getElementById('confirmEdit');

confirmEdit.addEventListener('click', () => {
  const newNameElement = document.getElementById('editName');
  const newPasswordElement = document.getElementById('editPassword');
  const oldPasswordElement = document.getElementById('oldPassword');
  const newNumberElement = document.getElementById('editNumber');

  const newName = newNameElement.value;
  const newPassword = newPasswordElement.value;
  const oldPassword = oldPasswordElement.value;
  const newNumber = newNumberElement.value;

  const newUserData = {
    name: newName,
    password: newPassword,
    oldPassword: oldPassword,
    number: newNumber,
    filename:currentUserName,
  };

  alert(JSON.stringify(newUserData));

  fetch('/editInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.message === 'edit successful') {
        alert('Edited info successfully');
      } else {
        alert('Failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

const accountBooking=document.getElementById('bookingsBtn');

accountBooking.addEventListener('click',()=>{
  const req={
    filename:currentUserName,
  };
  alert("clickedaccountbooking");
  fetch('/myBookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.message === 'bookings loaded') {
        displayBookings(data.user.busesBooked);

      } else {
        alert('Failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


function deleteBooking(booking,container){
  const detail={
    busId:booking.busId,
    filename:currentUserName,
  }
  alert("delete  called");
  alert(JSON.stringify(detail));
  fetch('/deleteBooking',{
    method :'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(detail),
  })
  .then(response => response.json())
    .then((data) => {
      if (data.message === 'Booking deleted') {
        alert("booking deleted");
        container.style.display = 'none';
        displayBookings(data.bookings);
      } else {
        alert('Failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayBookings(bookings) {
  const container = document.getElementById('userBookingsContainer');
  closeAccountPopup();
  container.style.display = 'block';
  container.innerHTML = '';

  const heading = document.createElement('h1');
  heading.textContent = 'MY BOOKINGS';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.id = 'BookingPopupClose';
  closeBtn.addEventListener('click', () => {
    container.style.display = 'none';
  });

  const closeButtonContainer = document.createElement('div');
  closeButtonContainer.classList.add('popup-close');
  closeButtonContainer.appendChild(closeBtn);

  container.appendChild(heading);
  container.appendChild(closeButtonContainer);

  bookings.forEach((booking) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement('p');
    name.textContent = 'Name: ' + booking.name;

    const number = document.createElement('p');
    number.textContent = 'Number: ' + booking.number;

    const source = document.createElement('p');
    source.textContent = 'Source: ' + booking.source;

    const destination = document.createElement('p');
    destination.textContent = 'Destination: ' + booking.destination;

    const date = document.createElement('p');
    date.textContent = 'Date: ' + booking.date;

    const passengers = document.createElement('p');
    passengers.textContent = 'Passengers: ' + booking.passengers;

    const price = document.createElement('p');
    price.textContent = 'Price: ' + booking.price;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      alert(JSON.stringify(booking));
      deleteBooking(booking,container); // Call your deleteBooking function passing the booking ID
    });

    card.appendChild(name);
    card.appendChild(number);
    card.appendChild(source);
    card.appendChild(destination);
    card.appendChild(date);
    card.appendChild(passengers);
    card.appendChild(price);
    card.appendChild(deleteBtn);

    container.appendChild(card);
  });
}

function deleteBusFromUser(user, busId) {
  if (!user.hasOwnProperty('busesBooked')) {
    console.error('Invalid object format. "busesBooked" property not found.');
    return;
  }

  const busesBooked = user.busesBooked;

  // Find the bus object with the specified ID
  const busIndex = busesBooked.findIndex(bus => bus.id === busId);

  if (busIndex === -1) {
    console.error('Bus not found in the user\'s booked buses list.');
    return;
  }

  // Remove the bus from the list
  busesBooked.splice(busIndex, 1);

  console.log('Bus successfully deleted.');
}





