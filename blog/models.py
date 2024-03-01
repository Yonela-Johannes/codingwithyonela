from django.db import models

class Blog(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    category        = models.ForeignKey('suggestion.Category', on_delete=models.RESTRICT, null=True)
    post            = models.TextField(
                                    unique=True,
                                    help_text="Enter blog"
                                    )
    like            = models.ForeignKey('Blog_likes', on_delete=models.RESTRICT, null=True)
    time            = models.DateTimeField(verbose_name="date posted", auto_now_add=True)
    comment         = models.ForeignKey('Blog_comment', on_delete=models.RESTRICT, null=True)

class Blog_comment(models.Model):
    user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
    post            = models.TextField(
                                    unique=True,
                                    help_text="Comment"
                                    )
    like            = models.ForeignKey('Blog_comment_likes', on_delete=models.RESTRICT, null=True)
    time            = models.DateTimeField(verbose_name="date posted", auto_now_add=True)

class Blog_likes(models.Model):
         user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)

class Blog_comment_likes(models.Model):
         user            = models.ForeignKey('account.Account', on_delete=models.RESTRICT, null=True)
         