const config = require('./cfg');
const axios = require('axios');

function getList(cb){
    let keys = Object.keys(config);
    for (let i = 0; i < keys.length; i++) {
        console.log(i + ". " + keys[i]);
    }
    cb(keys);
}

function sendMess(params) {
    const param = parseInt(params);
    const keys = Object.keys(config);
    let url = config[keys[param]].url;
    let data = config[keys[param]].data;

    axios.put(url, data).then(response=>{
        console.log("Successfully");
    }).catch(err=>{
        console.log("Error");
    });
}
module.exports = {
    getList: getList,
    sendMess: sendMess
}