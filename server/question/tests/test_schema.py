from graphql_relay import to_global_id
import json

from tests.helpers import JSONWebTokenTestCase, no_permission_error
from user_profile.tests.factories import UserProfileFactory

from .factories import AnswerFactory, AnsweredQuestionFactory, QuestionFactory
from ..models import AnsweredQuestion
from ..schema import QuestionType


def result_to_dict(result):
    return json.loads(json.dumps(result))


class QuestionsTestCase(JSONWebTokenTestCase):
    op_name = 'questions'

    def test_questions_can_return_nested_answers(self):
        question = QuestionFactory()
        answer1 = AnswerFactory(question=question)
        answer2 = AnswerFactory(question=question)

        result = self.client.execute(
            '''
            query {
                questions {
                    edges {
                        node {
                            id
                            pk
                            text
                            answers {
                                pk
                                text
                            }
                        }
                    }
                }
            }
            ''',
        )
        expected = [{
            'node': {
                'id': to_global_id(QuestionType._meta.name, question.id),
                'pk': question.id,
                'text': question.text,
                'answers': [
                    {'pk': answer2.id, 'text': answer2.text},
                    {'pk': answer1.id, 'text': answer1.text},
                ],
            }
        }]

        self.assertIsNone(result.errors)
        self.assertEqual(result.data[self.op_name]['edges'], expected)

    def test_attempting_to_omit_answers_while_not_logged_in_errors(self):
        result = self.client.execute(
            '''
            query {
                questions(omitAnsweredQuestions: true) {
                    edges {
                        node {
                            id
                            pk
                            text
                            answers {
                                pk
                                text
                            }
                        }
                    }
                }
            }
            ''',
        )

        self.assertEqual([str(e) for e in result.errors], [no_permission_error])

    def test_omits_answered_questions_when_arg_passed(self):
        # Non answered question
        question = QuestionFactory()
        answer1 = AnswerFactory(question=question)
        answer2 = AnswerFactory(question=question)

        # answered question
        question2 = QuestionFactory()
        answer3 = AnswerFactory(question=question2)
        AnswerFactory(question=question2)

        # authenticate user with answered question
        user_profile = UserProfileFactory()
        AnsweredQuestionFactory(
            user_profile=user_profile,
            question=question2,
            answer=answer3,
        )
        user = user_profile.user
        self.client.authenticate(user)

        result = self.client.execute(
            '''
            query {
                questions(omitAnsweredQuestions: true) {
                    edges {
                        node {
                            id
                            pk
                            text
                            answers {
                                pk
                                text
                            }
                        }
                    }
                }
            }
            ''',
        )

        self.assertIsNone(result.errors)
        self.assertEqual(result.data[self.op_name]['edges'], [{
            'node': {
                'id': to_global_id(QuestionType._meta.name, question.id),
                'pk': question.id,
                'text': question.text,
                'answers': [
                    {'pk': answer2.id, 'text': answer2.text},
                    {'pk': answer1.id, 'text': answer1.text},
                ],
            }
        }])


class CreateAnsweredQuestionTestCase(JSONWebTokenTestCase):
    op_name = 'createAnsweredQuestion'

    def setUp(self):
        self.profile = UserProfileFactory()
        self.user = self.profile.user
        self.answer = AnswerFactory()
        self.question = self.answer.question

    def test_attempting_to_create_fails_when_unauthenticated(self):
        result = self.create_answered_question(
            question_id=self.question.id,
            answer_id=self.answer.id,
        )
        self.assertIsNotNone(result.errors)
        self.assertIsNone(result.data[self.op_name])
        self.assertFalse(AnsweredQuestion.objects.exists())

    def test_creates_when_authenticated(self):
        self.client.authenticate(self.user)
        result = self.create_answered_question(
            question_id=self.question.id,
            answer_id=self.answer.id,
        )
        self.assertIsNone(result.errors)
        answered_question = AnsweredQuestion.objects.get(
            user_profile=self.profile,
            question=self.question,
            answer=self.answer,
        )
        self.assertEqual(result_to_dict(result.data[self.op_name]), {
            'answeredQuestion': {
                'id': str(answered_question.id),
            },
        })

    def create_answered_question(self, question_id, answer_id):
        mutation = (
            '''
            mutation CreateAnsweredQuestion(
                $questionId: Int!,
                $answerId: Int!,
            ) {
                createAnsweredQuestion(
                    questionId: $questionId,
                    answerId: $answerId,
                ) {
                    answeredQuestion {
                        id
                    }
                }
            }
            '''
        )
        return self.client.execute(mutation, variables={
            'questionId': question_id, 'answerId': answer_id,
        })
