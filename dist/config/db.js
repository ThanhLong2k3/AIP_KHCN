"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
exports.executeQuery = executeQuery;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
async function getConnection() {
    for (let i = 0; i < 10; i++) {
        try {
            const connection = await pool.getConnection();
            console.log('Successfully connected to MySQL');
            connection.release();
            return pool;
        }
        catch (error) {
            console.error(`MySQL connection attempt ${i + 1} failed:`, error.message);
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
    throw new Error('Failed to connect to MySQL after retries');
}
async function executeQuery(query, params = []) {
    const pool = await getConnection();
    try {
        const [rows] = await pool.execute(query, params);
        return rows;
    }
    catch (error) {
        console.error('Query execution failed:', error.message);
        throw new Error(`Database error: ${error.message}`);
    }
}
exports.default = pool;
