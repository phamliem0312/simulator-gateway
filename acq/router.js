const router = require('express').Router();

router.put('/api/v1/pacs.002.001.09', (req, res)=>{
    const data = req.body;

    console.log(JSON.stringify(data, null, 2));
    
    res.status(200).send({
        msg: "Successfully"
    });
});

module.exports = router;