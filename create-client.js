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
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", 'test_a2FIMmpZY0tEaWFLODg2OEU6ODRhMThhZDkyMDljZDUzNDYwNmEyZTc4NWVlYjE4ODg1YTY3OGQ2MGMzZWE0YTI1MDg2NmIyMTRjYmI0OTVmNA==');

            const res = await fetch(url,{
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(requestBody)
            });
            if (res.ok) {
                const data = await res.json();

                return {
                    statusCode: 200,
                    body: {
                        data: data
                    }
                };
            } else {
                const err = await res.json();
                console.log(err);
                return {
                    statusCode: 501,
                    body: JSON.stringify(err)
                };
            }

        } catch (error) {
            // Return an error response if there was an issue processing the request
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to process GET request' }),
            };
        }
    }
};