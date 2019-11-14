import graphene
from graphene_django.types import DjangoObjectType
from graphene import relay
from graphql_jwt.decorators import login_required
from graphql_jwt.exceptions import PermissionDenied

from .models import Answer, AnsweredQuestion, Question


class PKMixin:
    pk = graphene.Field(required=True, type=graphene.Int, source='id')


class QuestionType(DjangoObjectType, PKMixin):
    class Meta:
        model = Question
        fields = ('pk', 'id', 'text', 'answers')
        interfaces = (relay.Node,)


class QuestionConnection(relay.Connection):
    class Meta:
        node = QuestionType


class AnswerType(DjangoObjectType, PKMixin):
    class Meta:
        model = Answer
        fields = ('pk', 'id', 'text',)


class Query(graphene.ObjectType):
    questions = relay.ConnectionField(
        QuestionConnection,
        omit_answered_questions=graphene.Boolean(required=False),
    )

    def resolve_questions(self, info, omit_answered_questions=False, **kwargs):
        if not omit_answered_questions:
            return Question.objects.all()

        user = info.context.user

        if not user.is_authenticated:
            raise PermissionDenied()

        answered_questions = user.profile.questions()

        return Question.objects.all().difference(answered_questions).order_by(
            'pk',
        )


class AnsweredQuestionType(DjangoObjectType):
    class Meta:
        model = AnsweredQuestion
        fields = ('id', 'question', 'answer', 'user')


class CreateAnsweredQuestion(graphene.Mutation):
    class Arguments:
        question_id = graphene.Int()
        answer_id = graphene.Int()

    answered_question = graphene.Field(AnsweredQuestionType)

    @login_required
    def mutate(self, info, question_id, answer_id):
        answered_question = AnsweredQuestion.objects.create(
            user_profile=info.context.user.profile,
            question_id=question_id,
            answer_id=answer_id,
        )

        return CreateAnsweredQuestion(
            answered_question=answered_question,
        )


class Mutation(graphene.ObjectType):
    create_answered_question = CreateAnsweredQuestion.Field()
