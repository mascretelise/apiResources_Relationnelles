const mysql = require('mysql2');
const http = require('http');
const bcrypt = require('bcrypt');

const server = http.createServer(async (request, res) => {
  // Display all headers in the console
  console.log('Headers:', request.headers);

  // Retrieve headers
  const nom = request.headers['nom'];
  const prenom = request.headers['prenom'];
  const email = request.headers['email'];
  const password = request.headers['password'];

  // Check for missing values
  let missingValueErrorMessage = 'Les champs suivants sont introuvables :';
  let showError = false;

  if (!nom) {
    missingValueErrorMessage += '\n - Nom';
    showError = true;
  }
  if (!prenom) {
    missingValueErrorMessage += '\n - Prénom';
    showError = true;
  }
  if (!email) {
    missingValueErrorMessage += '\n - Email';
    showError = true;
  }
  if (!password) {
    missingValueErrorMessage += '\n - Password';
    showError = true;
  }

  if (showError) {
    res.statusCode = 400; // Bad Request
    res.end(missingValueErrorMessage);
    return;
  }

  // Hash the password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10); // Await the hash result
  } catch (err) {
    console.error('Error hashing password:', err);
    res.statusCode = 500; // Internal Server Error
    res.end('Error hashing password');
    return;
  }

  console.log(
    `User Information:\n- Nom: ${nom}\n- Prénom: ${prenom}\n- Email: ${email}\n- Hashed Password: ${hashedPassword}`
  );

  // Connect to the database
  const connection = mysql.createConnection({
    host: 'localhost', // Host DB
    user: 'root', // Username DB
    password: 'password', // Password DB
    database: 'testdb', // Name DB
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.statusCode = 500; // Internal Server Error
      res.end('Error connecting to the database');
      return;
    }

    console.log('Connected to the database');

    // faire l'insertion dans la bdd
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(query, [email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.statusCode = 500; // Internal Server Error
        res.end('Database query error');
      } else {
        console.log('Login Results:', results);

        if (results.length > 0) {
          res.end('Compte créé avec succès');
        }
      }

      // Close the database connection
      connection.end();
    });
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
