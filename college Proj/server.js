const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000; // You can change the port number if needed

app.use(express.static(path.join(__dirname)));
app.use(express.json())

// Route for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// Route for handling signup
app.post('/signup', (req, res) => {
  const { name, email, password, mobile } = req.body;

  // Check if the user already exists
  if (fs.existsSync(`userinfo/${email.slice(0, email.indexOf('@'))}.json`)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Create a new user object
  const user = {
    name: name,
    email: email,
    password: password,
    mobile: mobile,
    busesBooked: [],
    history: [],
    image: '',
    balance: '',
  };

  // Save user data to a JSON file
  fs.writeFile(`userinfo/${email.slice(0, email.indexOf('@'))}.json`, JSON.stringify(user), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    res.json({ success: true, message: 'User registered successfully' });
  });
});


// Route for handling login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  if (!fs.existsSync(`userinfo/${email.slice(0, email.indexOf('@'))}.json`)) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Read the user data from the JSON file
  fs.readFile(`userinfo/${email.slice(0, email.indexOf('@'))}.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const user = JSON.parse(data);

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login
    res.json({ message: 'Login successful', user });
  });
});


app.post('/editInfo', (req, res) => {
  let user = {
    name: '',
    email: '',
    password: '',
    mobile: '',
    busesBooked: [],
    history: [],
    image: '',
    balance: '',
  };

  fs.readFile(`userinfo/${req.body.filename}.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    user = JSON.parse(data);
    if (user.password !== req.body.oldPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    if (req.body.name !== undefined && req.body.name !== '') {
      user.name = req.body.name;
    }
    if (req.body.password !== undefined && req.body.password !== '') {
      user.password = req.body.password;
    }
    if (req.body.number !== undefined && req.body.number !== '') {
      user.mobile = req.body.number;
    }

    fs.writeFile(`userinfo/${req.body.filename}.json`, JSON.stringify(user), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      res.json({ success: true, message: 'edit successful' });
    });
  });
});

app.post('/addBooking', (req, res) => {
  const { filename, busId, name, number, source, destination, date, passengers, price } = req.body;

  fs.readFile(`userinfo/${filename}.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    let user = JSON.parse(data);

    // Create a new booking object
    const booking = {
      busId,
      name,
      number,
      source,
      destination,
      date,
      passengers,
      price,
    };

    // Add the booking to the user's booked buses
    user.busesBooked.push(booking);

    // Save the updated user data back to the file
    fs.writeFile(`userinfo/${filename}.json`, JSON.stringify(user), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      res.json({ success: true, message: 'Booking successful' });
    });
  });
});

app.post('/myBookings', (req, res) => {
  if (req.body.filename !== undefined) {

    fs.readFile(`userinfo/${req.body.filename}.json`, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      let user = JSON.parse(data);
      res.json({ success: true, message: 'bookings loaded', user });
    });
  }
});

app.post('/deleteBooking', (req, res) => {
  const busId = req.body.busID;
  const filename = req.body.filename;

  fs.readFile(`userinfo/${filename}.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    let user = JSON.parse(data);

    // Find the index of the bus object with the specified ID in the busesBooked list
    const busIndex = user.busesBooked.findIndex(bus => bus.id === busId);

    if (busIndex === -1) {
      // Bus object not found, return an error response
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    // Remove the bus object from the busesBooked list
    user.busesBooked.splice(busIndex, 1);

    // Save the updated user data back to the file
    fs.writeFile(`userinfo/${filename}.json`, JSON.stringify(user), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      res.json({ success: true, message: 'Booking deleted', bookings: user.busesBooked });
    });
  });
});

app.post('/getRoutes',(req,res)=>{
  let routes={};
  fs.readFile('routes/routes.json','utf8',(err,data)=>{
    if(err){
      return res.status(404).json({ success: false, message: 'failed' });
    }
    routes=JSON.parse(data);
    return res.json({success:true,message:'success',routes});
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

