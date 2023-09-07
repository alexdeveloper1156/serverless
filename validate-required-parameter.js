exports.handler = async (event, context) => {
    if (event.httpMethod === "OPTIONS") {
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
            // email and
            // person_handle_name
            // are required params
            const requestBody = JSON.parse(event.body);
            if (requestBody.property_name && requestBody.value) {
                const apiKey = process.env.HUBSPOT_PAT;
                const url = 'https://api.hubapi.com/crm/v3/objects/enrollment/search';
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + apiKey);

                const requestData = JSON.stringify({
                        filterGroups: [
                            {
                                filters: [
                                    {
                                        propertyName: requestBody.property_name,
                                        operator: 'EQ',
                                        value: requestBody.value,
                                    }
                                ]
                            }
                        ],
                        properties: ['id','sku', 'person_primary_kyc_status', 'notary', 'is_accredited', 'accreditation'],
                    }
                );

                console.log(requestData);
                const res = await fetch(url,{
                    method: 'POST',
                    body: requestData,
                    headers: myHeaders,
                });

                if (res.ok) {
                    let validated = true;
                    const data = await res.json();
                    if (data.total > 0) {
                        validated = false;
                    }
                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            validated: validated
                        }),
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