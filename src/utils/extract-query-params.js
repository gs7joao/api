/**
 * Extracts query string parameters from a URL and converts them into a key-value object.
 *
 * @param {string} query - The query string from a URL, typically starting with a `?`.
 * @returns {Object} - An object containing key-value pairs where each key is a parameter name and its value is the parameter's value.
 *
 * @example
 * // Example usage:
 * const params = extractQueryParams("?name=Joao&age=30");
 * console.log(params); // { name: "Joao", age: "30" }
 */
export function extractQueryParams(query) {
  // Remove the first character (usually "?") and split the query string into key-value pairs
  return query.slice(1).split("&").reduce((queryParams, params) => {
    // Split each key-value pair by the "=" character
    const [key, value] = params.split("=")
    // Add the key and value to the queryParams object
    queryParams[key] = value;
    // Return the queryParams object for the next iteration
    return queryParams
  }, {})
}
