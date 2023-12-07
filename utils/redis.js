const redis = require("redis");

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    ( async () => {
       await this.client.connect();
    })();
   this.client.on('error', err => console.log(err));
  }

  isAlive() {
    return (this.client.connected);
  }

  async get(key) {
    return ( await this.client.get(key));
  }

  async set(key, value, duration) {
    await this.client.set(key, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
