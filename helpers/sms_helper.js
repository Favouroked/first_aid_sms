const axios = require('axios');
const querystring = require('querystring');

const apiKey = process.env.apiKey;
const username = process.env.username;
const shortCode = process.env.shortCode;
const msg_url = process.env.MSG_URL;

// Set your app credentials
const credentials = {
    apiKey: process.env.apiKey,
    username: process.env.username,
};

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);


// Get the SMS service
const sms = AfricasTalking.SMS;

const sendMessage = (number, message) => {
    const options = {
        // Set the numbers you want to send to in international format
        to: [number],
        // Set your message
        message: message,
        // Set your shortCode or senderId
        from: shortCode
    }

    // That’s it, hit send and we’ll take care of the rest
    return sms.send(options);
};

const sendAxiosMessage = (number, message) => {
    const data = {
        to: number,
        message,
        username,
        from: shortCode
    };
    const headers = {'Content-Type': 'application/x-www-form-urlencoded', 'apiKey': apiKey }
    
    return axios.post(msg_url, querystring.stringify(data), {headers: headers})
};

module.exports = {
    sendMessage,
    sendAxiosMessage
};