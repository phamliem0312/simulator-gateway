const app = require('express')();
const bodyParser = require('body-parser');
const rl = require('readline-sync');
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./router');
app.use('/acq', router);

const helper = require('./helper');

setTimeout(() => {
    helper.getList(()=>{
        let option = rl.question("Enter: ");
        helper.sendMess(option);
    })
}, 2000);

app.use((req, res)=>{
    res.status(404).send("Not found ", req.url);
});

app.listen(PORT, ()=>{
    console.log("ACQ is running on port", PORT);
});