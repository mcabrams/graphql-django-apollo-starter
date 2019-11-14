from user_profile.models import UserProfile

from .doppelganger_score import doppelganger_score


def get_doppelganger_and_score(user_profile):
    users_and_scores = [
        (target, doppelganger_score(user_profile, target))
        for target
        in UserProfile.objects.exclude(pk=user_profile.id)
    ]

    candidates = [(user, score) for user, score in users_and_scores
                  if score is not None and score != 0]

    if not candidates:
        return None

    return max(candidates, key=lambda user_and_score: user_and_score[1])
