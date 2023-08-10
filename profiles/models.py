from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from drf_api_lastpage.globals import LANGUAGES


class Profile(models.Model):
    """
    User Profile Model 
    default image set so that we can always reference image.url.
    """

    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    language = models.CharField(max_length=50, choices=LANGUAGES, blank=True)
    image = models.ImageField(
        upload_to='images/', default='../default_profile_hk81a7.jpg') 
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        """
        Return profile where the newest are the first
        """
        ordering = ['-created_on']

    def __str__(self):
        return f"{self.owner}'s profile"

    def create_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(owner=instance)

    post_save.connect(create_profile, sender=User)