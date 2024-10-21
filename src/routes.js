import { parseRoutePath } from "./utils/parseRoutePath.js";

/**
 * Array of route definitions for handling HTTP requests. Each route contains
 * a method (GET, POST, DELETE), a path (with possible parameters), and a controller
 * function that processes the request and sends the response.
*/

export const routes = [
  {
    method: "GET",
    path: "/products",
    controller: (request, response) => {
      // Responds with a list of products, including query parameters
      return response.end("List Products \n" + JSON.stringify(request.query));
    }
  },
  {
    method: "POST",
    path: "/products",
    controller: (request, response) => {
      // Responds with the body of the request after creating a new product
      return response.writeHead(201).end(JSON.stringify(request.body));
    }
  },
  {
    method: "DELETE",
    path: "/products/:id",
    controller: (request, response) => {
      // Responds with the ID of the product that was deleted
      return response.end("Product Deleted ID: " + request.params.id);
    }
  }
].map((route) => ({
  ...route,
  // Converts the route path to a regular expression for handling dynamic segments
  path: parseRoutePath(route.path),
}));
