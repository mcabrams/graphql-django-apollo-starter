from django.db import models

from helpers.models import TimeStampedModel
from user_profile.models import UserProfile


class Question(TimeStampedModel):
    text = models.CharField(max_length=1024)


class Answer(TimeStampedModel):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='answers',
    )
    text = models.CharField(max_length=1024)


class AnsweredQuestionQuerySet(models.QuerySet):
    def answers(self):
        """
        Return query set of answered questions mapped to their answers.
        """
        return Answer.objects.filter(
            id__in=self.values_list('answer__id', flat=True))

    def questions(self):
        """
        Return query set of answered questions mapped to their question.
        """
        return Question.objects.filter(
            id__in=self.values_list('question__id', flat=True))

    def shared_with(self, other_answered_question_queryset):
        """
        Return query set of answered questions intersecting with other query
        set ignoring user profile.  This allows retrieving a queryset of
        answered questions for one user profile that match the answers another
        user gave.
        """
        shared_answers = self.shared_answers_with(
            other_answered_question_queryset)

        return self.filter(answer__in=shared_answers.values_list(
            'id', flat=True)).order_by('pk')

    def shared_answers_with(self, other_answered_question_queryset):
        """
        Return query set of answers intersecting with other query
        set ignoring user profile.  This allows retrieving a queryset of
        answers for one user profile that match the answers another
        user gave.
        """
        return self.answers().intersection(
            other_answered_question_queryset.answers()).order_by('pk')


class AnsweredQuestion(TimeStampedModel):
    objects = AnsweredQuestionQuerySet.as_manager()

    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE,
        related_name='answered_questions',
    )
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='answered_questions',
    )
