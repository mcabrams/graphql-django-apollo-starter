from unittest.mock import patch

from django.contrib.auth import get_user_model

from tests.helpers import JSONWebTokenTestCase, no_permission_error
from question.tests.factories import (
    QuestionFactory, shared_answered_questions_factory,
)
from user_profile.models import UserProfile
from user_profile.tests.factories import UserProfileFactory


def fake_get_doppelganger_and_score(user_profile):
    if user_profile.user.username == 'has_no_doppelganger':
        return None

    return (UserProfile.objects.last(), 1)


@patch('comparison.schema.get_doppelganger_and_score',
       side_effect=fake_get_doppelganger_and_score)
class ComputeDoppelgangerTestCase(JSONWebTokenTestCase):
    op_name = 'computeDoppelganger'

    def test_will_error_if_not_logged_in(self, _):
        user_profile = UserProfileFactory()
        result = self.compute_doppelganger({'userProfileId': user_profile.id})
        self.assertEqual([str(e) for e in result.errors], [no_permission_error])

    def test_will_error_if_not_user_requesting(self, _):
        user_profile = UserProfileFactory()
        user_profile_requesting = UserProfileFactory()
        self.client.authenticate(user_profile_requesting.user)
        result = self.compute_doppelganger({'userProfileId': user_profile.id})
        self.assertEqual([str(e) for e in result.errors], [no_permission_error])

    def test_will_not_error_if_superuser_requesting(self, _):
        superuser = get_user_model().objects.create_superuser(
            username='foobar2',
            email='foobar2@example.com',
            password='password')
        user_profile = UserProfileFactory()
        self.client.authenticate(superuser)
        result = self.compute_doppelganger({'userProfileId': user_profile.id})
        self.assertIsNone(result.errors)

    def test_will_return_score_and_user_if_doppelganger_exists(self, _):
        user_profile = UserProfileFactory()
        doppelganger = UserProfileFactory()
        self.client.authenticate(user_profile.user)
        expected_result = {
            'userProfile': {
                'user': {
                    'username': doppelganger.user.username,
                },
            },
            'doppelgangerInfo': {
                'score': 1.0,
            },
        }

        with self.subTest('with explicit variables passed'):
            result = self.compute_doppelganger(
                {'userProfileId': user_profile.id})

            self.assertIsNone(result.errors)
            self.assertEqual(result.data[self.op_name], expected_result)

        with self.subTest('with implicit user through authentication'):
            result = self.compute_doppelganger()

            self.assertIsNone(result.errors)
            self.assertEqual(result.data[self.op_name], expected_result)

    def test_will_return_none_if_no_doppelganger_exists(self, _):
        user_profile = UserProfileFactory(user__username='has_no_doppelganger')
        self.client.authenticate(user_profile.user)

        result = self.compute_doppelganger({'userProfileId': user_profile.id})

        self.assertIsNone(result.errors)
        self.assertEqual(result.data[self.op_name], None)

    def compute_doppelganger(self, variables=None):
        return self.client.execute(
            query='''
            query ComputeDoppelganger (
                $userProfileId: Int,
            ) {
                computeDoppelganger(userProfileId: $userProfileId) {
                    userProfile {
                        user {
                            username
                        }
                    }
                    doppelgangerInfo {
                        score
                    }
                }
            }
            ''',
            variables=variables,
        )


class UserComparisonTestCase(JSONWebTokenTestCase):
    op_name = 'userComparison'

    def setUp(self):
        self.user_profile = UserProfileFactory()
        self.target_user_profile = UserProfileFactory()

    def test_will_error_if_not_logged_in(self):
        result = self.user_comparison({
            'sourceUserProfileId': self.user_profile.id,
            'targetUserProfileId': self.target_user_profile.id,
        })
        self.assertEqual([str(e) for e in result.errors], [no_permission_error])

    def test_will_error_if_not_user_requesting(self):
        user_profile_requesting = UserProfileFactory()
        self.client.authenticate(user_profile_requesting.user)
        result = self.user_comparison({
            'sourceUserProfileId': self.user_profile.id,
            'targetUserProfileId': self.target_user_profile.id,
        })
        self.assertEqual([str(e) for e in result.errors], [no_permission_error])

    def test_will_error_if_target_user_does_not_exist(self):
        self.client.authenticate(self.user_profile.user)
        result = self.user_comparison({
            'sourceUserProfileId': self.user_profile.id,
            'targetUserProfileId': 9999999,
        })
        self.assertEqual([str(e) for e in result.errors],
                         ['UserProfile matching query does not exist.'])

    def test_will_return_correct_result_if_requesting_with_permissions(self):
        # question neither have answered
        QuestionFactory(with_answers=True)

        # setup shared answers
        user1_answered_question, user2_answered_question = (
            shared_answered_questions_factory(
                user_profile1=self.user_profile,
                user_profile2=self.target_user_profile,
            ))

        # setup different answers
        shared_answered_questions_factory(
            user_profile1=self.user_profile,
            user_profile2=self.target_user_profile,
            different_answers=True,
        )

        expected_result = {
            'sourceUser': {
                'sharedAnsweredQuestions': [
                    {
                        'question': {
                            'pk': user1_answered_question.question.id,
                            'text': user1_answered_question.question.text,
                        },
                        'answer': {
                            'id': str(user1_answered_question.answer.id),
                            'text': user1_answered_question.answer.text,
                        },
                    }
                ],
            },
            'targetUser': {
                'sharedAnsweredQuestions': [
                    {
                        'question': {
                            'pk': user2_answered_question.question.id,
                            'text': user2_answered_question.question.text,
                        },
                        'answer': {
                            'id': str(user2_answered_question.answer.id),
                            'text': user2_answered_question.answer.text,
                        },
                    }
                ],
            },
        }

        with self.subTest('with superuser requesting'):
            superuser = get_user_model().objects.create_superuser(
                username='foobar2',
                email='foobar2@example.com',
                password='password')
            self.client.authenticate(superuser)
            result = self.user_comparison({
                'sourceUserProfileId': self.user_profile.id,
                'targetUserProfileId': self.target_user_profile.id,
            })
            self.assertIsNone(result.errors)
            self.assertEqual(result.data[self.op_name], expected_result)

        with self.subTest('with explicit variables passed'):
            self.client.authenticate(self.user_profile.user)
            result = self.user_comparison({
                'sourceUserProfileId': self.user_profile.id,
                'targetUserProfileId': self.target_user_profile.id,
            })

            self.assertIsNone(result.errors)
            self.assertEqual(result.data[self.op_name], expected_result)

        with self.subTest('with implicit user through authentication'):
            self.client.authenticate(self.user_profile.user)
            result = self.user_comparison({
                'targetUserProfileId': self.target_user_profile.id,
            })
            self.assertIsNone(result.errors)
            self.assertEqual(result.data[self.op_name], expected_result)

    def user_comparison(self, variables=None):
        return self.client.execute(
            query='''
            query UserComparison (
                $targetUserProfileId: Int!,
                $sourceUserProfileId: Int,
            ) {
                userComparison(
                    targetUserProfileId: $targetUserProfileId,
                    sourceUserProfileId: $sourceUserProfileId,
                ) {
                    sourceUser {
                        sharedAnsweredQuestions {
                            ...sharedAnsweredQuestionFields
                        }
                    }
                    targetUser {
                        sharedAnsweredQuestions {
                            ...sharedAnsweredQuestionFields
                        }
                    }
                }
            }

            fragment sharedAnsweredQuestionFields on AnsweredQuestionType {
                question {
                    pk
                    text
                }
                answer {
                    id
                    text
                }
            }
            ''',
            variables=variables,
        )
