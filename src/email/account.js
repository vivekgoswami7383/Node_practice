const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

const sendWelcomeMail = (email, name) => {
  const msg = {
    to: email,
    from: "vivekgoswami7383@gmail.com", // Use the email address or domain you verified above
    subject: "Thanks for joining us",
    text: `Welcome. We are glad that you join us. Let us know how can we help you`,
    //html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };

  //ES6
  sgMail.send(msg).then(
    () => {
      console.log("Email send Success");
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

module.exports = {
  sendWelcomeMail,
};
