
from utils.email_reponse import send_mail

def recommendation_email_temp(email, name, lastname, portfolio, github, linkedin, mail, status):
    send_mail(
        subject="Your Portfolio is Now Live on CodingWithYonela",
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
                    <h2>Your Portfolio is Now Live on CodingWithYonela!</h2>
                </div>
                <div class="content">
                    <img src="{portfolio}" alt="Profile Image" class="profile-image" />
                    <p>Dear {name} {lastname},</p>
                    <p>We’re excited to inform you that your portfolio has been successfully added to CodingWithYonela! Below are the details:</p>
                    <ul>
                        <li><strong>Name:</strong> {name} {lastname}</li>
                        <li><strong>GitHub Page:</strong> <a href="https://github.com/{github}" target="_blank">{github}</a></li>
                        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/{linkedin}" target="_blank">{linkedin}</a></li>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Status:</strong> {status}</li>     
                    </ul>
                    <p>Your portfolio will soon be live <a href="https://codingwithyonela.vercel.app" target="_blank">here</a>.</p>
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

def send_to_me(email, name, lastname, portfolio, github, linkedin, mail, status, time):
    send_mail(
        subject=f"{name} {lastname} Added To CodingWithYonela",
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
                    <h2>Hey a new portfolio has been added to CodingWithYonela!</h2>
                </div>
                <div class="content">
                    <img src="{portfolio}" alt="Profile Image" class="profile-image" />
                    <ul>
                        <li><strong>Name:</strong> {name} {lastname}</li>
                        <li><strong>GitHub Page:</strong> <a href="https://github.com/{github}" target="_blank">{github}</a></li>
                        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/{linkedin}" target="_blank">{linkedin}</a></li>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Status:</strong> {status}</li>     
                        <li><strong>Created at:</strong> {time}</li>     
                    </ul>
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


def recommendation_email_temp_user(email, name, lastname, portfolio, github, linkedin, mail, status, time, sender_name, sender_lastname, sender_email):
    send_mail(
        subject="Your Portfolio Will Be Live on CodingWithYonela",
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
                    <h2>Your Portfolio will be live on CodingWithYonela in the next 24 hours!</h2>
                </div>
                <div class="content">
                    <img src="{portfolio}" alt="Profile Image" class="profile-image" />
                    <p>Dear {name} {lastname},</p>
                    <p>We’re excited to inform you that your portfolio has been successfully added to CodingWithYonela!</p>
                    <p>Your portfolio was created by: {sender_name} {sender_lastname} at {time} and their email is: {sender_email} Below are the details:</p>
                    <ul>
                        <li><strong>Name:</strong> {name} {lastname}</li>
                        <li><strong>GitHub Page:</strong> <a href="https://github.com/{github}" target="_blank">{github}</a></li>
                        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/{linkedin}" target="_blank">{linkedin}</a></li>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Status:</strong> {status}</li>     
                    </ul>
                    <p>Your portfolio will soon be live <a href="https://codingwithyonela.vercel.app" target="_blank">here</a>.</p>
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

def send_to_creator(email, name, lastname, portfolio, github, linkedin, mail, status, time, sender_name, sender_lastname, sender_email):
    send_mail(
        subject=f"You Added {name} {lastname} To CodingWithYonela",
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
                    <h2>Hi {sender_name} {sender_lastname} you added a new portfolio to CodingWithYonela!</h2>
                </div>
                <div class="content">
                    <img src="{portfolio}" alt="Profile Image" class="profile-image" />
                    <ul>
                        <li><strong>Name:</strong> {name} {lastname}</li>
                        <li><strong>GitHub Page:</strong> <a href="https://github.com/{github}" target="_blank">{github}</a></li>
                        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/{linkedin}" target="_blank">{linkedin}</a></li>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Status:</strong> {status}</li>     
                        <li><strong>Created at:</strong> {time}</li>     
                    </ul>
                    <p>The portfolio you added will soon be live <a href="https://codingwithyonela.vercel.app" target="_blank">here</a>.</p>
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
        valid_email_format=[sender_email],
        mail=mail
    )

def update_user_mail(email, name, lastname, mail):
    send_mail(
        subject=f"Portfolio Confirmed on CodingWithYonela",
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
                    <h2>Hi {name} {lastname} your portfolio has been added to CodingWithYonela!</h2>
                </div>
                <div class="content">
                    <p>Your portfolio is live <a href="https://codingwithyonela.vercel.app" target="_blank">here</a>.</p>
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
 