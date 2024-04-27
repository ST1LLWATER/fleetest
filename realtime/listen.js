const { ioredis_client: redis } = require('../config/redis');

const main = () => {
  redis.subscribe(`fleet-update-1`, (err, count) => {
    if (err) console.error(err.message);
    console.log(`Subscribed to fleet updates.`);
  });

  redis.on('message', (channel, message) => {
    console.log(`Received message from ${channel} channel.`);
    console.log(JSON.parse(message));
  });
};

main();
