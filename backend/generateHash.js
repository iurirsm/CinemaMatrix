const bcrypt = require('bcryptjs');

const password = 'Judderest5589';  // The password you want to hash

// Hash the password with bcryptjs
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.log('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);  // This will output the hashed password
  }
});
