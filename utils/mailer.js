require('dotenv').config();

const nodemailer = require('nodemailer');

async function sendEmail(email, subject, body) {
    try {
    
        let senderAddress = process.env.EMAIL;
        let senderPassword = process.env.PASSWORD
        let toAddress = email;
        
        let transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderAddress,
                pass: senderPassword
            }
        });

        let mailOptions = {
            from: senderAddress,
            to: toAddress,
            subject: subject,
            text: body
        };

        await transpoter.sendMail(mailOptions);

    } catch (error) {
        console.log(`error while sending email, reason: ${error}`);
        throw Error(error)
    }
}

module.exports = { sendEmail }