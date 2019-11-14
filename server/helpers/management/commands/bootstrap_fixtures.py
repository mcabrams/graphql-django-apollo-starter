from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from question.models import Answer, Question
from question.tests.factories import (
    AnswerFactory, AnsweredQuestionFactory, QuestionFactory,
)
from user_profile.tests.factories import UserProfileFactory

BEST_VILLAIN = 'Who is the best villain?'
BEST_DJ = 'Who is the best DJ?'
BEST_SEINFELD_CHARACTER = 'Who was the best Seinfeld character?'

question_answers = [
    [
        BEST_VILLAIN,
        ['Darth Vader', 'Darth Maul', 'Jar Jar Binks'],
    ],
    [
        BEST_DJ,
        ['A-Trak', 'Diplo', 'Paris Hilton'],
    ],
    [
        BEST_SEINFELD_CHARACTER,
        ['Jerry', 'Elaine', 'Kramer', 'George'],
    ],
]


def create_questions_and_answers(question_answers):
    for [question_text, answer_texts] in question_answers:
        question = QuestionFactory(text=question_text)

        for answer_text in answer_texts:
            AnswerFactory(question=question, text=answer_text)


class Command(BaseCommand):
    help = '''
    Generate some sample data meant to be used for local interaction with the
    server - not mean to be use for unit/integration tests.
    '''

    def handle(self, *args, **options):
        # question
        create_questions_and_answers(question_answers)

        # user
        user = get_user_model().objects.create_superuser(
            username='foobar',
            email='foobar@example.com',
            password='foobar1234')
        UserProfileFactory(user=user)

        profile_with_doppelganger = UserProfileFactory(
            user__email='userWithDoppelganger@example.com',
            user__password='foobar1234',
        )
        AnsweredQuestionFactory(
            user_profile=profile_with_doppelganger,
            question=Question.objects.get(text=BEST_VILLAIN),
            answer=Answer.objects.get(text='Darth Vader'),
        )
        AnsweredQuestionFactory(
            user_profile=profile_with_doppelganger,
            question=Question.objects.get(text=BEST_DJ),
            answer=Answer.objects.get(text='A-Trak'),
        )
        AnsweredQuestionFactory(
            user_profile=profile_with_doppelganger,
            question=Question.objects.get(text=BEST_SEINFELD_CHARACTER),
            answer=Answer.objects.get(text='Jerry'),
        )

        doppelganger_profile = UserProfileFactory(
            user__email='doppelganger@example.com',
            user__password='foobar1234',
        )
        AnsweredQuestionFactory(
            user_profile=doppelganger_profile,
            question=Question.objects.get(text=BEST_VILLAIN),
            answer=Answer.objects.get(text='Darth Vader'),
        )
        AnsweredQuestionFactory(
            user_profile=doppelganger_profile,
            question=Question.objects.get(text=BEST_DJ),
            answer=Answer.objects.get(text='Diplo'),
        )
        AnsweredQuestionFactory(
            user_profile=doppelganger_profile,
            question=Question.objects.get(text=BEST_SEINFELD_CHARACTER),
            answer=Answer.objects.get(text='Jerry'),
        )

        not_doppelganger_profile = UserProfileFactory(
            user__email='notDoppelganger@example.com',
            user__password='foobar1234',
        )
        AnsweredQuestionFactory(
            user_profile=not_doppelganger_profile,
            question=Question.objects.get(text=BEST_VILLAIN),
            answer=Answer.objects.get(text='Darth Maul'),
        )
        AnsweredQuestionFactory(
            user_profile=not_doppelganger_profile,
            question=Question.objects.get(text=BEST_DJ),
            answer=Answer.objects.get(text='Diplo'),
        )
        AnsweredQuestionFactory(
            user_profile=not_doppelganger_profile,
            question=Question.objects.get(text=BEST_SEINFELD_CHARACTER),
            answer=Answer.objects.get(text='George'),
        )

        UserProfileFactory(
            user__email='noAnsweredQuestions@example.com',
            user__password='foobar1234',
        )
