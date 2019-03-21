// Set your app credentials
const credentials = {
    apiKey: process.env.apiKey,
    username: process.env.username,
}

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);
const shortCode = process.env.shortCode;

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
}

module.exports = {
    sendMessage
}