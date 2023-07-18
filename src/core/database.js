const sqlite3 = require('sqlite3').verbose();

const _config = {
  dbPath: ':memory:',
};

let db;

function getDb() {
  if (!db) {
    db = new sqlite3.Database(_config.dbPath);
  }

  db.exec('CREATE TABLE IF NOT EXISTS cache (key TEXT, value TEXT)');

  return db;
}

function set(key, value) {
  const stringifiedValue = JSON.stringify(value);

  return new Promise((resolve, reject) => {
    getDb().get('SELECT * FROM cache WHERE key = ?', [key], (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (row) {
        getDb().run(
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
        getDb().run(
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

function get(key) {
  return new Promise((resolve, reject) => {
    getDb().get('SELECT * FROM cache WHERE key = ?', [key], (err, row) => {
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

module.exports = {
  set,
  get,
};
