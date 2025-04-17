import nodemailer from "nodemailer";
export const sendOTPEmail = async (to: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: {
      name: "CompanyName",
      address: process.env.NEXT_PUBLIC_EMAIL as string,
    },
    to,
    subject: `Your Verification Code- ${otp}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #2c3e50; margin-bottom: 10px;">Verification Code</h2>
              <div style="width: 100%; height: 2px; background-color: #eee; margin: 20px 0;"></div>
            </div>
            
            <div style="margin-bottom: 30px;">
              <p style="margin-bottom: 15px;">Hello,</p>
              <p style="margin-bottom: 15px;">Your verification code is:</p>
              <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 5px;">
                <h1 style="color: #2c3e50; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
              </div>
              <p style="margin-top: 15px; color: #666; font-size: 14px;">This code will expire in 15 minutes.</p>
              <p style="margin-top: 15px;">
                <a href="https://najim-dev.vercel.app/admin/password_reset" 
                   style="color: #3498db; text-decoration: none; background-color: #f8f9fa; padding: 10px 20px; border-radius: 5px; display: inline-block;">
                  Click here to reset your password
                </a>
              </p>
            </div>
            
            <div style="color: #666; font-size: 12px; text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
              <p>If you didn't request this code, please ignore this email.</p>
              <p>© ${new Date().getFullYear()} CompanyName. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error: "Failed to send email" };
  }
};
