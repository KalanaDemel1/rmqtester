#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

/*
amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        ch.assertQueue(q, {durable: true});
        ch.sendToQueue(q, new Buffer(msg), {persistent: true});
        console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});*/

/*
 amqp.connect('amqp://localhost', function(err, conn) {
 conn.createChannel(function(err, ch) {
 var ex = 'logs';
 var msg = process.argv.slice(2).join(' ') || 'Hello World!';

 ch.assertExchange(ex, 'fanout', {durable: false});
 ch.publish(ex, '', new Buffer(msg));
 console.log(" [x] Sent %s", msg);
 });

 setTimeout(function() { conn.close(); process.exit(0) }, 500);
 });*/

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'rating_engine';
        var args = process.argv.slice(2);
        var msg = args.slice(1).join(' ') || '{"headers": {"namespace": "kalanade.developer.duoworld.com","class": "application","username": "123"},"body": {"Size": 1, "criteria": "tenant" },"route": "invoice"}';
        var severity = (args.length > 0) ? args[0] : 'invoice';

        ch.assertExchange(ex, 'direct', {durable: false});
        ch.publish(ex, severity, new Buffer(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
    });

    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});