from django.contrib import admin

# Register your models here.

from login.models import Users
from courses.models import Courses, Course_Modules, Tests, Question_Bank, Options
from staff.models import Guide
from students.models import Accessed_Course, Test_Scores

admin.site.register(Users)
admin.site.register(Accessed_Course)
admin.site.register(Guide)
admin.site.register(Course_Modules)
admin.site.register(Courses)
admin.site.register(Tests)
admin.site.register(Test_Scores)
admin.site.register(Options)
admin.site.register(Question_Bank)
