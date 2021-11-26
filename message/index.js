const fs = require('fs');

module.exports = ()=>{
    return new Promise((resolve, reject)=>{
        fs.readdir('./message', (err, filename)=>{
            if (err) {
                reject(err);
            } else {
                let files = [];
                filename.forEach(element=>{
                    if (element != "index.js") {
                        files.push(element);
                    }
                })
                resolve(files);
            }
        })
    })
}