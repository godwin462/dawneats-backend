const purchaseCompleteTemplate = () => {
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Purchase Confirmation</title>
</head>

<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0"
        style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px;">
        <!-- Logo -->
        <tr>
            <td align="center" style="padding-bottom: 20px;">
                <img src="https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759131838/Modern_Fast_Delivery_Logo_1_nfaoht.svg" alt="DawnEats Logo"
                  srcset="https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759131838/Modern_Fast_Delivery_Logo_1_nfaoht.svg 2x"  style="max-width: 120px;">
            </td>
        </tr>

        <!-- Title -->
        <tr>
            <td align="center" style="color: #222222;">
                <h2 style="margin: 0; font-size: 22px; font-weight: bold; color: #FF6E00;">Purchase Complete 🎉</h2>
                <p style="margin: 10px 0 20px; font-size: 14px; color: #555555;">
                    Thank you for your purchase! Here are the details of your order:
                </p>
            </td>
        </tr>

        <!-- Order Summary -->
        <tr>
            <td align="center" style="padding: 15px;">
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="border: 1px solid #eee; border-radius: 6px; background-color: #fafafa; padding: 15px;">
                    <tr>
                        <td style="padding: 8px; font-size: 14px; color: #333333;"><strong>Order Number:</strong></td>
                        <td style="padding: 8px; font-size: 14px; color: #555555;">#123456</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-size: 14px; color: #333333;"><strong>Item:</strong></td>
                        <td style="padding: 8px; font-size: 14px; color: #555555;">Wireless Headphones</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-size: 14px; color: #333333;"><strong>Total:</strong></td>
                        <td style="padding: 8px; font-size: 14px; color: #555555;">$89.99</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-size: 14px; color: #333333;"><strong>Estimated Delivery:</strong>
                        </td>
                        <td style="padding: 8px; font-size: 14px; color: #555555;">Oct 5, 2025</td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- CTA Button -->
        <tr>
            <td align="center" style="padding: 20px;">
                <a href="#"
                    style="background-color: #FF6E00; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: bold;">
                    View Your Order
                </a>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td align="center" style="padding: 10px 20px; color: #666666; font-size: 13px; line-height: 20px;">
                <p>If you have any questions, reply to this email or contact our support team.</p>
                <p style="margin-top: 20px;">Thank you for shopping with DawnEats 🧡</p>
            </td>
        </tr>
    </table>
</body>

</html>

    `;
};

module.exports = purchaseCompleteTemplate;
