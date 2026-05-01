import User from "../models/User.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";


// 🔹 SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    if (!email) return res.status(400).json({ msg: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: true,
        msg: "If this email is registered, OTP will be sent.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    const mailUser = process.env.MAIL_USER;
    const mailPass = process.env.MAIL_PASS;

    if (!mailUser || !mailPass) {
      return res.status(500).json({ msg: "Email credentials are not configured. Set MAIL_USER and MAIL_PASS in Server/.env." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Resume Builder" <${mailUser}>`,
      to: email,
      subject: "Your OTP for Password Reset - Resume Builder",
      text: `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in 5 minutes.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nResume Builder Team`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification - Resume Builder</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              background-color: #f8f9fa;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              border: 1px solid #e9ecef;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #007bff;
              padding-bottom: 20px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #007bff;
              margin-bottom: 10px;
            }
            .subtitle {
              color: #6c757d;
              font-size: 16px;
            }
            .otp-container {
              background-color: #f8f9fa;
              border: 2px solid #007bff;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 30px 0;
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
              letter-spacing: 4px;
            }
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffeaa7;
              border-radius: 6px;
              padding: 15px;
              margin: 20px 0;
              color: #856404;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              text-align: center;
              color: #6c757d;
              font-size: 14px;
            }
            .copyright {
              margin-top: 15px;
              font-size: 12px;
            }
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Resume Builder</div>
              <div class="subtitle">Professional Resume Creation Made Easy</div>
            </div>

            <h2 style="color: #333; margin-bottom: 20px;">Password Reset Verification</h2>

            <p>Hello,</p>

            <p>We received a request to reset your password for your Resume Builder account. To complete the password reset process, please use the following One-Time Password (OTP):</p>

            <div class="otp-container">
              ${otp}
            </div>

            <p><strong>Important:</strong> This OTP will expire in <strong>5 minutes</strong> for security reasons.</p>

            <div class="warning">
              <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your account remains secure.
            </div>

            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>

            <p>Best regards,<br>
            <strong>The Resume Builder Team</strong></p>

            <div class="footer">
              <div class="social-links">
                <a href="#">Website</a> |
                <a href="#">Support</a> |
                <a href="#">Privacy Policy</a>
              </div>

              <div class="copyright">
                © ${new Date().getFullYear()} Resume Builder. All rights reserved.<br>
                This is an automated email. Please do not reply to this message.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: mailUser,
    });
    console.log(`OTP sent to ${email}`);

    res.json({
      success: true,
      msg: "OTP sent successfully",
    });
  } catch (err) {
    const isAuthError = /BadCredentials|Invalid login|535-5\.7\.8/.test(err.message);
    const msg = isAuthError
      ? "Gmail authentication failed. Use a valid MAIL_USER and a Google App Password (not your normal Gmail password)."
      : err.message;
    res.status(500).json({ msg });
  }
};

export const forgotPassword = sendOtp;

// 🔹 VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp != otp) {
      return res.json({ success: false, msg: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.json({ success: false, msg: "OTP expired" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🔹 RESET PASSWORD (OTP FLOW)
export const resetPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ success: true, msg: "Password updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// FACEBOOK DATA DELETION CALLBACK (UNCHANGED)
export const facebookDataDeletion = async (req, res) => {
  try {
    const { signed_request } = req.body;

    if (!signed_request) {
      return res.status(400).json({ error: "Missing signed_request" });
    }

    const parts = signed_request.split('.');
    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf-8')
    );

    const userId = payload.user_id;
    const email = payload.email || null;

    console.log(`Facebook data deletion request for user: ${userId}`);

    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        user.name = "Deleted User";
        user.email = `deleted_${Date.now()}@deleted.local`;
        user.password = null;
        await user.save();

        console.log(`User ${email} data anonymized`);
      }
    }

    res.json({
      url: `${process.env.APP_URL || 'http://localhost:5173'}/data-deletion-confirmation`,
      confirmation_code: `deletion_${Date.now()}_${userId}`
    });

  } catch (error) {
    console.error("Facebook data deletion error:", error);
    res.status(500).json({ error: "Error processing data deletion request" });
  }
};