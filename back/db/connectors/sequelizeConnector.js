const { getDatabase } = require('../../config/db');

class SQLiteConnector {
    static instance = null;

    static getInstance() {
        if (!SQLiteConnector.instance) {
            SQLiteConnector.instance = new SQLiteConnector();
        }
        return SQLiteConnector.instance;
    }

    constructor() {
        if (SQLiteConnector.instance) {
            throw new Error("Use SQLiteConnector.getInstance()");
        }
        this.db = getDatabase();
    }

    getDatabase() {
        return this.db;
    }

    run(sql, params = []) {
        try {
            const stmt = this.db.prepare(sql);
            return stmt.run(...params);
        } catch (err) {
            console.error('Database run error:', err);
            throw err;
        }
    }

    get(sql, params = []) {
        try {
            const stmt = this.db.prepare(sql);
            return stmt.get(...params);
        } catch (err) {
            console.error('Database get error:', err);
            throw err;
        }
    }

    all(sql, params = []) {
        try {
            const stmt = this.db.prepare(sql);
            return stmt.all(...params);
        } catch (err) {
            console.error('Database all error:', err);
            throw err;
        }
    }

    exec(sql) {
        try {
            return this.db.exec(sql);
        } catch (err) {
            console.error('Database exec error:', err);
            throw err;
        }
    }
}

module.exports = SQLiteConnector;
module.exports.default = SQLiteConnector;