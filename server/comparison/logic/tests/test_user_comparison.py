from django.test import TestCase

from question.tests.factories import shared_answered_questions_factory
from user_profile.tests.factories import UserProfileFactory

from ..user_comparison import UserComparison


class UserComparisonTestCase(TestCase):
    def test_comparison_returns_answered_questions_for_users_with_no_questions(
            self):
        user_profile1 = UserProfileFactory()
        user_profile2 = UserProfileFactory()
        comparison = UserComparison(
            source_user_profile=user_profile1,
            target_user_profile=user_profile2,
        )
        self.assertEqual(list(comparison.sources_shared_answered_questions()),
                         [])
        self.assertEqual(list(comparison.targets_shared_answered_questions()),
                         [])

    def test_comparison_returns_answered_questions_for_users_with_shared_qs(
            self):
        user_profile1 = UserProfileFactory()
        user_profile2 = UserProfileFactory()
        user1_answered_question1, user2_answered_question1 = (
            shared_answered_questions_factory(
                user_profile1=user_profile1,
                user_profile2=user_profile2,
            )
        )
        user1_answered_question2, user2_answered_question2 = (
            shared_answered_questions_factory(
                user_profile1=user_profile1,
                user_profile2=user_profile2,
            )
        )
        shared_answered_questions_factory(
            user_profile1=user_profile1,
            user_profile2=user_profile2,
            different_answers=True,
        )

        comparison = UserComparison(
            source_user_profile=user_profile1,
            target_user_profile=user_profile2,
        )
        self.assertEqual(list(comparison.sources_shared_answered_questions()),
                         [user1_answered_question1, user1_answered_question2])
        self.assertEqual(list(comparison.targets_shared_answered_questions()),
                         [user2_answered_question1, user2_answered_question2])
