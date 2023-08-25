const data = require("./db.json");
exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        try {
            // Add CORS headers
            const headers = {
                'Access-Control-Allow-Origin': '*', // Replace * with the appropriate domain
                'Access-Control-Allow-Headers': 'Content-Type',
            };

            const requestBody = JSON.parse(event.body);
            const apiKey = process.env.COMPLYCUBE_API_KEY;
            const url = 'https://api.complycube.com/v1/clients';
            const requestHeaders = {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            };

            fetch(url, {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            })
                .then(response => response.json())
                .then(result => {
                    return {
                        statusCode: 200,
                        body: result,
                    }
                })
                .catch(error => {
                    return {
                        statusCode: 500,
                        body: error.getError().body
                    };
                });
            return {
                statusCode: 500,
                body: 'WTF'
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