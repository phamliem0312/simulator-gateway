const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'phamliem',
    password: '061102',
    database: 'my-project-nodejs'
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    conn.query('SELECT * FROM `users` WHERE username = ?',[username], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(404).send("Error occured while query db");
        }
        console.log(results[0]);
        if (!results[0]) {
            return res.send("Username not exists");
        }

        if (results[0].status == 'L') {
            return res.send("User is locked");
        }

        if (results[0].password != password) {
            let loginF = parseInt(results[0].loginF + 1);
            if (loginF == 5) {
                conn.query('UPDATE `users` SET status= ? WHERE username = ?', ['L', username]);
            }else{
                conn.query('UPDATE `users` SET loginF= ? WHERE username = ?',[loginF, username]);
            }
            
            return res.send("Invalid password");
        }

        conn.query('UPDATE `users` SET loginF= ?  WHERE username = ?',[0, username]);

        res.send("Login success");
    });
    
});

module.exports = router;