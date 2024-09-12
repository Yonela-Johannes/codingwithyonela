from utils.email_reponse import send_mail, receive_mail

def contact_us_send_to_creator(email, name, image, lastname, message, time, mail):
    send_mail(
        subject=f"Email To CodingWithYonela sent!",
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
                    <h2>Hi {name} {lastname} your email has been sent to CodingWithYonela!</h2>
                </div>
                <div class="content">
                    <img src="{image}" alt="Profile Image" class="profile-image" />
                    <ul>
                        <li><strong>Name:</strong> {name} {lastname}</li>
                        <li><strong>Created at:</strong> {time}</li>     
                    </ul>
                    <p>{message}</p>  
                    <p>Thank you for being part of our growing community</p>
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

def contact_send_to_me(email, name, image, lastname, message, time, mail):
    receive_mail(
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
                    <h2>Hey a new contact has been added to CodingWithYonela!</h2>
                </div>
                <div class="content">
                    <img src="{image}" alt="Profile Image" class="profile-image" />
                    <ul>
                        <li><strong>Name:</strong> {name} {lastname}</li>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Created at:</strong> {time}</li>     
                    </ul>
                </div>
                <li>{message}</li>
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


def newsletter_us_send_to_creator(email, mail):
    send_mail(
        subject=f"Email To CodingWithYonela sent!",
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
                    <h2>Hi {email}: your email has been sent to CodingWithYonela!</h2>
                </div>
                <div class="content">  
                    <p>Thank you for subscribing to our newsletter! 🔥 We're excited to have you on board and look forward to keeping you updated with the latest news, projects, and insights!</p>
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

def newsletter_send_to_me(email, time, mail):
    receive_mail(
        subject=f"{email} Added To CodingWithYonela",
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
                    <h2>Hey a new email subcribtion has been added to CodingWithYonela!</h2>
                </div>
                <div class="content">
                    <ul>
                        <li><strong>Email:</strong> {email}</li>
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
        valid_email_format=email,
        mail=mail
    )