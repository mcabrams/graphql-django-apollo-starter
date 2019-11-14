from django.test import TestCase

from question.models import Answer, Question
from question.tests.factories import AnsweredQuestionFactory
from .factories import UserProfileFactory


class UserTestCase(TestCase):
    def setUp(self):
        self.user_profile = UserProfileFactory()

    def test_questions(self):
        AnsweredQuestionFactory(user_profile=self.user_profile)
        AnsweredQuestionFactory(user_profile=self.user_profile)
        self.assertEqual(
            list(self.user_profile.questions().all()),
            list(Question.objects.all()),
        )

    def test_answers(self):
        AnsweredQuestionFactory(user_profile=self.user_profile)
        AnsweredQuestionFactory(user_profile=self.user_profile)
        self.assertEqual(
            list(self.user_profile.answers().all()),
            list(Answer.objects.all()),
        )
