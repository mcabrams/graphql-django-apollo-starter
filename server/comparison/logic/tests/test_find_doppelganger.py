from django.test import TestCase

from ..find_doppelganger import get_doppelganger_and_score

from question.tests.factories import AnsweredQuestionFactory, QuestionFactory
from user_profile.tests.factories import UserProfileFactory


class GetDoppelgangerAndScoreTests(TestCase):
    def test_if_no_good_candidates_doppelganger_is_none(self):
        user_profile = UserProfileFactory()
        UserProfileFactory()
        self.assertIsNone(get_doppelganger_and_score(user_profile))

    def test_finds_doppelganger_with_most_similar_answers(self):
        question = QuestionFactory(with_answers=True)
        non_shared_answer = question.answers.first()
        shared_answer = question.answers.last()

        user_profile, doppelganger = [AnsweredQuestionFactory(
            question=question,
            answer=shared_answer
        ).user_profile for _ in range(2)]

        # Create an answered ques. with a profile that won't be a doppelganger
        AnsweredQuestionFactory(
            question=question,
            answer=non_shared_answer,
        )

        # Create a profile with no answered questions that won't be a
        # doppelganger
        UserProfileFactory()

        self.assertEqual(get_doppelganger_and_score(user_profile),
                         (doppelganger, 1))
