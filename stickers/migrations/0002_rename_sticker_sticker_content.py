# Generated by Django 3.2.20 on 2023-08-12 13:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stickers', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sticker',
            old_name='sticker',
            new_name='content',
        ),
    ]