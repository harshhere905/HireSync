const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const getOTPhtml = (otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>HireSync – Email Verification</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f1f5f9; font-family: 'Segoe UI', Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 16px;">
            <tr>
                <td align="center">
                    <table width="520" cellpadding="0" cellspacing="0"
                        style="background:#ffffff; border-radius:16px; overflow:hidden;
                               box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                                        padding: 36px 40px 32px; text-align:center;">
                                <div style="display:inline-flex; align-items:center; gap:10px;">
                                    <div style="width:12px; height:12px; background:#ffffff;
                                                border-radius:50%; opacity:0.9;"></div>
                                    <span style="font-size:24px; font-weight:800;
                                                 color:#ffffff; letter-spacing:-0.5px;">
                                        HireSync
                                    </span>
                                </div>
                                <p style="margin:10px 0 0; color:rgba(255,255,255,0.8);
                                           font-size:14px;">
                                    Your career starts here.
                                </p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding: 40px 40px 32px;">
                                <h2 style="margin:0 0 8px; font-size:22px; color:#111827;
                                            font-weight:700;">
                                    Verify your email address
                                </h2>
                                <p style="margin:0 0 28px; font-size:15px; color:#6b7280;
                                           line-height:1.6;">
                                    Enter the code below to complete your HireSync registration.
                                    This code is valid for <strong style="color:#374151;">10 minutes</strong>.
                                </p>

                                <!-- OTP Box -->
                                <div style="background:#f5f3ff; border:2px dashed #a5b4fc;
                                             border-radius:12px; padding:28px 20px;
                                             text-align:center; margin-bottom:28px;">
                                    <p style="margin:0 0 6px; font-size:12px; font-weight:600;
                                               color:#6366f1; text-transform:uppercase;
                                               letter-spacing:1.5px;">
                                        Your OTP Code
                                    </p>
                                    <span style="font-size:44px; font-weight:800;
                                                  letter-spacing:14px; color:#4338ca;
                                                  font-family: 'Courier New', monospace;">
                                        ${otp}
                                    </span>
                                </div>

                                <!-- Warning -->
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="background:#fffbeb; border-left:4px solid #f59e0b;
                                                    border-radius:0 8px 8px 0; padding:14px 16px;">
                                            <p style="margin:0; font-size:13px; color:#92400e;">
                                                ⚠️ &nbsp;If you didn't create a HireSync account,
                                                you can safely ignore this email.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Divider -->
                        <tr>
                            <td style="padding: 0 40px;">
                                <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;" />
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding:24px 40px 32px; text-align:center;">
                                <p style="margin:0 0 4px; font-size:12px; color:#9ca3af;">
                                    This is an automated message — please do not reply.
                                </p>
                                <p style="margin:0; font-size:12px; color:#d1d5db;">
                                    © ${new Date().getFullYear()} HireSync. All rights reserved.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>

    </body>
    </html>
    `
}
const getWelcomeHtml = (username) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#0f0f13;font-family:'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f13;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a24;border-radius:16px;overflow:hidden;border:1px solid #2a2a3a;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6c63ff,#4f46e5);padding:40px;text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <div style="width:12px;height:12px;background:#fff;border-radius:50%;"></div>
                <span style="color:#fff;font-size:24px;font-weight:700;letter-spacing:1px;">HireSync</span>
              </div>
              <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">AI-Powered Interview Preparation</p>
            </td>
          </tr>

          <!-- Celebration Icon -->
          <tr>
            <td align="center" style="padding:40px 40px 0;">
              <div style="width:80px;height:80px;background:linear-gradient(135deg,#6c63ff22,#4f46e522);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;border:2px solid #6c63ff44;">
                <span style="font-size:36px;">🎉</span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;text-align:center;">
              <h1 style="color:#f8fafc;font-size:28px;margin:0 0 12px;font-weight:700;">
                Welcome aboard, ${username}!
              </h1>
              <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 32px;">
                Your account has been verified successfully. You're now part of HireSync — where candidates land their dream jobs.
              </p>

              <!-- Feature Cards -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 12px;">
                    <div style="background:#0f0f13;border:1px solid #2a2a3a;border-radius:12px;padding:20px;text-align:left;">
                      <span style="font-size:20px;">📄</span>
                      <span style="color:#f8fafc;font-size:14px;font-weight:600;margin-left:12px;">Upload Your Resume</span>
                      <p style="color:#64748b;font-size:13px;margin:8px 0 0;">Our AI analyzes your resume and matches it with job descriptions instantly.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 12px;">
                    <div style="background:#0f0f13;border:1px solid #2a2a3a;border-radius:12px;padding:20px;text-align:left;">
                      <span style="font-size:20px;">🎯</span>
                      <span style="color:#f8fafc;font-size:14px;font-weight:600;margin-left:12px;">Get Interview Questions</span>
                      <p style="color:#64748b;font-size:13px;margin:8px 0 0;">Receive personalized technical and behavioral questions tailored to your role.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="background:#0f0f13;border:1px solid #2a2a3a;border-radius:12px;padding:20px;text-align:left;">
                      <span style="font-size:20px;">🗺️</span>
                      <span style="color:#f8fafc;font-size:14px;font-weight:600;margin-left:12px;">10-Day Prep Roadmap</span>
                      <p style="color:#64748b;font-size:13px;margin:8px 0 0;">Follow a structured day-by-day plan to maximize your interview performance.</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <div style="margin:32px 0 0;">
                <a href="http://localhost:5173/login" style="display:inline-block;background:linear-gradient(135deg,#6c63ff,#4f46e5);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:16px;font-weight:600;letter-spacing:0.5px;">
                  Start Preparing →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #2a2a3a;text-align:center;">
              <p style="color:#475569;font-size:12px;margin:0;">
                You're receiving this because you registered at HireSync.<br/>
                © 2025 HireSync. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export { generateOTP, getOTPhtml,getWelcomeHtml}