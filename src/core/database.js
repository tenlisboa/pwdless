const sqlite3 = require('sqlite3').verbose();

class Cache {
  static #db;

  static #setup() {
    if (!this.#db) {
      this.#db = new sqlite3.Database(':memory:');
      this.#db.exec('CREATE TABLE IF NOT EXISTS cache (key TEXT, value TEXT)');
    }
  }

  static set(key, value) {
    this.#setup();

    const stringifiedValue = JSON.stringify(value);

    return new Promise((resolve, reject) => {
      this.#db.get('SELECT * FROM cache WHERE key = ?', [key], (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        if (row) {
          this.#db.run(
            'UPDATE cache SET value = ? WHERE key = ?',
            [stringifiedValue, key],
            (err) => {
              if (err) {
                reject(err);
                return;
              }

              resolve();
            }
          );
        } else {
          this.#db.run(
            'INSERT INTO cache (key, value) VALUES (?, ?)',
            [key, stringifiedValue],
            (err) => {
              if (err) {
                reject(err);
                return;
              }

              resolve();
            }
          );
        }
      });
    });
  }

  static get(key) {
    this.#setup();

    return new Promise((resolve, reject) => {
      this.#db.get('SELECT * FROM cache WHERE key = ?', [key], (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        if (row) {
          resolve(JSON.parse(row.value));
        } else {
          resolve(null);
        }
      });
    });
  }
}

module.exports = Cache;
