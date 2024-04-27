const { ioredis_client: redis } = require('../config/redis');
const { setInterval } = require('timers');
const { prisma } = require('../config/prisma');

function publishRandomLocation(topic) {
  setInterval(async () => {
    console.log('Publishing fleet location');

    const location = {
      latitude: Math.random() * 180 - 90,
      longitude: Math.random() * 360 - 180,
    };

    redis.publish(topic, JSON.stringify(location));

    await prisma.fleetTracking.create({
      data: {
        fleet_id: 1,
        latitude: location.latitude,
        longitude: location.longitude,
        status: 'OnAlert',
      },
    });
  }, 10000);
}

publishRandomLocation('fleet-update-1');
