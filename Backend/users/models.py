from django.db import models
from django.conf import settings

# Create your models here.

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.contrib import messages


class User(AbstractUser):
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=False,
    )
    first_name = models.CharField(_('first name'), null=False, blank=False, max_length=30)
    last_name = models.CharField(_('last name'), null=False, blank=False, max_length=30)

    email = models.EmailField(_('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return "{}".format(self.email)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __repr__(self):
        return self.email + 'has been added'

    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
        """
            Handles password reset tokens
            When a token is created, an e-mail needs to be sent to the user
            :param sender: View Class that sent the signal
            :param instance: View Instance that sent the signal
            :param reset_password_token: Token Model Object
            :param args:
            :param kwargs:
            :return:
            """
        email_plaintext_message = "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
            reset_password_token.key)

        send_mail(
            # title:
            "Password Reset for {title}".format(title="TermBuddy"),
            # message:
            email_plaintext_message,
            # from:
            settings.EMAIL_HOST_USER,
            # to:
            [reset_password_token.user.email],
            fail_silently=False,
        )
        print('message sent')
