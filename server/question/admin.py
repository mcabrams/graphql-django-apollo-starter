from django.contrib import admin
from .models import Answer, AnsweredQuestion, Question


class AnswerAdmin(admin.ModelAdmin):
    list_display = ('text',)


class InlineAnswerAdmin(admin.TabularInline):
    model = Answer
    extra = 0


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text',)
    inlines = (InlineAnswerAdmin,)


admin.site.register(Answer, AnswerAdmin)
admin.site.register(AnsweredQuestion)
admin.site.register(Question, QuestionAdmin)
