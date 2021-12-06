const router = require('express').Router();
const axios = require('axios');
const config = require('./cfg');

router.put('/api/v1/pacs.008.001.07/:msgid', (req, res)=>{
    const data = req.body;
    console.log(JSON.stringify(data, null, 2));

    axios.put(config.ack.url, config.ack.data).then(()=>{
        console.log('Send ack successfully');
        axios.put(config.camt02500104.url, config.camt02500104.data).then(()=>{
            console.log('Send camt.025.001.04 successfully');
            axios.put(config.pacs00200109.url, config.pacs00200109.data).then(()=>{
                console.log('Send pacs.002.001.07 successfully');
            }).catch(err=>{
                console.log('Error occured while send pacs.008.001.07');
            });
        }).catch(()=>{
            console.log("Error occured while send camt.025.001.04");
        })
    }).catch(()=>{
        console.log("Error occured while send ack");
    })

    res.send({
        msg: "Successfully"
    });
});

module.exports = router;