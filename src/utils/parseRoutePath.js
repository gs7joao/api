/**
 * Transforms a route path with dynamic parameters into a regular expression
 * that can be used to capture the parameters and the query string from a real URL.
 *
 * @param {string} path - The route path, possibly containing dynamic parameters in the format `:param`.
 * @returns {RegExp} - Returns a regular expression that matches the route path and captures dynamic parameters.
 *
 * @example
 * // Example usage:
 * const regex = parseRoutePath('/users/:id/posts/:postId');
 * const result = regex.exec('/users/123/posts/456?foo=bar');
 * console.log(result.groups.id); // "123"
 * console.log(result.groups.postId); // "456"
 * console.log(result.groups.query); // "?foo=bar"
 */
export function parseRoutePath(path) {
  // Regular expression to identify dynamic parameters in the format `:param`
  const routeParametersRegex = /:([a-zA-Z]+)/g

  // Replaces each dynamic parameter with a named capturing group in the regular expression
  // that captures values made of lowercase letters, numbers, hyphens, or underscores
  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_]+)")

  // Creates a regular expression that matches the route path and optionally captures a query string
  const pathRegex = new RegExp(`${params}(?<query>\\?(.*))?$`)

  // Returns the generated regular expression
  return pathRegex
}
