import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import { sendOTPEmail } from "@/lib/mailer";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { PasswordResetToken } from "@/models/passwordresettoken.model";

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Request OTP endpoint
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email } = await request.json();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Invalidate any existing OTP
    await PasswordResetToken.deleteMany({ userId: user._id });

    // Generate new OTP
    const plainOTP = generateOTP();
    const hashedOTP = await bcrypt.hash(plainOTP, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save hashed OTP
    await PasswordResetToken.create({
      userId: user._id,
      otp: hashedOTP,
      expiresAt,
    });

    // Send plain OTP email
    await sendOTPEmail(email, plainOTP);

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Reset password with OTP endpoint
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { email, otp, newPassword } = await request.json();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find token that hasn't expired
    const resetToken = await PasswordResetToken.findOne({
      userId: user._id,
      expiresAt: { $gt: new Date() },
    });

    if (!resetToken) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // Verify OTP
    const isValidOTP = await bcrypt.compare(otp, resetToken.otp);
    if (!isValidOTP) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    // Delete used token
    await PasswordResetToken.deleteOne({ _id: resetToken._id });

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
