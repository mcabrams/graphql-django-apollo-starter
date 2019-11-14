from django.test import TestCase

from ..doppelganger_score import doppelganger_score

from question.tests.factories import AnsweredQuestionFactory, QuestionFactory
from user_profile.tests.factories import UserProfileFactory


class DoppelgangerScoreTestCase(TestCase):
    def test_score_against_somebody_with_no_shared_questions(self):
        user_profile = UserProfileFactory()
        target = UserProfileFactory()
        self.assertEqual(doppelganger_score(user_profile, target), None)

    def test_score_against_somebody_with_shared_questions(self):
        with self.subTest('1 shared question, different answers'):
            user_profile = UserProfileFactory()
            target = UserProfileFactory()
            question = QuestionFactory(with_answers=True)

            AnsweredQuestionFactory(question=question,
                                    answer=question.answers.first(),
                                    user_profile=user_profile)
            AnsweredQuestionFactory(question=question,
                                    answer=question.answers.last(),
                                    user_profile=target)

            self.assertEqual(doppelganger_score(user_profile, target), 0)

        with self.subTest('1 shared question, same answers'):
            user_profile = UserProfileFactory()
            target = UserProfileFactory()
            question = QuestionFactory(with_answers=True)

            AnsweredQuestionFactory(question=question,
                                    answer=question.answers.first(),
                                    user_profile=user_profile)
            AnsweredQuestionFactory(question=question,
                                    answer=question.answers.first(),
                                    user_profile=target)

            self.assertEqual(doppelganger_score(user_profile, target), 1)

        with self.subTest('2 shared questions, same + different answers'):
            user_profile = UserProfileFactory()
            target = UserProfileFactory()
            question = QuestionFactory(with_answers=True)

            AnsweredQuestionFactory(question=question,
                                    answer=question.answers.first(),
                                    user_profile=user_profile)
            AnsweredQuestionFactory(question=question,
                                    answer=question.answers.first(),
                                    user_profile=target)

            other_question = QuestionFactory(with_answers=True)

            AnsweredQuestionFactory(question=other_question,
                                    answer=question.answers.first(),
                                    user_profile=user_profile)
            AnsweredQuestionFactory(question=other_question,
                                    answer=question.answers.last(),
                                    user_profile=target)

            self.assertEqual(doppelganger_score(user_profile, target), 0.5)
