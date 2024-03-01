from django.db import models

class Question(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    category        = models.ForeignKey('suggestion.Category', on_delete=models.RESTRICT, null=True)
    post            = models.CharField(
                                    max_length=200, 
                                    unique=True,
                                    help_text="Enter question(min 200 letters)"
                                    )
    like            = models.ForeignKey('Question_likes', on_delete=models.RESTRICT, null=True)

    approved        = models.BooleanField(default=False)
    responses       = models.ForeignKey('Question_response', on_delete=models.RESTRICT, null=True)

    
class Question_response(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    response        = models.CharField(
                                    max_length=200, 
                                    unique=True,
                                    help_text="Enter response(min 200 letters)"
                                    )
    like            = models.ForeignKey('Question_response_likes', on_delete=models.RESTRICT, null=True)
    time            = models.DateTimeField(verbose_name="date responded", auto_now_add=True)
    
class Question_likes(models.Model):
         user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)

class Question_response_likes(models.Model):
         user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
         