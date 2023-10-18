const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.sendMail = async (req, res) => {
  const {
    fromEmail,
    toEmail,
    contactNo,
    optionalMessage,
    longitude,
    latitude,
  } = req.body;

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "bloodplus.help@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const emailContent = {
      from: "BloodPlus 🩸 <bloodplus.help@gmail.com>",
      to: toEmail,
      subject: "⚠️🚨Emergency Request: Someone needs your help",
      text: `Someone needs your help. Please consider this emergency request. If you can help, please contact them using the provided email or phone number below:\n\nFrom Email: ${fromEmail}\nContact Number: ${contactNo}\n\n`,
      html: `
    <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #d9534f; font-size: 28px; margin: 20px 0; font-weight: bold;">🩸 Blood +</h1>
      </div>
      <h2 style="color: #d9534f; font-size: 24px; font-weight: bold;">Emergency Request</h2>
      <p style="font-size: 18px;">Someone needs your help. Please consider this emergency request.</p>
      <p style="font-size: 18px;">If you can help, please contact them using the provided email or phone number below:</p>
      <p style="font-size: 18px;"><strong>From Email:</strong> ${fromEmail}</p>
      <p style="font-size: 18px;"><strong>Contact Number:</strong> ${contactNo}</p>
      <p style="font-size: 18px; background-color: #dff0d8; padding: 10px; border-radius: 5px; margin-top: 20px;">${
        optionalMessage || ""
      }</p>
      <p style="font-size: 18px; margin-top: 15px;"><strong>Recipient's Location:</strong> <a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank" rel="noopener noreferrer" style="color: #d9534f; text-decoration: none; font-weight: bold;">View on Google Maps</a></p>
    </div>
`,
    };

    const result = await transport.sendMail(emailContent);

    res.status(200).json({ emailsent: result });
  } catch (error) {
    console.error("Error sending Mail", error);
    res.status(500).json({ error: "Server error" });
  }
};

