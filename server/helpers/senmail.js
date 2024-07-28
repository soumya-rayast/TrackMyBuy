const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config()

function createTransporter(config) {
    const transporter = nodemailer.createTransport(config);
    return transporter;
}

let configurations = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}
const sendmail = async (messageOption) => {
    const transporter = await createTransporter(configurations)
    await transporter.verify();
    await transporter.sendMail(messageOption, (error, info) => {
        if (error) {
            console.log(error)
        }
        console.log(info.response);
    })
}
module.exports = sendmail;