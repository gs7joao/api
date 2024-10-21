import { parseRoutePath } from "./utils/parseRoutePath.js";
import { v4 as uuidv4 } from 'uuid'; // Import LIBS UUID for ID's 

/**
 * Array of route definitions for handling HTTP requests. Each route contains
 * a method (GET, POST, DELETE), a path (with possible parameters), and a controller
 * function that processes the request and sends the response.
 */

export const routes = [
  {
    method: "GET",
    path: "/products",
    controller: ({ request, response, database }) => {
      const products = database.select("products");
      // Responds with a list of products
      return response.end(JSON.stringify(products));
    }
  }, {
    method: "POST",
    path: "/products",
    controller: ({ request, response, database }) => {
      const { name, price } = request.body;
      const newProduct = { id: uuidv4(), name, price };

      database.insert("products", newProduct);
      // Responds with the newly created product
      return response.writeHead(201).end(JSON.stringify(newProduct));
    }
  }, {
    method: "PUT",
    path: "/products/:id",
    controller: ({ request, response, database }) => {
      const id = request.params.id;
      const { name, price } = request.query;

      const updated = database.update("products", id, { name, price });

      if (updated) {
        // Responds with the updated product data
        return response.end(JSON.stringify({ id, name, price }));
      } else {
        // Handle case where product was not found
        return response.writeHead(404).end("Product not found");
      }
    }
  }, {
    method: "DELETE",
    path: "/products/:id",
    controller: ({ request, response, database }) => {
      const id = request.params.id;
      const result = database.delete("products", id); // Chama o método de delete no banco de dados

      if (result) {
        // Responds with the ID of the product that was deleted
        return response.end("Product Deleted ID: " + id);
      } else {
        // Handle case where product was not found
        return response.writeHead(404).end("Product not found");
      }
    }
  }
].map((route) => ({
  ...route,
  // Converts the route path to a regular expression for handling dynamic segments
  path: parseRoutePath(route.path),
}));
