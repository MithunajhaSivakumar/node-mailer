const nodemailer = require("nodemailer");
const Email = require("../model/Email");

exports.email_post = async (req, res) => {
    console.log(req.body.from);
  try {
    // Create a transporter with SMTP options
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "email@gmail.com",
        pass: "pwd",
      },
    });
    // Create an email object with user input
    const email = new Email({
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
    });

    // Send the email using nodemailer
    const info = await transporter.sendMail({
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
    });

    // Save the email object to MongoDB
    await email.save();

    // Send a response to the client
    console.log("Email sent successfully");
    res.json({ message: "Email sent successfully", info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.email_get = async (req, res) => {
    console.log("Get")
  try {
    const emails = await Email.find({});
    res.json(emails);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
