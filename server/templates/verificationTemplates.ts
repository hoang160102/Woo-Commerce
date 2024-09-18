export default function verificationEmailTemplate(name: string, verificationUrl: string) {
    return `
      <html>
        <head>
          <style>
            .container {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
              border: 1px solid #ddd;
            }
            .header {
              background-color: #007bff;
              color: white;
              padding: 10px;
              text-align: center;
            }
            .content {
              padding: 20px;
              font-size: 16px;
            }
            .button {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              font-weight: bold;
              border-radius: 5px;
              display: inline-block;
              margin: 20px 0;
            }
            .footer {
              font-size: 12px;
              color: #999;
              text-align: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for registering! Please verify your email by clicking the button below:</p>
              <a href="${verificationUrl}" class="button">Verify Email</a>
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p>${verificationUrl}</p>
            </div>
            <div class="footer">
              <p>If you did not create an account, you can ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  