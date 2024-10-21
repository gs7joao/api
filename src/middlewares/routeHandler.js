import { routes } from "../routes.js";
import { extractQueryParams } from "../utils/extract-query-params.js";
import { Database } from "../database.js";

/**
 * Handles incoming HTTP requests by matching them to defined routes, 
 * extracting route parameters and query strings, and invoking the 
 * appropriate route controller.
 *
 * @param {Object} request - The HTTP request object containing the method and URL.
 * @param {Object} response - The HTTP response object used to send responses back to the client.
 *
 * @returns {void} - No return value, but the function modifies the request object and sends a response.
 *
 * @example
 * // Example usage in an HTTP server:
 * routeHandler(req, res);
 */

const database = new Database()

export function routeHandler(request, response) {
  // Find the matching route based on HTTP method and URL pattern
  const route = routes.find((route) => {
    return (route.method === request.method && route.path.test(request.url))
  });

  // If a matching route is found
  if (route) {
    // Extract the route parameters from the URL
    const routeParams = request.url.match(route.path);
    const {query, ...params} = routeParams.groups;

    // Assign the extracted parameters and query string to the request object
    request.params = params;
    request.query = query ? extractQueryParams(query) : {};

    // Invoke the controller associated with the matched route
    return route.controller({request, response, database});
  }

  // If no matching route is found, respond with a 201 status and a "Route not found" message
  return response.writeHead(201).end("Route not found");
}