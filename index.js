const nodemailer = require('nodemailer');

const HOST = 'smtp.ethereal.email'
const PORT = 587
// const PORT = 25
const SMTP_ACCT = "cvahrcl37miilsua@ethereal.email"	
const SMTP_PSWD = "EkS4ezEhmz15xVAn8t"

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: SMTP_ACCT, // generated ethereal user
        pass: SMTP_PSWD // generated ethereal password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
