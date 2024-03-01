# Generated by Django 5.0.2 on 2024-02-28 23:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Testimonial_comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response', models.TextField(help_text='Comment', unique=True)),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='date posted')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='account.account')),
            ],
        ),
        migrations.CreateModel(
            name='Testimonial_likes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='account.account')),
            ],
        ),
        migrations.CreateModel(
            name='Testimonial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post', models.TextField(help_text='Enter blog', unique=True)),
                ('rate', models.IntegerField(default=0)),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='date posted')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='account.account')),
                ('comments', models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='testimonial.testimonial_comment')),
                ('like', models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='testimonial.testimonial_likes')),
            ],
        ),
    ]
