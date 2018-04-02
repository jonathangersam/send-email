const nodemailer = require('nodemailer');
const express = require('express')

// http server
const SERVER_PORT = 8080

// gmail creds
const HOST = 'smtp.gmail.com'
const PORT = 587 // 587 is TLS

const SMTP_ACCT = process.env.EMAIL_USER	
const SMTP_PSWD = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SMTP_ACCT,
        pass: SMTP_PSWD
    }
});

const sendEmailP = (from, to, subject, body, html) => 
  new Promise((resolve, reject) => {
    const mailOptions = {
        // from: '"Jon Foo 👻" <occupyaws@gmail.com>', // sender address
        from: from,
        to: to, // comma-separated list of receivers
        subject: subject,
        text: body,
        // html: '<b>TODO: add html here</b>' // html body
        html: `\
          <html>\
            <body>\
              <p>${body}</p>\
              <p>sent from Jon's simple email service</p>\
            </body>\
          </html>`
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            reject(error)
        }
        console.log('Message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
        resolve(info.messageId)
    });
  })

const handleEmail = (req, res) => {
  const from = req.query.from
  const to = req.query.to
  const subject = req.query.subject || 'no subject'
  const body = req.query.body || 'no text body'
  
  if (!from || !to) {
    res.send("expected querystring inputs: from, to, subject(optional), body(optional); but got " + JSON.stringify(req.query))
    return
  } 

  sendEmailP(from, to, subject, body)
    .then(resp => res.send("OK; " + JSON.stringify(resp)))
    .catch(err => res.send("FAIL; " + JSON.stringify(err)))
}

const handleTest = (req, res) => {
  const from = 'occupyaws@gmail.com'
  const to = 'jonathangersam@gmail.com'
  const subject = 'test email from jon service'
  const body = 'test email'

  sendEmailP(from, to, subject, body)
    .then(resp => res.send("OK; " + JSON.stringify(resp)))
    .catch(err => res.send("FAIL; " + JSON.stringify(err)))
}

const app = express()
app.get('/', (req, res) => res.send("Welcome to Jon's email sending service! Goto /send and provide querystring from, to, subject(optional), and body(optional)"))
app.get('/send', handleEmail)
app.get('/test', handleTest)

app.listen(SERVER_PORT, () => console.log('Example app listening on port', SERVER_PORT))