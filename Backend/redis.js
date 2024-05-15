const redis = require('redis');
const { promisify } = require('util');

// Create Redis client
const redisClient = redis.createClient();

// Promisify Redis set method
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

// Function to set a key-value pair in Redis
const setKeyValueInRedis = async (key, value) => {
    try {
        // Set the key-value pair in Redis
        await redisSetAsync(key, value);
        console.log('Key-value pair set successfully in Redis');
    } catch (error) {
        // Handle error
        console.error('Error setting key-value pair in Redis:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

const redisGetAsync = promisify(redisClient.get).bind(redisClient);

// Function to fetch prefix from Redis
const getPrefixFromRedis = async (key) => {
    try {
        // Fetch prefix from Redis
        const prefix = await redisGetAsync(key);
        return prefix || 'mur'; // Return the fetched prefix or a default value if not found
    } catch (error) {
        // Handle error
        console.error('Error fetching prefix from Redis:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

module.exports = { setKeyValueInRedis, getPrefixFromRedis };
