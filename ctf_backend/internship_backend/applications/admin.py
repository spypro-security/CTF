from django.contrib import admin
from .models import InternshipApplication, JobApplication

@admin.register(InternshipApplication)
class InternshipApplicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'domain', 'passed_out_year', 'status', 'created_at']
    list_filter = ['domain', 'status', 'passed_out_year', 'created_at']
    search_fields = ['name', 'email', 'college_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'email', 'phone', 'college_name', 'passed_out_year')
        }),
        ('Internship Details', {
            'fields': ('domain', 'resume')
        }),
        ('Application Status', {
            'fields': ('status', 'created_at', 'updated_at')
        }),
    )
    
    actions = ['mark_as_reviewed', 'mark_as_accepted', 'mark_as_rejected']
    
    def mark_as_reviewed(self, request, queryset):
        queryset.update(status='reviewed')
    mark_as_reviewed.short_description = "Mark selected as Reviewed"
    
    def mark_as_accepted(self, request, queryset):
        queryset.update(status='accepted')
    mark_as_accepted.short_description = "Mark selected as Accepted"
    
    def mark_as_rejected(self, request, queryset):
        queryset.update(status='rejected')
    mark_as_rejected.short_description = "Mark selected as Rejected"


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'job_title', 'company', 'status', 'created_at']
    list_filter = ['job_title', 'company', 'status', 'created_at']
    search_fields = ['name', 'email', 'job_title', 'company']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'email', 'phone', 'college_name', 'passed_out_year')
        }),
        ('Job Details', {
            'fields': ('job_id', 'job_title', 'company', 'location', 'salary', 'job_type')
        }),
        ('Professional Details', {
            'fields': ('experience', 'current_company', 'current_role', 'current_ctc', 'expected_ctc', 'portfolio', 'cover_letter', 'resume')
        }),
        ('Application Status', {
            'fields': ('status', 'created_at', 'updated_at')
        }),
    )

    actions = ['mark_as_reviewed', 'mark_as_accepted', 'mark_as_rejected']

    def mark_as_reviewed(self, request, queryset):
        queryset.update(status='reviewed')
    mark_as_reviewed.short_description = "Mark selected as Reviewed"

    def mark_as_accepted(self, request, queryset):
        queryset.update(status='accepted')
    mark_as_accepted.short_description = "Mark selected as Accepted"

    def mark_as_rejected(self, request, queryset):
        queryset.update(status='rejected')
    mark_as_rejected.short_description = "Mark selected as Rejected"