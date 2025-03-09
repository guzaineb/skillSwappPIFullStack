const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
  
  <!-- Header -->
  <div style="background: linear-gradient(to right, #FF6B6B, #556BFF); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; color: white;">
    <h1 style="margin: 0; font-size: 26px;">🔐 Verify Your Email</h1>
    <p style="margin: 5px 0 0; font-size: 16px;">Secure your SkillSwapp account</p>
  </div>

  <!-- Content -->
  <div style="background-color: white; padding: 25px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    
    <p>Hello <strong>{name}</strong>,</p>
    <p>Thank you for signing up! Use the verification code below to activate your account:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #FF6B6B; background: #FFECEC; padding: 15px 30px; border-radius: 8px; display: inline-block; box-shadow: 0 3px 6px rgba(0,0,0,0.15);">
        {verificationCode}
      </span>
    </div>

    <p>Please enter this code on the verification page to complete your registration.</p>
    <p>⏳ <strong>Note:</strong> TThis code will expire in <strong>15 minutes</strong> for security reasons.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{verificationLink}" 
         style="background: #556BFF; color: white; text-decoration: none; padding: 14px 28px; font-size: 18px; font-weight: bold; border-radius: 8px; display: inline-block; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
         Verify Now ✅
      </a>
    </div>

    <p>If you did not request this, please ignore this email.</p>

    <p>Best regards,<br><strong>The SkillSwapp Team</strong></p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #777; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>

</body>
</html>


`;
const WELCOME_EMAIL = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SkillSwapp</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
  
  <!-- Header -->
  <div style="background: linear-gradient(to right, #FF6B6B, #556BFF); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; color: white;">
    <h1 style="margin: 0; font-size: 26px;">🚀 Welcome to SkillSwapp!</h1>
    <p style="margin: 5px 0 0; font-size: 16px;">Where skills meet opportunity</p>
  </div>

  <!-- Content -->
  <div style="background-color: white; padding: 25px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    
    <p>Hello <strong>{name}</strong>, 👋</p>
    <p>We’re excited to have you join <strong>SkillSwapp</strong> – the ultimate platform to learn, teach, and exchange skills with like-minded individuals!</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <img src="https://cdn-icons-png.flaticon.com/512/2010/2010992.png" width="80" height="80" alt="Skills Icon" style="border-radius: 50%;">
    </div>

    <p>🔥 <strong>What's next?</strong></p>
    <ul>
      <li>🎯 Discover and enroll in skill-exchange programs</li>
      <li>🤝 Connect with other learners & experts</li>
      <li>🏆 Earn rewards and level up your skills</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://studyhub.com" 
         style="background: #FF6B6B; color: white; text-decoration: none; padding: 14px 28px; font-size: 18px; font-weight: bold; border-radius: 8px; display: inline-block; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
         Start Learning 🚀
      </a>
    </div>

    <p>If you have any questions, our support team is here to help.</p>

    <p>See you inside! 🎉</p>
    <p>Best regards,<br><strong>The SkillSwapp Team</strong></p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #777; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>

</body>
</html>
`;
const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right,rgb(175, 99, 163),rgb(217, 181, 208)); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color:rgb(222, 161, 211); color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right,rgb(240, 175, 233),rgb(233, 155, 233)); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetCode}" style="background-color:rgb(246, 135, 212); color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
</div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

module.exports = {VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAIL,PASSWORD_RESET_REQUEST_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE}; // Exporter le modèle
