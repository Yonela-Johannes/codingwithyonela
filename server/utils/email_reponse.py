from flask_mail import Mail, Message
# from app import mail

def send_mail(subject: str, body: str, valid_email_format: str, mail):

    # Create the HTML email body
    html_body = f"""
        {body}
    """
    msg = Message(
        subject=subject,
        sender='johannesyonela@gmail.com',
        recipients=[valid_email_format],
        html=html_body
    )   
    mail.send(message=msg)
    
def receive_mail(subject: str, body: str, valid_email_format: str, mail):

    # Create the HTML email body
    html_body = f"""
        {body}
    """
    msg = Message(
        subject=subject,
        sender=valid_email_format,
        recipients=['johannesyonela@gmail.com'],
        html=html_body
    )   
    mail.send(message=msg)