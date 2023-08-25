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
            console.log("APIKEY" + apiKey);
            const url = 'https://api.complycube.com/v1/clients';
            const requestHeaders = {
                'Authorization': "test_a2FIMmpZY0tEaWFLODg2OEU6ODRhMThhZDkyMDljZDUzNDYwNmEyZTc4NWVlYjE4ODg1YTY3OGQ2MGMzZWE0YTI1MDg2NmIyMTRjYmI0OTVmNA",
                'Content-Type': 'application/json'
            };

            const res = await fetch(url,{
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                return {
                    statusCode: 200,
                    body: 'worked'
                };
            } else {
                const err = await res.json();
                console.log(err);
                return {
                    statusCode: 501,
                    body: 'ERR'
                };
            }

            // fetch(url, {
            //     method: 'POST',
            //     headers: requestHeaders,
            //     body: JSON.stringify(requestBody)
            // }).then(response => response.json())
            //   .then(result => {
            //         return {
            //             statusCode: 200,
            //             body: result,
            //         }
            //     })
            //   .catch(error => {
            //         return {
            //             statusCode: 500,
            //             body: error.getError().body
            //         };
            //     });


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