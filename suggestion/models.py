from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    category            = models.CharField(
                                    max_length=30, 
                                    unique=True,
                                    help_text="Enter Category(min 20 letters)"
                                    )
    
class Suggestion(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    category           = models.ForeignKey('Category', on_delete=models.RESTRICT, null=True)
    post            = models.CharField(
                                    max_length=200, 
                                    unique=True,
                                    help_text="Enter suggestion(min 200 letters)"
                                    )
    like            = models.ForeignKey('Suggestion_likes', on_delete=models.RESTRICT, null=True)
    time            = models.DateTimeField(verbose_name="date posted", auto_now_add=True)
    responses       = models.ForeignKey('Suggestion_response', on_delete=models.RESTRICT, null=True)

    
    class States(models.TextChoices):
        PENDING = 'PE', _('Pending')
        PROCESSING = 'PR', _('Processing')
        COMPLETED = 'CO', _('Completed')
        WATCHING = 'WA', _('Watching')
        CONSIDERING = 'CG', _('Considering')
        UPCOMING = 'UP', _('Upcoming')
        DISMISSED = 'DI', _('Dismissed')
        
    status          = models.CharField(
                                    max_length=40,
                                    choices = States.choices,
                                    blank=True,
                                    default=States.PENDING,
                                    help_text="States of the sugesstion"
                                )
    
    approved        = models.BooleanField(default=False)
    
    
class Suggestion_response(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    response        = models.CharField(
                                    max_length=200, 
                                    unique=True,
                                    help_text="Enter response(min 200 letters)"
                                    )
    like            = models.ForeignKey('Suggestion_response_likes', on_delete=models.RESTRICT, null=True)
    time            = models.DateTimeField(verbose_name="date posted", auto_now_add=True)

    
class Suggestion_likes(models.Model):
         user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)

class Suggestion_Response_likes(models.Model):
         user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
         