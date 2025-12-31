from django.db import models
from django.core.validators import RegexValidator

class InternshipApplication(models.Model):
    YEAR_CHOICES = [
        ('2023', '2023 (Passed)'),
        ('2024', '2024 (Passed)'),
        ('2025', '2025'),
        ('2026', '2026'),
        ('2027', '2027'),
        ('2028', '2028'),
    ]
    
    DOMAIN_CHOICES = [
        ('Python Development', 'Python Development'),
        ('Java Full Stack', 'Java Full Stack'),
        ('Cyber Security', 'Cyber Security'),
        ('AI / ML', 'AI / ML'),
        ('Data Science', 'Data Science'),
        ('Generative AI', 'Generative AI'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    
    # Personal Information
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(validators=[phone_regex], max_length=17)
    college_name = models.CharField(max_length=300)
    passed_out_year = models.CharField(max_length=4, choices=YEAR_CHOICES)
    domain = models.CharField(max_length=100, choices=DOMAIN_CHOICES)
    
    # Resume Upload
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    
    # Status and Timestamps
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Internship Application'
        verbose_name_plural = 'Internship Applications'
    
    def __str__(self):
        return f"{self.name} - {self.domain}"


class JobApplication(models.Model):
    YEAR_CHOICES = InternshipApplication.YEAR_CHOICES
    STATUS_CHOICES = InternshipApplication.STATUS_CHOICES

    # Job details from frontend (job id/title/company etc.)
    job_id = models.IntegerField(null=True, blank=True)
    job_title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    salary = models.CharField(max_length=100, null=True, blank=True)
    job_type = models.CharField(max_length=100, null=True, blank=True)

    # Personal & professional information
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(validators=[InternshipApplication.phone_regex], max_length=17)
    college_name = models.CharField(max_length=300)
    passed_out_year = models.CharField(max_length=4, choices=YEAR_CHOICES)

    experience = models.CharField(max_length=20, default='0')
    current_company = models.CharField(max_length=255, null=True, blank=True)
    current_role = models.CharField(max_length=255, null=True, blank=True)
    current_ctc = models.CharField(max_length=100, null=True, blank=True)
    expected_ctc = models.CharField(max_length=100, null=True, blank=True)

    portfolio = models.URLField(null=True, blank=True)
    cover_letter = models.TextField(null=True, blank=True)

    # Resume Upload
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)

    # Status and timestamps
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Job Application'
        verbose_name_plural = 'Job Applications'
        unique_together = (('email', 'job_id'),)

    def __str__(self):
        return f"{self.name} - {self.job_title}"
