def doppelganger_score(source_user_profile, target_user_profile):
    shared_questions_count = _shared_questions_count(source_user_profile,
                                                     target_user_profile)
    if shared_questions_count == 0:
        return None

    shared_answers_count = _shared_answers_count(source_user_profile,
                                                 target_user_profile)

    return (shared_answers_count/shared_questions_count)


def _shared_questions_count(source_user_profile, target_user_profile):
    sources_questions = source_user_profile.questions()
    targets_questions = target_user_profile.questions()
    shared_questions = sources_questions.intersection(targets_questions)
    return shared_questions.count()


def _shared_answers_count(source_user_profile, target_user_profile):
    source_answered_qs = source_user_profile.answered_questions.all()
    target_answered_qs = target_user_profile.answered_questions.all()
    shared_answers = source_answered_qs.shared_answers_with(
        target_answered_qs,
    )
    return shared_answers.count()
