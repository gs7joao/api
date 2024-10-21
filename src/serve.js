import http from "node:http";
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js";
import { routeHandler } from "./middlewares/routeHandler.js";

/**
 * Creates an HTTP server that listens on port 3333 and handles incoming requests.
 * The server applies two middlewares: `jsonBodyHandler` for parsing JSON request bodies
 * and `routeHandler` for routing the request to the appropriate controller.
 *
 * @async
 * @function serve
 *
 * @example
 * // To start the server, run the following command in the terminal:
 * // "npm run dev"
 * 
 * @listens {http.Server} - The server listens on port 3333.
 */
const serve = http.createServer(async (request, response) => {
  // Process the request body, parsing it into JSON if applicable
  await jsonBodyHandler(request, response);
  
  // Handle routing based on the request's method and URL
  routeHandler(request, response);
});

// Start the server and listen on port 3333 for incoming connections
serve.listen(3333);
