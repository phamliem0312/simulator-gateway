const net  = require('net');
const server = net.createServer(connection=>{
    console.log('Connect to client');
    connection.on('end', ()=>{
        console.log('Disconnect to client')
    })

    connection.on('error', ()=>{
        console.log('Disconnect to client')
    })

    connection.on('data', (data)=>{
        let message = data.toString();
        console.log('signature: ', message);
        let response = {
            isVerifed: true
        }
        connection.write(JSON.stringify(response));
    })
});

server.listen(7777, 'localhost', (err)=>{
    console.log("Socket server is running");
});