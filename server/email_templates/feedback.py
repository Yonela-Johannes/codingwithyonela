from utils.email_reponse import send_mail

def feedback_email(name, lastname, email, company, image, message, rating, status, mail):
    send_mail(
        subject="Feedback submitted on CodingWithYonela",
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
                    <h2>You have submitted feedback on CodingWithYonela website!</h2>
                </div>
                <div class="content">
                    <img src="{image}" alt="Profile Image" class="profile-image" />
                    <p>Dear {name} {lastname},</p>
                    <p>We’re excited to inform you that your feedback has been successfully submited to CodingWithYonela website!</p>
                    <ul>
                        <li><strong>Company:</strong> {company}</li>
                        <li><strong>Feeback Message:</strong> {message}</li>
                        <li><strong>Rated:</strong> {rating}</li>
                        <li><strong>Status:</strong> {status}</li>     
                    </ul>
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
        mail=mail
    )

def site_feedback_email(name, lastname, email, company, image, message, rating, status, mail):
    send_mail(
        subject=f"{name} {lastname} submitted on CodingWithYonela",
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
                    <h2>A new email has been submitted feedback on CodingWithYonela!</h2>
                </div>
                <div class="content">
                    <img src="{image}" alt="Profile Image" class="profile-image" />
                    <ul>
                        <li><strong>Name:</strong> {name}</li>
                        <li><strong>Last name:</strong> {lastname}</li>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Company:</strong> {company}</li>
                        <li><strong>Feeback Message:</strong> {message}</li>
                        <li><strong>Rated:</strong> {rating}</li>
                        <li><strong>Status:</strong> {status}</li>     
                    </ul>
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
        valid_email_format='johannesyonela@gmail.com',
        mail=mail
    )


def update_user_feedback_email(email, name, lastname, mail):
    send_mail(
        subject=f"Thank You for Your Valuable Feedback",
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
                    <h2>Hi {name} {lastname}</h2>
                </div>
                <div class="content">
                    <p>I wanted to take a moment to personally thank you for taking the time to share your feedback on my website. Your input is incredibly valuable to me, and I genuinely appreciate your effort in helping me improve the experience for all users.</p>
                    <br />
                    <p>I'm always striving to create the best possible platform, and insights like yours play a crucial role in that process. Whether it's about design, functionality, or any other aspect of the site, your feedback helps me understand what's working well and where I can make enhancements.</p>
                    <br />
                    <p>Thank you for being part of our journey and growing community. We look forward to showcasing your incredible work and helping you connect with others in the industry.</p>
                </div>
                <div class="footer">
                    <p>Warm regards,
                    <br />
                    Yonela
                    <br />
                    <a href="https://codingwithyonela.vercel.app" target="_blank">CodingWithYonela</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
        """,
        valid_email_format=email,
        mail=mail
    )