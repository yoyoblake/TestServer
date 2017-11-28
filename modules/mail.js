module.exports = {
  sendEmail: function(subject, content){
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport();

    transporter.sendMail({
      from: 'webportal_test_server@Adcolony',
      to: 'blake.kuver@adcolony.com',
      subject: subject,

      html: content
    });
  }
};
