import { createClient } from "redis";

export class RedisService {
    constructor() {
        if (!process.env.REDIS_URL) {
            console.warn("WARNING: REDIS_URL is not defined in .env. Redis features will be disabled.");
            this._client = null;
            return;
        }
        this._client = createClient({
            url: process.env.REDIS_URL ,
            socket: {
                reconnectStrategy: (retries) => {
                    if (retries > 5) {
                        console.error('Redis: Too many retries. Disabling Redis.');
                        return new Error('Too many retries');
                    }
                    return Math.min(retries * 100, 3000);
                }
            }
        });
        this._client.on('error', (err) => {
            console.error('Redis client error:', err.message);
            // If connection fails, we might want to null it out to prevent further crashes
            // but for now we just log it.
        });
        this._client.on('connect', () => console.log('Redis connected'));
        this._client.on('end', () => console.log('Redis client disconnected')); 
    }

    async connect() {
        if (!this._client) return;
        if (!this._client.isOpen) {
            await this._client.connect();
        }
    }

    async disconnect() {
        if (!this._client) return;
        if (this._client.isOpen) {
            await this._client.quit();
        }
    }

    async get(key) {
        if (!this._client) return null;
        if (!this._client.isOpen) {
            await this.connect();
        }
        if (!key) return null
        try {
            return await this._client.get(key);
        } catch (err) {
            console.error(`Error getting key ${key}:`, err);
            throw err;
        }
    }

    async set(key, seconds, value) {
        if (!this._client) return;
        if (!this._client.isOpen) {
            await this.connect();
        }
        try {
            await this._client.set(key, value, { EX: seconds });
        } catch (err) {
            console.error(`Error setting key ${key}:`, err);
            throw err;
        }
    }

    async del(key) {
        if (!this._client) return;
        if (!this._client.isOpen) {
            await this.connect();
        }
        if(!key) return
        try {
            await this._client.del(key);
        } catch (err) {
            console.error(`Error deleting key ${key}:`, err);
            throw err;
        }
    }
    async setPermenant(key, value) {
        if (!this._client) return;
        if (!this._client.isOpen) {
            await this.connect()
        }
        try {
            await this._client.set(key, value)
        } catch (err) {
            console.error(`Error setting Permenentkey ${key}:`, err);
            throw err;
        }
    }
    getClient() {
        return this._client;
    }
}

export default new RedisService();
