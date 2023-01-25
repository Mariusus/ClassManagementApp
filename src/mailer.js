const nodemailer = require('nodemailer');
const config = require('../src/mailerconfig');

 
    const transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: config.MAILGUN_USER,
        pass: config.MAILGUN_PASS
      }
    })
module.exports = {
  sendMail(from, to, subject, content) {
    return new Promise((resolve, reject) => {
      transporter.sendMail({from, subject, to, content}, (err, info) => {
        if (err) reject (err);
        resolve(info);
      });
     });
  }
}
  