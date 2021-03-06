const router = require('express').Router();
const Axios = require('axios');
const axios = Axios.create();
axios.defaults.timeout = 15000;
const Redis = require('redis');
const redis = Redis.createClient();

router.put('/api/v1/pacs.008.001.07', (req, res) => {
    const data = req.body;
    const getTime = new Date();
    redis.HSET('message' , data.Header.SenderReference, JSON.stringify({ time: getTime.getTime()}));

    console.log(JSON.stringify(data, null, 2));

    let signature = jwt.sign(data.Payload, privateKey, { algorithm: 'RS256', expiresIn: '10h' });


    req.body.Header.Signature = signature;

    axios.put("http://localhost:3002/ach/api/v1/pacs.008.001.07/" + req.body.Header.SenderReference, req.body).then(() => {
        console.log('Send pacs.002.001.09 successfully');
    }).catch(err => {
        console.log('Error occured while send pacs.002.001.09');
    });

    res.send({
        msg: "Successfully"
    });
});

router.put('/api/v1/pacs.002.001.09', (req, res) => {
    const data = req.body;
    redis.del(data.Payload.Document.FIToFIPmtStsRpt.OrgnlGrpInfAndSts.OrgnlMsgId);

    console.log(JSON.stringify(data, null, 2));

    //client.write(data.Header.Signature, (err) => {
    //if (err) throw err;
    // client.on('data', (message) => {
    //     let isVerifed = JSON.parse(message.toString()).isVerifed;
    //    if (isVerifed) {
    axios.put("http://localhost:3000/acq/api/v1/pacs.002.001.09", req.body).then(() => {
        console.log('Send pacs.002.001.09 successfully');
    }).catch(err => {
        console.log('Error occured while send pacs.002.001.09');
    });
    //         }
    //     })
    //});

    res.send({
        msg: "Successfully"
    });
});

router.put('/api/v1/camt.025.001.04', (req, res) => {
    const data = req.body;

    console.log(JSON.stringify(data, null, 2));

    res.send({
        msg: "Successfully"
    });
});

router.put('/api/v1/ack', (req, res) => {
    const data = req.body;

    console.log(JSON.stringify(data, null, 2));

    res.send({
        msg: "Successfully"
    });
});

module.exports = router;