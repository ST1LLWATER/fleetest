const Redis = require('ioredis');
require('dotenv').config();

const ioredis_client = new Redis({
  host: 'localhost',
  port: 6379,
  password: '12345678',
  maxRetriesPerRequest: 3,
});

ioredis_client.on('connect', async () => {
  console.log('Connected with IoRedis Client');
});

ioredis_client.on('error', (err) => {
  console.log('Io-Redis Connection Error');
  console.log({ Error: err });
});

ioredis_client.on('close', () => {
  console.log('IO-Redis connection closed');
});

module.exports = { ioredis_client };
