const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    (async () => {
      await this.client.connect();
    })();
    this.client.on('error', (err) => console.log(err));
  }

  isAlive() {
    return (this.client.connected);
  }

  async get(key) {
    const value = await this.client.get(key);
    return (value);
  }

  async set(key, value, duration) {
    await this.client.set(key, value, 'EX', duration);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
