from django.db import models
from django.utils.translation import gettext_lazy as _


class Room(models.Model):
    hosts           = models.ForeignKey('Hosts', on_delete=models.RESTRICT, null=True)
    users           = models.ForeignKey('Users', on_delete=models.RESTRICT, null=True)
    messages        = models.ForeignKey('Messages', on_delete=models.RESTRICT, null=True)
    status          = models.TextField(max_length=200)
    name          = models.CharField(max_length=40, unique=True)
    
    
class Hosts(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    

class Users(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    

class Messages(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    time            = models.DateTimeField(verbose_name="date posted", auto_now_add=True)
    post            = models.TextField(max_length=200)
    like            = models.ForeignKey('Message_likes', on_delete=models.RESTRICT, null=True)

class Message_likes(models.Model):
         user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)