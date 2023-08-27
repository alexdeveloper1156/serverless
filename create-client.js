exports.handler = async (event, context) => {
    if (event.httpMethod === "OPTIONS") {
        console.log("IF OPTIONS");

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET, POST, OPTION",
            },
        };
    }

    if (event.httpMethod === 'POST') {
        try {
            console.log('{POST!');
            // Add CORS headers
            const headers = {
                'Access-Control-Allow-Origin': '*', // Replace * with the appropriate domain
            };

            const requestBody = JSON.parse(event.body);
            const apiKey = process.env.COMPLYCUBE_API_KEY;
            const url = 'https://api.complycube.com/v1/clients';
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", apiKey);

            const res = await fetch(url,{
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(requestBody)
            });
            if (res.ok) {
                const data = await res.json();

                return {
                    statusCode: 200,
                    body: JSON.stringify(data),
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Methods": "GET, POST, OPTION",
                    },
                };
            } else {
                const err = await res.json();
                console.log(err);
                return {
                    statusCode: 501,
                    body: JSON.stringify(err),
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Methods": "GET, POST, OPTION",
                    },
                };
            }

        } catch (error) {
            console.log(error);
            // Return an error response if there was an issue processing the request
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to process GET request' }),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET, POST, OPTION",
                },
            };
        }
    }
};