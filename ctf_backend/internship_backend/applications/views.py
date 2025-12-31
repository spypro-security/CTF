from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .models import InternshipApplication
from .serializers import InternshipApplicationSerializer

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def submit_application(request):
    """
    Submit a new internship application with email notifications
    """
    # Check if user already applied for this domain
    email = request.data.get('email')
    domain = request.data.get('domain')
    
    if email and domain:
        existing_application = InternshipApplication.objects.filter(
            email=email, 
            domain=domain
        ).first()
        
        if existing_application:
            # Return a normal 200 response with structured JSON so frontend can
            # handle "already applied" as a normal response (not a network/error)
            serializer = InternshipApplicationSerializer(existing_application)
            return Response({
                'success': False,
                'message': 'You have already applied for this internship!',
                'already_applied': True,
                'application': serializer.data,
                'application_date': existing_application.created_at.isoformat(),
                'status': existing_application.get_status_display()
            }, status=status.HTTP_200_OK)
    
    serializer = InternshipApplicationSerializer(data=request.data)
    
    if serializer.is_valid():
        application = serializer.save()
        
        # Send email to user
        try:
            send_user_confirmation_email(application)
            print(f"✅ User confirmation email sent to {application.email}")
        except Exception as e:
            print(f"❌ Failed to send user email: {str(e)}")
        
        # Send email to company
        try:
            send_company_notification_email(application)
            print(f"✅ Company notification email sent")
        except Exception as e:
            print(f"❌ Failed to send company email: {str(e)}")
        
        return Response({
            'success': True,
            'message': 'Application submitted successfully! Check your email for confirmation.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'message': 'Application submission failed',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


def send_user_confirmation_email(application):
    """Send confirmation email to the applicant"""
    subject = f'Application Received - {application.domain} Internship'
    
    # Plain text message
    message = f"""
Dear {application.name},

Thank you for applying to our {application.domain} Internship Program!

We have successfully received your application with the following details:

Name: {application.name}
Email: {application.email}
Phone: {application.phone}
College: {application.college_name}
Year of Passing: {application.passed_out_year}
Domain: {application.domain}
Application Date: {application.created_at.strftime('%B %d, %Y at %I:%M %p')}

Your application is currently under review. Our team will carefully evaluate your profile and get back to you within 5-7 business days.

Application Status: {application.get_status_display()}

What's Next?
• Our team will review your application
• You'll receive an email update about your application status
• If selected, we'll contact you for the next steps

If you have any questions, feel free to reply to this email.

Best regards,
Internship Team
SpyPro Security Pvt. Ltd., Hyderabad

---
This is an automated email. Please do not reply to this email.
    """
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[application.email],
            fail_silently=False,
        )
        print(f"✅ Confirmation email sent to {application.email}")
    except Exception as e:
        print(f"❌ Error sending email to user: {str(e)}")


def send_company_notification_email(application):
    """Send notification email to company"""
    subject = f'New Internship Application - {application.domain}'
    
    message = f"""
New Internship Application Received!

Application Details:
-------------------
Name: {application.name}
Email: {application.email}
Phone: {application.phone}
College: {application.college_name}
Year of Passing: {application.passed_out_year}
Domain: {application.domain}
Application Date: {application.created_at.strftime('%B %d, %Y at %I:%M %p')}

Resume: {'Uploaded' if application.resume else 'Not Uploaded'}

View full details in admin panel:
http://localhost:8000/admin/applications/internshipapplication/{application.id}/change/

Status: {application.get_status_display()}

---
This is an automated notification.
    """
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.COMPANY_EMAIL],
            fail_silently=False,
        )
        print(f"✅ Notification email sent to company")
    except Exception as e:
        print(f"❌ Error sending email to company: {str(e)}")


@api_view(['GET'])
def check_application_status(request):
    """
    Check if user has already applied
    Query params: email, domain
    """
    email = request.GET.get('email')
    domain = request.GET.get('domain')
    
    if not email or not domain:
        return Response({
            'message': 'Email and domain are required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        application = InternshipApplication.objects.get(email=email, domain=domain)
        serializer = InternshipApplicationSerializer(application)
        return Response({
            'already_applied': True,
            'application': serializer.data
        })
    except InternshipApplication.DoesNotExist:
        return Response({
            'already_applied': False,
            'message': 'No application found'
        })


@api_view(['GET'])
def get_applications(request):
    """
    Get all applications (for admin panel)
    """
    domain = request.GET.get('domain', None)
    
    if domain:
        applications = InternshipApplication.objects.filter(domain=domain)
    else:
        applications = InternshipApplication.objects.all()
    
    serializer = InternshipApplicationSerializer(applications, many=True)
    return Response({
        'count': applications.count(),
        'applications': serializer.data
    })


@api_view(['GET'])
def get_application_detail(request, pk):
    """
    Get single application detail
    """
    try:
        application = InternshipApplication.objects.get(pk=pk)
        serializer = InternshipApplicationSerializer(application)
        return Response(serializer.data)
    except InternshipApplication.DoesNotExist:
        return Response({
            'message': 'Application not found'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
def update_application_status(request, pk):
    """
    Update application status (for admin) and send notification email
    """
    try:
        application = InternshipApplication.objects.get(pk=pk)
        new_status = request.data.get('status')
        
        if new_status in dict(InternshipApplication.STATUS_CHOICES):
            old_status = application.status
            application.status = new_status
            application.save()
            
            # Send status update email to user
            send_status_update_email(application, old_status, new_status)
            
            serializer = InternshipApplicationSerializer(application)
            return Response({
                'message': 'Status updated successfully',
                'data': serializer.data
            })
        else:
            return Response({
                'message': 'Invalid status'
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except InternshipApplication.DoesNotExist:
        return Response({
            'message': 'Application not found'
        }, status=status.HTTP_404_NOT_FOUND)


def send_status_update_email(application, old_status, new_status):
    """Send email when application status changes"""
    
    status_messages = {
        'reviewed': {
            'subject': 'Your Application is Under Review',
            'message': f"""
Dear {application.name},

Good news! Your application for the {application.domain} Internship is now under review.

Our team is carefully evaluating your profile and will get back to you soon with the next steps.

Current Status: Under Review
Application Date: {application.created_at.strftime('%B %d, %Y')}

Thank you for your patience!

Best regards,
Internship Team
            """
        },
        'accepted': {
            'subject': '🎉 Congratulations! Your Application is Accepted',
            'message': f"""
Dear {application.name},

Congratulations! We are pleased to inform you that your application for the {application.domain} Internship has been ACCEPTED! 🎉

Next Steps:
1. Our team will contact you within 2-3 business days
2. We'll schedule an orientation session
3. You'll receive further details about the internship start date

Application Details:
- Domain: {application.domain}
- Applied on: {application.created_at.strftime('%B %d, %Y')}

We look forward to having you on our team!

Best regards,
Internship Team
            """
        },
        'rejected': {
            'subject': 'Update on Your Internship Application',
            'message': f"""
Dear {application.name},

Thank you for your interest in the {application.domain} Internship Program.

After careful consideration, we regret to inform you that we are unable to proceed with your application at this time.

We received many strong applications, and this decision was very difficult. We encourage you to:
- Apply for other internship opportunities
- Continue building your skills
- Apply again in the future

We wish you the best in your career journey!

Best regards,
Internship Team
            """
        }
    }
    
    if new_status in status_messages:
        email_data = status_messages[new_status]
        try:
            send_mail(
                subject=email_data['subject'],
                message=email_data['message'],
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[application.email],
                fail_silently=False,
            )
            print(f"✅ Status update email sent to {application.email} - Status: {new_status}")
        except Exception as e:
            print(f"❌ Error sending status update email: {str(e)}")


# ----------------------- Job applications (mirror of Internship) -----------------------
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def submit_job_application(request):
    """
    Submit a new job application with email notifications
    """
    email = request.data.get('email')
    job_id = request.data.get('job_id')

    from .models import JobApplication
    from .serializers import JobApplicationSerializer

    if email and job_id:
        existing_application = JobApplication.objects.filter(
            email=email,
            job_id=job_id
        ).first()
        if existing_application:
            serializer = JobApplicationSerializer(existing_application)
            return Response({
                'success': False,
                'message': 'You have already applied for this job!',
                'already_applied': True,
                'application': serializer.data,
                'application_date': existing_application.created_at.isoformat(),
                'status': existing_application.get_status_display()
            }, status=status.HTTP_200_OK)

    serializer = JobApplicationSerializer(data=request.data)
    if serializer.is_valid():
        application = serializer.save()

        try:
            send_user_job_confirmation_email(application)
            print(f"✅ User confirmation email sent to {application.email}")
        except Exception as e:
            print(f"❌ Failed to send user email: {str(e)}")

        try:
            send_company_job_notification_email(application)
            print(f"✅ Company notification email sent")
        except Exception as e:
            print(f"❌ Failed to send company email: {str(e)}")

        return Response({
            'success': True,
            'message': 'Job application submitted successfully! Check your email for confirmation.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

    return Response({
        'success': False,
        'message': 'Application submission failed',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


def send_user_job_confirmation_email(application):
    subject = f'Application Received - {application.job_title}'
    message = f"""
Dear {application.name},

Thank you for applying to the {application.job_title} position at {application.company}!

We have successfully received your application with the following details:

Name: {application.name}
Email: {application.email}
Phone: {application.phone}
College: {application.college_name}
Year of Passing: {application.passed_out_year}
Position: {application.job_title}
Company: {application.company}
Application Date: {application.created_at.strftime('%B %d, %Y at %I:%M %p')}

Your application is currently under review. Our team will carefully evaluate your profile and get back to you within 5-7 business days.

Application Status: {application.get_status_display()}

If you have any questions, feel free to reply to this email.

Best regards,
Recruitment Team

---
This is an automated email. Please do not reply to this email.
    """
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[application.email],
            fail_silently=False,
        )
        print(f"✅ Confirmation email sent to {application.email}")
    except Exception as e:
        print(f"❌ Error sending email to user: {str(e)}")


def send_company_job_notification_email(application):
    subject = f'New Job Application - {application.job_title} at {application.company}'
    message = f"""
New Job Application Received!

Application Details:
-------------------
Name: {application.name}
Email: {application.email}
Phone: {application.phone}
College: {application.college_name}
Position: {application.job_title}
Company: {application.company}
Location: {application.location}
Application Date: {application.created_at.strftime('%B %d, %Y at %I:%M %p')}

Resume: {'Uploaded' if application.resume else 'Not Uploaded'}

View full details in admin panel:
http://localhost:8000/admin/applications/jobapplication/{application.id}/change/

Status: {application.get_status_display()}

---
This is an automated notification.
    """
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.COMPANY_EMAIL],
            fail_silently=False,
        )
        print(f"✅ Notification email sent to company")
    except Exception as e:
        print(f"❌ Error sending email to company: {str(e)}")


@api_view(['GET'])
def check_job_application_status(request):
    """
    Check if user has already applied for a job
    Query params: email, job_id
    """
    email = request.GET.get('email')
    job_id = request.GET.get('job_id')

    if not email or not job_id:
        return Response({'message': 'Email and job_id are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        from .models import JobApplication
        application = JobApplication.objects.get(email=email, job_id=job_id)
        from .serializers import JobApplicationSerializer
        serializer = JobApplicationSerializer(application)
        return Response({
            'already_applied': True,
            'application': serializer.data
        })
    except Exception:
        return Response({
            'already_applied': False,
            'message': 'No application found'
        })


@api_view(['GET'])
def get_job_applications(request):
    job_id = request.GET.get('job_id', None)
    from .models import JobApplication
    from .serializers import JobApplicationSerializer
    if job_id:
        applications = JobApplication.objects.filter(job_id=job_id)
    else:
        applications = JobApplication.objects.all()
    serializer = JobApplicationSerializer(applications, many=True)
    return Response({'count': applications.count(), 'applications': serializer.data})


@api_view(['GET'])
def get_job_application_detail(request, pk):
    from .models import JobApplication
    from .serializers import JobApplicationSerializer
    try:
        application = JobApplication.objects.get(pk=pk)
        serializer = JobApplicationSerializer(application)
        return Response(serializer.data)
    except JobApplication.DoesNotExist:
        return Response({'message': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
def update_job_application_status(request, pk):
    from .models import JobApplication
    from .serializers import JobApplicationSerializer
    try:
        application = JobApplication.objects.get(pk=pk)
        new_status = request.data.get('status')
        if new_status in dict(application.STATUS_CHOICES):
            old_status = application.status
            application.status = new_status
            application.save()
            # Send status update
            send_job_status_update_email(application, old_status, new_status)
            serializer = JobApplicationSerializer(application)
            return Response({'message': 'Status updated successfully', 'data': serializer.data})
        else:
            return Response({'message': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
    except JobApplication.DoesNotExist:
        return Response({'message': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)


def send_job_status_update_email(application, old_status, new_status):
    status_messages = {
        'reviewed': {
            'subject': 'Your Job Application is Under Review',
            'message': f"""
Dear {application.name},

Good news! Your application for the {application.job_title} position is now under review.

Our team is carefully evaluating your profile and will get back to you soon with the next steps.

Current Status: Under Review
Application Date: {application.created_at.strftime('%B %d, %Y')}

Thank you for your patience!

Best regards,
Recruitment Team
            """
        },
        'accepted': {
            'subject': '🎉 Congratulations! Your Job Application is Accepted',
            'message': f"""
Dear {application.name},

Congratulations! We are pleased to inform you that your application for the {application.job_title} position has been ACCEPTED! 🎉

Next Steps:
1. Our team will contact you within 2-3 business days
2. We'll schedule an onboarding discussion

Application Details:
- Position: {application.job_title}
- Company: {application.company}
- Applied on: {application.created_at.strftime('%B %d, %Y')}

We look forward to having you on our team!

Best regards,
Recruitment Team
            """
        },
        'rejected': {
            'subject': 'Update on Your Job Application',
            'message': f"""
Dear {application.name},

Thank you for your interest in the {application.job_title} position at {application.company}.

After careful consideration, we regret to inform you that we are unable to proceed with your application at this time.

We received many strong applications, and this decision was very difficult. We encourage you to apply for other opportunities and keep building your skills.

Best regards,
Recruitment Team
            """
        }
    }

    if new_status in status_messages:
        email_data = status_messages[new_status]
        try:
            send_mail(
                subject=email_data['subject'],
                message=email_data['message'],
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[application.email],
                fail_silently=False,
            )
            print(f"✅ Status update email sent to {application.email} - Status: {new_status}")
        except Exception as e:
            print(f"❌ Error sending status update email: {str(e)}")
