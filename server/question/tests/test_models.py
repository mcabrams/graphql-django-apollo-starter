from django.test import TestCase

from user_profile.tests.factories import UserProfileFactory

from .factories import (
    AnsweredQuestionFactory, shared_answered_questions_factory,
)
from ..models import Answer, AnsweredQuestion, Question


class AnsweredQuestionManagerTestCase(TestCase):
    def test_questions(self):
        AnsweredQuestionFactory()
        AnsweredQuestionFactory()
        self.assertEqual(
            list(AnsweredQuestion.objects.questions().all()),
            list(Question.objects.all()),
        )

    def test_answers(self):
        AnsweredQuestionFactory()
        AnsweredQuestionFactory()
        self.assertEqual(
            list(AnsweredQuestion.objects.answers().all()),
            list(Answer.objects.all()),
        )


class AnsweredQuestionManagerSharedWithTestCase(TestCase):
    def setUp(self):
        user_profile1 = UserProfileFactory()
        user_profile2 = UserProfileFactory()

        # shared answer
        self.user1_answered_question1, _ = (
            shared_answered_questions_factory(
                user_profile1=user_profile1,
                user_profile2=user_profile2,
            ))

        # another shared answer
        self.user1_answered_question2, _ = (
            shared_answered_questions_factory(
                user_profile1=user_profile1,
                user_profile2=user_profile2,
            ))

        # a non-shared answer
        shared_answered_questions_factory(
            user_profile1=user_profile1,
            user_profile2=user_profile2,
            different_answers=True,
        )

        self.user1_answered_qs = user_profile1.answered_questions.all()
        self.user2_answered_qs = user_profile2.answered_questions.all()

    def test_shared_answers_with(self):
        actual = self.user1_answered_qs.shared_answers_with(
            self.user2_answered_qs)
        self.assertEqual(
            list(actual),
            [self.user1_answered_question1.answer,
             self.user1_answered_question2.answer],
        )

    def test_shared_with(self):
        self.assertEqual(
            list(self.user1_answered_qs.shared_with(self.user2_answered_qs)),
            [self.user1_answered_question1, self.user1_answered_question2],
        )
