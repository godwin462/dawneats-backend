const resetPasswordTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0"
         style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px;">

    <!-- Logo -->
    <tr>
      <td align="center" style="padding-bottom: 20px;">
        <img src="https://via.placeholder.com/120x60.png?text=DawnEats" alt="DawnEats Logo" style="max-width: 120px;">
      </td>
    </tr>

    <!-- Title -->
    <tr>
      <td align="center" style="color: #222222;">
        <h2 style="margin: 0; font-size: 22px; font-weight: bold; color: #FF6E00;">
          Password Reset Request
        </h2>
        <p style="margin: 10px 0 20px; font-size: 14px; color: #555555;">
          We received a request to reset your DawnEats account password.
          Click the button below to create a new password.
        </p>
      </td>
    </tr>

    <!-- CTA Button -->
    <tr>
      <td align="center" style="padding: 20px;">
        <a href="{{ reset_link }}"
           style="background-color: #FF6E00; color: #ffffff; text-decoration: none;
                  padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: bold; display: inline-block;">
          Reset Your Password
        </a>
      </td>
    </tr>

    <!-- Instruction -->
    <tr>
      <td align="center" style="padding: 10px 20px; color: #555555; font-size: 14px; line-height: 20px;">
        <p>This link will expire in <strong>30 minutes</strong>.
        If you didn’t request a password reset, please ignore this email and your password will remain unchanged.</p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="padding: 20px; color: #666666; font-size: 13px; line-height: 20px;">
        <p>If you have any issues, please contact DawnEats support.</p>
        <p style="margin-top: 20px; color:#FF6E00; font-weight: bold;">Stay secure, <br> The DawnEats Team</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

module.exports = resetPasswordTemplate;
