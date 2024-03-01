from django.db import models

class Testimonial(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    post            = models.TextField(
                                    unique=True,
                                    help_text="Enter blog"
                                    )
    like            = models.ForeignKey('Testimonial_likes', on_delete=models.RESTRICT, null=True)
    rate            = models.IntegerField(default=0)
    time            = models.DateTimeField(verbose_name="date posted", auto_now_add=True)
    comments        = models.ForeignKey('Testimonial_comment', on_delete=models.RESTRICT, null=True)

    
class Testimonial_comment(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    response        = models.TextField(
                                    unique=True,
                                    help_text="Comment"
                                    )
    time            = models.DateTimeField(verbose_name="date posted", auto_now_add=True)
        
class Testimonial_likes(models.Model):
         user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)