const redis = require('redis');
const redisLCient = redis.createClient();
const startTime = new Date();

console.log(startTime);

setInterval(() => {
    let currentTime = new Date();
    redisLCient.HGETALL('message').then(list=>{
        console.log(list);
    }).catch(err=>{
        console.log(err);
    })
    console.log(currentTime.getTime());
    console.log(currentTime.getTime() - startTime.getTime());
}, 30000);