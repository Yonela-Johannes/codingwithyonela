from flask_mail import Mail, Message
# from app import mail

def send_mail(subject: str, body: str, valid_email_format: str, name: str, lastname: str, confirmation_message, mail):

    # Create the HTML email body
    html_body = f"""
    <html>
    <body>
        <p>Hey {name} {lastname},</p>
        <p>{body}</p>
    </body>
    </html>
    """
    msg = Message(
        subject=subject,
        sender='johannesyonela@gmail.com',
        recipients=[valid_email_format],
        html=html_body
    )   
    response = mail.send(message=msg)