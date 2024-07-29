const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
function createTransporter(config) {
    return nodemailer.createTransport(config);
}
const configurations = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
};
const sendMail = async (messageOptions) => {
    try {
        const transporter = createTransporter(configurations);
        await transporter.verify();
        console.log('Message options:', messageOptions); 
        await transporter.sendMail(messageOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
module.exports = sendMail;
