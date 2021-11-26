const fs = require('fs');
const baseUrl = "http://localhost:3001";
const pacs00800107 = JSON.parse(fs.readFileSync('./message/pacs.008.001.07.json').toString());
const pacs00800107 = JSON.parse(fs.readFileSync('./message/pacs.003.001.07.json').toString());
module.exports = {
    pacs00800107:{
        url: baseUrl + "/gateway/v1/single/pacs.008.001.07",
        data: pacs00800107
    },
    pacs00300107:{
        url: baseUrl + "/gateway/v1/single/pacs.003.001.07",
        data: {
            msg: "pacs.003.001.07"
        }
    }
}