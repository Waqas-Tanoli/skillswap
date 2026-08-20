import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendPasswordResetEmail = async ({
  email,
  username,
  resetUrl,
}: {
  email: string;
  username: string;
  resetUrl: string;
}) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is not configured"
    );
  }

  if (!process.env.EMAIL_FROM) {
    throw new Error(
      "EMAIL_FROM is not configured"
    );
  }

  const { data, error } =
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset your SkillSwap password",

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            color: #1e293b;
          "
        >
          <h1>Reset Your Password</h1>

          <p>
            Hi ${username},
          </p>

          <p>
            We received a request to reset your
            SkillSwap password.
          </p>

          <p>
            Click the button below to create a
            new password.
          </p>

          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #4f46e5;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              margin: 15px 0;
            "
          >
            Reset Password
          </a>

          <p>
            This password reset link will expire
            in 15 minutes.
          </p>

          <p>
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <p>
            — SkillSwap Team
          </p>
        </div>
      `,
    });

  if (error) {
    console.error(
      "Resend email error:",
      error
    );

    throw new Error(
      "Failed to send password reset email"
    );
  }

  return data;
};