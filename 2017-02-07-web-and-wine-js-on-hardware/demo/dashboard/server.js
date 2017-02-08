"use strict";

const Raspi = require("raspi-io");
const five = require("johnny-five");
const board = new five.Board({
    io: new Raspi()
});


const wsClients = [];
let currentTemperature = null;

function wsBroadcast(msg) {
    wsClients.forEach(client => {
        client.write(JSON.stringify(msg));
    });
}

const http = require("http");
const sockjs = require("sockjs");

function onRequest(req, res) {
    res.end(JSON.stringify({
        temperature: currentTemperature
    }));
}

const httpServer = http.createServer(onRequest).listen(8080);
const wsServer = sockjs.createServer();

wsServer.on("connection", (conn) => {
    wsClients.push(conn);
});

wsServer.installHandlers(httpServer, { prefix: "/stream" });

board.on("ready", function() {
    
    const multi = new five.Multi({
        controller: "MPL3115A2",
        elevation: 492
    });
    
    multi.on("change", function() {
        currentTemperature = this.temperature.celsius;
        console.log(this.temperature.celsius, this.barometer.pressure, this.altimeter.meters);
        
        wsBroadcast({
            temperature: this.temperature.celsius,
            ts: Date.now()
        });
    });
    
    multi.on("error", console.error);
});