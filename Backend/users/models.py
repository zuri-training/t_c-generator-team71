from django.db import models

# Create your models here.

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


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


