from django.db import models

from users.models import User

# # Create your models here.

class Terms(models.Model):
    """
    This is the model for the terms and conditions template
    """
    user_id = models.ForeignKey(User, related_name='terms', on_delete=models.CASCADE)
    business_name = models.CharField(max_length=200, null=True, blank=True)
    business_url = models.URLField()
    country = models.CharField(max_length=30, null=True, blank=True)
    state = models.CharField(max_length=30, null=True, blank=True)
    business_address = models.CharField(max_length=30, null=True, blank=True)
    can_create_acct = models.BooleanField(null=True, blank=True)
    can_buy_goods = models.BooleanField(null=True, blank=True)
    use_feedback = models.BooleanField(null=True, blank=True)
    contact_info = models.EmailField(null=True, blank=True)
    age_limit = models.IntegerField(null=True, blank=True)
    additional_text = models.TextField(null=True, blank=True)
    permanent = models.BooleanField(null=True, blank=True)
    create_date = models.DateTimeField(null=False)
    last_edit = models.DateTimeField(null=False)

    class Meta:
        ordering = ['last_edit']

# Create your models here.

