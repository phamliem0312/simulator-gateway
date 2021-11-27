const app = require('express')();
const bodyParser = require('body-parser');
const rl = require('readline-sync');
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./router');
app.use('/gateway', router);

// app.use((req, res)=>{
//     res.status(400).send("Not found ", req.url);
// });

app.listen(PORT, ()=>{
    console.log("GW is running on port", PORT);
});