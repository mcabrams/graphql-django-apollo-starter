from django.db import models

from helpers.models import TimeStampedModel
from user.models import User


class UserProfile(TimeStampedModel):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
    )
