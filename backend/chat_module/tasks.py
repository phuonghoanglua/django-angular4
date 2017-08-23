from django.conf import settings
from django.core.mail import send_mail
from celery import shared_task
import logging


@shared_task
def send_welcome_email(to_address):
    sender_address = settings.PROJECT_MAIN_EMAIL_ADDRESS
    header = u"Your Account has been created ! "
    html_body = u"Your account has been created and activated!"
    try:
        send_mail(header, html_body, sender_address,
                  [to_address], html_message=html_body)
    except Exception as e:
        logging.error("send email from %s to %s error=%s" %
                      (sender_address, to_address, e))
        return False
    else:
        logging.info("send email success to: %s" % (to_address))
    return True


@shared_task
def send_reset_password_email(to_address, token_url):
    sender_address = settings.PROJECT_MAIN_EMAIL_ADDRESS
    header = u"Reset Password"
    html_body = u"Your account's password has been reseted,\
            new password is <b> %s </b>" % token_url
    try:
        send_mail(header, html_body, sender_address,
                  [to_address], html_message=html_body)
    except Exception as e:
        logging.error("send email from %s to %s error=%s" %
                      (sender_address, to_address, e))
        return False
    else:
        logging.info("send email success to: %s" % (to_address))
    return True
