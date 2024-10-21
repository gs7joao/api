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

  /**
   * Updates a product in the specified table using its ID.
   *
   * @param {string} table - The name of the table to update.
   * @param {string} id - The ID of the product to update.
   * @param {Object} newData - The new data to update the product with.
   * @returns {boolean} - True if the product was updated, false otherwise.
   */
  update(table, id, newData) {
    if (Array.isArray(this.#database[table])) {
      const productIndex = this.#database[table].findIndex(product => product.id === id);
      
      if (productIndex !== -1) {
        this.#database[table][productIndex] = { ...this.#database[table][productIndex], ...newData }; // update product
        this.#persist(); // Save changes to db.json
        return true; // Return true if updated
      }
    }
    return false; // If the table does not exist, is not an array, or product not found
  }

  /**
   * Deletes a product from the specified table using its ID.
   *
   * @param {string} table - The name of the table to delete from.
   * @param {string} id - The ID of the product to delete.
   * @returns {boolean} - True if the product was deleted, false otherwise.
   */
  delete(table, id) {
    if (Array.isArray(this.#database[table])) {
      const initialLength = this.#database[table].length;
      // Filter out the product with the specified ID
      this.#database[table] = this.#database[table].filter(product => product.id !== id);
      const newLength = this.#database[table].length;

      this.#persist(); // Save changes to db.json

      return newLength < initialLength; // Return true if an item was deleted
    }
    return false; // If table does not exist or is not an array
  }
}
