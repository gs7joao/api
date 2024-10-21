My first project NodeJS

**Overview**

This project is a simple Node.js API that uses middleware to handle requests and responses. It stores data in a db.json file and allows for CRUD operations (Create, Read, Update, Delete) on the data.

**Features**

**Middleware:** Handles JSON request bodies and routes requests based on HTTP methods and paths.

**Data Persistence**: Data is stored in a db.json file to ensure persistence across application restarts.

**Easy to Use**: Provides a simple interface for querying and managing data.

Clone the repository, install the necessary dependencies **npm install**  and runnint the project **npm run dev**
*

This will start the server, and you can access the API at http://localhost:3333.

**API Routes**

The following routes are available in the API:

1. **GET /products**  
   **Description:** Retrieves a list of all products.  
   **Response:** Returns an array of product objects.

2. **POST /products**  
   **Description:** Creates a new product.  
   **Request Body:**  
   - `name` (string): The name of the product.  
   - `price` (number): The price of the product.  
   **Response:** Returns the newly created product object with its assigned ID.

3. **PUT /products/:id**  
   **Description:** Updates an existing product by ID.  
   **Request Parameters:**  
   - `id` (string): The ID of the product to update.  
   **Request Body:**  
   - `name` (string, optional): The updated name of the product.  
   - `price` (number, optional): The updated price of the product.  
   **Response:** Returns the updated product object. If the product is not found, a 404 error is returned.

4. **DELETE /products/:id**  
   **Description:** Deletes a product by ID.  
   **Request Parameters:**  
   - `id` (string): The ID of the product to delete.  
   **Response:** Returns a confirmation message. If the product is not found, a 404 error is returned.

---

## Conclusion
This simple Node.js API serves as a foundation for building more complex applications. You can extend it by adding more features, improving error handling, or implementing authentication.

![Example Requisition API](./images/image.png)
