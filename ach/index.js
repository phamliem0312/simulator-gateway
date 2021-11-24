const app = require('express')();
const bodyParser = require('body-parser');
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./router');
app.use('/ach', router);

app.use((req, res)=>{
    res.status(404).send("Not found ", req.url);
});

app.listen(PORT, ()=>{
    console.log("ACH is running on port", PORT);
});