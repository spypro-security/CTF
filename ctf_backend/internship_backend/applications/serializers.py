from rest_framework import serializers
from .models import InternshipApplication

class InternshipApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternshipApplication
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'college_name',
            'passed_out_year',
            'domain',
            'resume',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'status']
    
    def validate_email(self, value):
        """Check if email already exists for this domain"""
        domain = self.initial_data.get('domain')
        if InternshipApplication.objects.filter(email=value, domain=domain).exists():
            raise serializers.ValidationError(
                "You have already applied for this internship domain."
            )
        return value


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = None  # set below to avoid circular reference
        fields = [
            'id',
            'job_id',
            'job_title',
            'company',
            'location',
            'salary',
            'job_type',
            'name',
            'email',
            'phone',
            'college_name',
            'passed_out_year',
            'experience',
            'current_company',
            'current_role',
            'current_ctc',
            'expected_ctc',
            'portfolio',
            'cover_letter',
            'resume',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'status']

    def validate_email(self, value):
        """Check if email already exists for this job"""
        job_id = self.initial_data.get('job_id')
        from .models import JobApplication
        if job_id and JobApplication.objects.filter(email=value, job_id=job_id).exists():
            raise serializers.ValidationError(
                "You have already applied for this job."
            )
        return value


# Set model reference at bottom to avoid import cycle
from .models import JobApplication
JobApplicationSerializer.Meta.model = JobApplication