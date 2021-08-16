const nodemailer = require("nodemailer");

function SendMail(params) {

    require("dotenv").config();

    let transporter = nodemailer.createTransport({
        service: params.service,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: params.to,
        subject: params.subject,
        text: params.text
    
    }


    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Email sent !!!!");
        }
    });
    
    
}

module.exports = SendMail;

/*
{
    service, to, subject, text
}
*/



