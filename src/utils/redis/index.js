const redis = require("redis");

const redisClient = redis.createClient({
  legacyMode: true
});

redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redisClient.connect().then();

export default redisClient;
