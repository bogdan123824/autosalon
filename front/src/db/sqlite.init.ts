import Database from 'better-sqlite3';

const DB_PATH = process.env.REACT_APP_DB_PATH || './autosalon.db';

let db: Database.Database | null = null;

const initDatabase = (): Database.Database => {
    if (db) {
        return db;
    }

    try {
        db = new Database(DB_PATH);
        
        db.pragma('foreign_keys = ON');
        
        const schema = `
            CREATE TABLE IF NOT EXISTS cars (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                price REAL NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS gallery (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                car_id INTEGER NOT NULL,
                img_url TEXT NOT NULL,
                type TEXT,
                FOREIGN KEY (car_id) REFERENCES cars(id)
            );
            
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                car_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (car_id) REFERENCES cars(id)
            );
        `;
        
        db.exec(schema);
        console.log('SQLite database initialized successfully');
        
        return db;
    } catch (error) {
        console.error('Database initialization error:', error);
        throw new Error('Failed to initialize SQLite database');
    }
};

export const getDatabase = (): Database.Database => {
    if (!db) {
        return initDatabase();
    }
    return db;
};

export const closeDatabase = (): void => {
    if (db) {
        db.close();
        db = null;
    }
};

export default initDatabase;
