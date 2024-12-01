const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail", // or use another email provider like Outlook, Yahoo, etc.
    auth: {
    user: "yourcompanyemail@example.com", // Replace with your email
    pass: "yourpassword", // Replace with your email password or app password
  },
});

// API endpoint to send email
app.post("/send-email", async (req, res) => {
  const { name, email, query } = req.body;

  if (!name || !email || !query) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender's information
      to: "yourcompanyemail@example.com", // Replace with company email
      subject: "New Query from About Us Page",
      text: `You have received a new query:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${query}`,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
