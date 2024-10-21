/**
 * Handles the body of an HTTP request, converting it from a stream of chunks
 * into a JSON object and setting the appropriate response headers.
 *
 * @param {Object} request - The incoming HTTP request object.
 * @param {Object} response - The outgoing HTTP response object.
 *
 * @returns {Promise<void>} - This function does not return any value, but modifies the `request.body`.
 *
 * @example
 * // Example usage in an HTTP server:
 * server.on('request', (req, res) => {
 *   jsonBodyHandler(req, res);
 * });
 */
export async function jsonBodyHandler(request, response) {
    console.log('roda')
    // Array to store incoming chunks of data
    const buffers = [];

    // Collect chunks from the request stream
    for await (const chunk of request) {
        buffers.push(chunk);
    }
    
    try {
        // Concatenate the chunks, convert to string, and parse as JSON
        request.body = JSON.parse(Buffer.concat(buffers).toString());

    } catch (error) {
        // In case of error (invalid JSON), set request.body to null
        request.body = null;
    }

    // Set the response header to indicate the content type is JSON
    response.setHeader("Content-Type", "application/json");
}
