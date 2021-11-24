const router = require('express').Router();

router.put('/api/v1/pacs.008.001.07', (req, res)=>{
    const data = req.body;
    console.log(JSON.stringify(data, null, 2));
    res.status(200).send({
        msg: "Successfully"
    });
});

module.exports = router;