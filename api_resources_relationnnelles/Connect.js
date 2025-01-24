const mysql = require('mysql2');
const http = require('http');
const bcrypt = require('bcrypt');



const server = http.createServer((request, res) => {
    //Affichage de tous les headers dans la console
    console.log('Headers:', request.headers);
  
    //Récupération des headers avec username et password
    const username = request.headers['username'];
    const password = request.headers['password'];

    if (!username || !password) {
        res.statusCode = 400;  // Bad Request
        res.end('Missing username or password');
        return;
      }

    //Hashage du mot de passe
    try {
        const hashedPassword = bcrypt.hash(password, saltRounds);
        hash = hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }    
    
    console.log(username);
    console.log(hash);

    res.end('Headers received');//fermeture de la connexion

    // Create a connection to the database
    const connection = mysql.createConnection({
    host: 'localhost', // Host BDD
    user: 'root',      // Username BDD
    password: 'password', // Password BDD
    database: 'testdb',   // Nom BDD
    });

    // Connect to the database
    connection.connect((err) => {

    if (err) { //Si la connexion a échouée
        console.error('Error connecting to the database:', err);
        return;
    }

    // Authentification
    try{
        connection.query("SELECT * FROM users WHERE username='"+username+"' AND password='"+hash+"'", (err, results) => {
            if (err) {
                console.error('Erreur requête :', err);
            } 
            else {
                console.log('Results login:', results);
                print(results)
            }

            // Close the connection
            connection.end();
        });
    }
    catch(e){
        print(e);
    }
    });
    
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
