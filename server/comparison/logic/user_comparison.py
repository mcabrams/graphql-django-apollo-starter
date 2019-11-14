def shared_answered_questions(source_user_profile, target_user_profile):
    return source_user_profile.answered_questions.all().shared_with(
        target_user_profile.answered_questions.all()
    )


class UserComparison:
    def __init__(self, source_user_profile, target_user_profile):
        self._source_user_profile = source_user_profile
        self._target_user_profile = target_user_profile

    def sources_shared_answered_questions(self):
        return shared_answered_questions(
            self._source_user_profile,
            self._target_user_profile,
        )

    def targets_shared_answered_questions(self):
        return shared_answered_questions(
            self._target_user_profile,
            self._source_user_profile,
        )
