const loginAlertTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Login Notification</title>
</head>

<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0"
        style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px;">

        <!-- Logo -->
        <tr>
            <td align="center" style="padding-bottom: 20px;">
                <img src="https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759131838/Modern_Fast_Delivery_Logo_1_nfaoht.svg" alt="DawnEats Logo"
                   srcset="https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759131838/Modern_Fast_Delivery_Logo_1_nfaoht.svg 2x" style="max-width: 120px;">
            </td>
        </tr>

        <!-- Title -->
        <tr>
            <td align="center" style="color: #222222;">
                <h2 style="margin: 0; font-size: 22px; font-weight: bold; color: #FF6E00;">
                    Login Alert 🔐
                </h2>
                <p style="margin: 10px 0 20px; font-size: 14px; color: #555555;">
                    We noticed a login to your DawnEats account. Here are the details:
                </p>
            </td>
        </tr>

        <!-- Login Details -->
        <tr>
            <td align="center" style="padding: 15px;">
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="border: 1px solid #eee; border-radius: 6px; background-color: #fafafa; padding: 15px;">
                    <tr>
                        <td style="padding: 8px; font-size: 14px; color: #333333;"><strong>Date & Time:</strong></td>
                        <td style="padding: 8px; font-size: 14px; color: #555555;">Sep 26, 2025 - 10:45 AM</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-size: 14px; color: #333333;"><strong>Location:</strong></td>
                        <td style="padding: 8px; font-size: 14px; color: #555555;">Lagos, Nigeria</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-size: 14px; color: #333333;"><strong>Device:</strong></td>
                        <td style="padding: 8px; font-size: 14px; color: #555555;">Chrome on Windows</td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- CTA Button -->
        <tr>
            <td align="center" style="padding: 20px;">
                <a href="#" style="background-color: #FF6E00; color: #ffffff; text-decoration: none;
                  padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: bold; display: inline-block;">
                    Secure Your Account
                </a>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td align="center" style="padding: 10px 20px; color: #666666; font-size: 13px; line-height: 20px;">
                <p>If this was you, no further action is required.</p>
                <p>If you didn’t log in, please reset your password immediately.</p>
                <p style="margin-top: 20px; color:#FF6E00; font-weight: bold;">Stay safe, <br> The DawnEats Team</p>
            </td>
        </tr>
    </table>
</body>

</html>
`;
};
module.exports = loginAlertTemplate;
