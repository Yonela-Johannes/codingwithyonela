from utils.email_reponse import send_mail

def verification_email(username, lastname, email, token, mail):
    send_mail(
        subject="Welcome to CodingWithYonela Here’s Your Verification Key",
        body=f"""
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    text-align: center;
                    margin-bottom: 20px;
                }}
                .profile-image {{
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin: 0 auto;
                    display: block;
                }}
                .content {{
                    margin-top: 20px;
                }}
                .content p {{
                    margin-bottom: 10px;
                }}
                .footer {{
                    margin-top: 20px;
                    text-align: center;
                    color: #777;
                    font-size: 12px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Welcome to CodingWithYonela</h2>
                </div>
                <div class="content">
                    <p>Dear {username} {lastname},</p>
                    <p>Welcome to CodingWithYonela! We're thrilled to have you join our community.To get started, please verify your email address using the verification link below:</p>
                     <p><a href="http://codingwithyonela/verify_account/{token}" target="_blank">Follow this link</a>
                    </p>
                    <p>If there are any updates or corrections you'd like to make, please don’t hesitate to reach out to us.</p>
                    <p>Thank you for being part of our growing community. We look forward to showcasing your incredible work and helping you connect with others in the industry.</p>
                </div>
                <div class="footer">
                    <p>Best regards,<br />The CodingWithYonela Team</p>
                </div>
            </div>
        </body>
        </html>
        """,
        valid_email_format=email,
        name=username,
        lastname=lastname,
        confirmation_message="Feedback sent successfully!",
        mail=mail
    )
