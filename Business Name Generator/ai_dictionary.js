// Create names using a AI.
// https://rapidapi.com/UnlimitedAPI/api/business-name-generator/playground/apiendpoint_62ccfaa0-1423-44dc-aed0-ee50f22957b4

const url = 'https://business-name-generator.p.rapidapi.com/?q=Api';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'key',
        'x-rapidapi-host': 'business-name-generator.p.rapidapi.com'
    }
};

fetch(url, options)
    .then(response => response.text()) // Convert response to text
    .then(result => {
        console.log(result); // Now result is properly logged
    })
    .catch(error => {
        console.error("Error:", error);
    });
