const router = require('express').Router();
const axios = require('axios');

router.put('/api/v1/pacs.008.001.07', (req, res) => {
    const data = req.body;

    console.log(JSON.stringify(data, null, 2));

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

    console.log(JSON.stringify(data, null, 2));

    axios.put("http://localhost:3000/acq/api/v1/pacs.002.001.09", req.body).then(() => {
        console.log('Send pacs.002.001.09 successfully');
    }).catch(err => {
        console.log('Error occured while send pacs.002.001.09');
    });

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