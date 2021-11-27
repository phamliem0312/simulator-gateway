const fs = require('fs');
const baseUrl = "http://localhost:3001"
const pacs00200109 = JSON.parse(fs.readFileSync('../message/pacs.002.001.09.json').toString());
const camt02500104 = JSON.parse(fs.readFileSync('../message/camt.025.001.04.json').toString());
const ack = JSON.parse(fs.readFileSync('../message/acknack.json').toString());
module.exports = {
    pacs00200109: {
        url: baseUrl + "/gateway/v1/single/BANKVNVN/pacs.002.001.09/",
        data: pacs00200109
    },
    camt02500104: {
        url: baseUrl + "/gateway/v1/single/BANKVNVN/camt.025.001.04/",
        data: camt02500104
    },
    ack: {
        url: baseUrl + "/gateway/v1/single/BANKVNVN/acknack/",
        data: ack
    }
}