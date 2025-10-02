const redis = require('redis');

let redisClient;

async function initClient() {
    redisClient = redis.createClient();
    redisClient.on('error', (error) => console.error(`Error: ${error}`));
    await redisClient.connect();
    console.log('redis connected successfully');
}

function getRedisClient() {
    return redisClient;
}

module.exports = { initClient, getRedisClient };
