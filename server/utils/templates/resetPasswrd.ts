const htmlString = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eaeaea;
        }
        .logo {
            max-width: 150px;
        }
        .content {
            padding: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: white !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .code {
            font-family: monospace;
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            word-break: break-all;
        }
    </style>
</head>
<body>
    <div class="header">
        <!-- Replace with your actual logo -->
        <img src="https://yourwebsite.com/logo.png" alt="Company Logo" class="logo">
    </div>
    
    <div class="content">
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        
        <p style="text-align: center;">
            <a href="{{link}}" class="button">Reset Password</a>
        </p>
        
        <p>If you didn't request this password reset, please ignore this email or contact our support team if you have any questions.</p>
        
        <p>This password reset link will expire in 24 hours.</p>
        
        <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
        <p class="code">{{link}}</p>
    </div>
    
    <div class="footer">
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        <p>
            Your Company Address<br>
            City, State, ZIP Code
        </p>
    </div>
</body>
</html>
`

export default htmlString