const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const cfg = {
    hostDb: "localhost",
    userDb: "phamliem",
    passwordDb: "061102",
    databaseName: "my-project-nodejs",
    tableName: "users",
    time: 30
}

const conn = mysql.createConnection({
    host: cfg.hostDb,
    user: cfg.userDb,
    password: cfg.passwordDb,
    database: cfg.databaseName
});

router.put('/change-pass', (req, res)=>{
    const newPass = req.body.password;
    const username = req.body.username;

    conn.query('SELECT * FROM `' + cfg.tableName + '` WHERE username = ?', [username], (err, results)=> {
        if (err) {
            console.log(err);
            return res.status(404).send("Error occured while query db");
        }

        let passList = Object.values(results[0].passH);

        for (let i = 0; i < passList.length; i++) {
            if (passList[i] == newPass) {
                return res.send("Please entry other password!");
            }
        }

        let newPassH = {
            "1": newPass,
            "2": passList[0],
            "3": passList[1],
            "4": passList[2],
            "5": passList[3]
        }

        conn.query('UPDATE `' + cfg.tableName + '` SET password= ?, passH= ? WHERE username = ?', [newPass, JSON.stringify(newPassH), username], (err, result => {
            if (err) {
                return res.status(400).send("Error occured when update password");
            }else{
                return res.send("Update success");
            }
        }));
    });
})

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const currentTime = new Date();

    conn.query('SELECT * FROM `' + cfg.tableName + '` WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(404).send("Error occured while query db");
        }
        if (!results[0]) {
            return res.send("Username not exists");
        }

        if (results[0].status == 'L') {
            const timeL = results[0].timeL;
            let diff = (currentTime.getTime() - timeL.getTime()) / 60000;
            console.log(diff);

            if (diff < cfg.time) {
                return res.send("User is locked");
            } else {
                conn.query('UPDATE `' + cfg.tableName + '` SET loginF= ?, status= ?  WHERE username = ?', [0, 'A', username], (err, result => {
                    if (results[0].password != password) {
                        let loginF = 1;
                        conn.query('UPDATE `' + cfg.tableName + '` SET loginF= ? WHERE username = ?', [loginF, username]);
                        return res.send("Invalid password");
                    }

                    return res.send("Login success");
                }));
            }
        } else {
            if (results[0].password != password) {
                let loginF = parseInt(results[0].loginF + 1);
                if (loginF == 5) {
                    const lockTime = new Date();
                    conn.query('UPDATE `' + cfg.tableName + '` SET status= ?, timeL = ? WHERE username = ?', ['L', lockTime, username]);
                    return res.send("Invalid password");
                } else {
                    conn.query('UPDATE `' + cfg.tableName + '` SET loginF= ? WHERE username = ?', [loginF, username]);
                    return res.send("Invalid password");
                }
            }

            conn.query('UPDATE `' + cfg.tableName + '` SET loginF= ?  WHERE username = ?', [0, username]);

            res.send("Login success");
        }
    });

});

module.exports = router;