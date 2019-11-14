import factory

from tests.helpers import fake_question
from user_profile.tests.factories import UserProfileFactory

from ..models import Answer, AnsweredQuestion, Question


class QuestionFactory(factory.DjangoModelFactory):
    class Meta:
        model = Question

    text = factory.LazyAttribute(fake_question)
    questions = None

    class Params:
        with_answers = factory.Trait(
            questions=factory.RelatedFactoryList(
                'question.tests.factories.AnswerFactory',
                factory_related_name='question',
                size=2,
            )
        )


class AnswerFactory(factory.DjangoModelFactory):
    class Meta:
        model = Answer

    text = factory.Faker('paragraph', nb_sentences=1)
    question = factory.SubFactory(QuestionFactory)


class AnsweredQuestionFactory(factory.DjangoModelFactory):
    class Meta:
        model = AnsweredQuestion

    question = factory.SubFactory(QuestionFactory)
    answer = factory.SubFactory(AnswerFactory,
                                question=factory.SelfAttribute('..question'))
    user_profile = factory.SubFactory(UserProfileFactory)


def shared_answered_questions_factory(user_profile1=None, user_profile2=None,
                                      different_answers=False):
    """ Creates a shared answered question with two user profiles - if different
    answers is False, the answers will be the same, if it's True they will be
    different. """

    question = QuestionFactory(with_answers=True)
    user_profile1_answered_question = AnsweredQuestionFactory(
        question=question,
        answer=question.answers.first(),
        **({'user_profile': user_profile1} if user_profile1 else {}),
    )

    user2s_answer = (question.answers.last()
                     if different_answers else question.answers.first())
    user_profile2_answered_question = AnsweredQuestionFactory(
        question=question,
        answer=user2s_answer,
        **({'user_profile': user_profile2} if user_profile2 else {}),
    )
    return user_profile1_answered_question, user_profile2_answered_question
