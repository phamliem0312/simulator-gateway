const fs = require('fs');
const baseUrl = "http://localhost:3001";
const pacs00800107_mess = JSON.parse(fs.readFileSync('../message/pacs.008.001.07.json').toString());
//const pacs00300107_mess = JSON.parse(fs.readFileSync('../message/pacs.003.001.07.json').toString());
module.exports = {
    pacs00800107:{
        url: baseUrl + "/gateway/api/v1/pacs.008.001.07",
        data: pacs00800107_mess
    },
    pacs00300107:{
        url: baseUrl + "/gateway/v1/single/pacs.003.001.07",
        data: {
            msg: "pacs00300107_mess"
        }
    }
}