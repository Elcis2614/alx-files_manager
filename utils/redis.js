import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient()
      .on('error', (err) => console.log(err))
      .connect();
  }

  isAlive() {
    return (this.client.ping() === 'PONG');
  }

  async get(key) {
    return (this.client.get(key));
  }

  async set(key, value, duration) {
    this.client.set(key, value);
    this.client.get(key).expire(duration);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
