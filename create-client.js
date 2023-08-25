const data = require("./db.json");
exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        try {
            // Add CORS headers
            const headers = {
                'Access-Control-Allow-Origin': '*', // Replace * with the appropriate domain
                'Access-Control-Allow-Headers': 'Content-Type',
            };



        } catch (error) {
            // Return an error response if there was an issue processing the request
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to process GET request' }),
            };
        }
    }
};