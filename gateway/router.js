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

    // axios.put(config.ack.url, config.ack.data).then(()=>{
    //     console.log('Send ack successfully');
    //     axios.put(config.camt02500104.url + req.params.msgid, config.camt02500104.data).then(()=>{
    //         console.log('Send camt.025.001.04 successfully');
    axios.put("http://localhost:3000/acq/api/v1/pacs.002.001.09", req.body).then(() => {
        console.log('Send pacs.002.001.09 successfully');
    }).catch(err => {
        console.log('Error occured while send pacs.002.001.09');
    });
    //     }).catch(()=>{
    //         console.log("Error occured while send camt.025.001.04");
    //     })
    // }).catch(()=>{
    //     console.log("Error occured while send ack");
    // })

    res.status(200).send({
        msg: "Successfully"
    });
});

module.exports = router;