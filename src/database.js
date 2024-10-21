import fs from "node:fs/promises";

// Define the path to the database file (db.json)
const DATABASE_PATH = new URL("db.json", import.meta.url);

/**
 * Database class to manage a simple JSON file-based database.
 */
export class Database {
  #database = {};

  /**
   * Initializes the Database instance by loading data from db.json.
   * If the file doesn't exist, it creates a new database object.
   */
  constructor() {
    fs.readFile(DATABASE_PATH, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => this.#persist());
  }

  /**
   * Persists the current database state to db.json.
   */
  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database, null, 2)); // Pretty print JSON
  }

  /**
   * Inserts data into a specified table within the database.
   * If the table exists and is an array, the new data is pushed to the array.
   * If the table does not exist, it initializes it as an array containing the new data.
   *
   * @param {string} table - The name of the table to insert data into.
   * @param {Object} data - The data object to insert.
   */
  insert(table, data) {
    // Check if the table exists and is an array
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data); // Add new data to the existing array
    } else {
      this.#database[table] = [data]; // Initialize as an array with the new data
    }

    this.#persist(); // Save changes to db.json
  }

  /**
   * Selects and returns data from a specified table.
   *
   * @param {string} table - The name of the table to select data from.
   * @returns {Array|Object} - The data from the specified table.
   */
  select(table) {
    return this.#database[table] ?? []; // Return an empty array if the table doesn't exist
  }
}
