exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
        try {
            const API_KEY = process.env.COMPLYCUBE_API_KEY;

            // Process the GET request as needed
            //const data = require('./db.json');

            // Return the data as the response
            return {
                statusCode: 200,
                body: JSON.stringify(API_KEY),
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