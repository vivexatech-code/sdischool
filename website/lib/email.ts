import { Resend } from 'resend';

export interface FormNotificationPayload {
  formType: 'admission' | 'quick_enquiry' | 'branch_enquiry' | 'contact';
  studentName?: string;
  parentName?: string;
  name?: string; // For general contact form
  mobile: string;
  email?: string;
  classGrade?: string;
  preferredBranchId?: string;
  preferredBranchName?: string;
  board?: string;
  subject?: string;
  message?: string;
  submittedAt?: string;
  firestoreId?: string;
}

export interface EmailSendResult {
  success: boolean;
  id?: string;
  error?: string;
  skipped?: boolean;
}

let resendInstance: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

/**
 * Format date in Indian Standard Time (IST)
 */
function formatSubmissionDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  try {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Kolkata',
    }).format(d);
  } catch {
    return d.toUTCString();
  }
}

/**
 * Build professional responsive HTML email template for school administration
 */
function buildHtmlEmail(payload: FormNotificationPayload): string {
  const timestamp = formatSubmissionDate(payload.submittedAt);
  const cleanPhone = (payload.mobile || '').replace(/\D/g, '');
  const primaryName = payload.studentName || payload.name || payload.parentName || 'Parent / Visitor';
  const visitorEmail = payload.email?.trim() || '';

  let formBadge = 'Admission Enquiry';
  let headerColor = '#b45309'; // amber-700
  let accentBg = '#fef3c7'; // amber-100

  if (payload.formType === 'contact') {
    formBadge = 'Contact Us Enquiry';
    headerColor = '#0284c7'; // sky-600
    accentBg = '#e0f2fe';
  } else if (payload.formType === 'branch_enquiry') {
    formBadge = `Campus Enquiry • ${payload.preferredBranchName || 'Branch'}`;
    headerColor = '#059669'; // emerald-600
    accentBg = '#d1fae5';
  } else if (payload.formType === 'quick_enquiry') {
    formBadge = 'Quick Admission Enquiry';
    headerColor = '#d97706';
    accentBg = '#fef3c7';
  }

  const rows: { label: string; value: string; isHighlight?: boolean }[] = [];

  if (payload.formType === 'contact') {
    rows.push({ label: 'Visitor / Sender Name', value: payload.name || payload.parentName || 'Not provided', isHighlight: true });
    if (payload.subject) {
      rows.push({ label: 'Subject', value: payload.subject });
    }
  } else {
    if (payload.studentName) {
      rows.push({ label: "Student's Full Name", value: payload.studentName, isHighlight: true });
    }
    if (payload.parentName) {
      rows.push({ label: 'Parent / Guardian Name', value: payload.parentName });
    }
    if (payload.classGrade) {
      rows.push({ label: 'Seeking Admission In', value: payload.classGrade, isHighlight: true });
    }
    if (payload.board) {
      rows.push({ label: 'Curriculum Preference', value: payload.board });
    }
    if (payload.preferredBranchName) {
      rows.push({ label: 'Designated Gurugram Campus', value: payload.preferredBranchName });
    }
  }

  rows.push({
    label: 'Contact Mobile Number',
    value: `+91 ${cleanPhone}`,
    isHighlight: true,
  });

  if (visitorEmail) {
    rows.push({ label: 'Email Address', value: visitorEmail });
  }

  if (payload.message) {
    rows.push({ label: 'Inquiry / Special Notes', value: payload.message });
  }

  if (payload.firestoreId) {
    rows.push({ label: 'Firestore Reference ID', value: payload.firestoreId });
  }

  const rowsHtml = rows
    .map(
      r => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; color: #475569; font-size: 13px; font-weight: 600; width: 38%; vertical-align: top;">
          ${r.label}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; color: ${r.isHighlight ? '#0f172a' : '#334155'}; font-size: 14px; font-weight: ${r.isHighlight ? '700' : '500'}; vertical-align: top;">
          ${r.value}
        </td>
      </tr>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 28px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);">
          
          <!-- Brand Header -->
          <tr>
            <td style="background-color: #0f172a; padding: 28px 32px 24px; text-align: left; border-bottom: 3px solid #f59e0b;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #f59e0b; font-weight: 800; margin-bottom: 4px;">
                      Siddhartha International Group of Schools
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; line-height: 1.3;">
                      New Official Website Form Submission
                    </h1>
                    <div style="margin-top: 6px; color: #94a3b8; font-size: 12px;">
                      12 Premier Campuses Across Gurugram • CBSE & HBSE
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sub-header Badge & Timestamp -->
          <tr>
            <td style="padding: 20px 32px 14px; background-color: #fcfcfd; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left">
                    <span style="display: inline-block; padding: 5px 12px; border-radius: 9999px; background-color: ${accentBg}; color: ${headerColor}; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                      ${formBadge}
                    </span>
                  </td>
                  <td align="right" style="color: #64748b; font-size: 12px; font-weight: 500;">
                    ${timestamp}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Submission Details Table -->
          <tr>
            <td style="padding: 16px 24px 24px;">
              <div style="margin-bottom: 12px; padding: 0 8px;">
                <h2 style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">
                  Submission Details for: <span style="color: ${headerColor};">${primaryName}</span>
                </h2>
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
                ${rowsHtml}
              </table>
            </td>
          </tr>

          <!-- Action Buttons for School Admin -->
          <tr>
            <td style="padding: 0 32px 28px;">
              <div style="background-color: #f8fafc; border-radius: 14px; padding: 18px 20px; border: 1px solid #e2e8f0; text-align: center;">
                <div style="font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Quick Contact Actions
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <a href="tel:${cleanPhone}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 10px; font-size: 13px; font-weight: 700; margin: 4px;">
                        📞 Call Parent (+91 ${cleanPhone})
                      </a>
                      <a href="https://wa.me/91${cleanPhone}?text=${encodeURIComponent('Hello from Siddhartha International Group of Schools. Thank you for your enquiry.')}" style="display: inline-block; background-color: #15803d; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 10px; font-size: 13px; font-weight: 700; margin: 4px;">
                        💬 WhatsApp Message
                      </a>
                      ${visitorEmail ? `
                      <a href="mailto:${visitorEmail}?subject=Re:%20Admission%20Enquiry%20-%20Siddhartha%20International%20Schools" style="display: inline-block; background-color: #d97706; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 10px; font-size: 13px; font-weight: 700; margin: 4px;">
                        ✉️ Email Parent
                      </a>
                      ` : ''}
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 11px; line-height: 1.6;">
              <p style="margin: 0 0 6px;">
                This automated notification was generated by the <strong>Siddhartha International Group of Schools</strong> website.
              </p>
              <p style="margin: 0; color: #94a3b8;">
                Central Directorate: Director Sandeep Kumar (+91 8368268149) • Manager Kalpna Kumari (+91 9355135904)
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/**
 * Build plain text version of the email for accessibility and fallback
 */
function buildTextEmail(payload: FormNotificationPayload): string {
  const timestamp = formatSubmissionDate(payload.submittedAt);
  const cleanPhone = (payload.mobile || '').replace(/\D/g, '');

  return `
SIDDHARTHA INTERNATIONAL GROUP OF SCHOOLS
========================================
NEW FORM SUBMISSION: ${payload.formType.toUpperCase()}
Submitted: ${timestamp}

Details:
----------------------------------------
Student Name: ${payload.studentName || 'N/A'}
Parent / Visitor Name: ${payload.parentName || payload.name || 'N/A'}
Mobile Phone: +91 ${cleanPhone}
Email: ${payload.email || 'N/A'}
Class / Grade: ${payload.classGrade || 'N/A'}
Preferred Campus: ${payload.preferredBranchName || 'N/A'}
Curriculum: ${payload.board || 'N/A'}
Subject: ${payload.subject || 'N/A'}
Message: ${payload.message || 'N/A'}
Firestore Doc ID: ${payload.firestoreId || 'N/A'}
----------------------------------------

Quick Actions:
Call: tel:${cleanPhone}
WhatsApp: https://wa.me/91${cleanPhone}

Central Helpline:
Director Sandeep Kumar: +91 8368268149
Manager Kalpna Kumari: +91 9355135904
`;
}

/**
 * Reusable server-side helper to send form notification email via Resend
 */
export async function sendFormNotification(
  payload: FormNotificationPayload
): Promise<EmailSendResult> {
  const resend = getResendClient();

  if (!resend) {
    console.warn(
      '⚠️ RESEND_API_KEY environment variable is not set. Email notification skipped, but form data was safely persisted in Firestore.'
    );
    return {
      success: true,
      skipped: true,
      error: 'RESEND_API_KEY not configured',
    };
  }

  // Determine recipient email: configured receiver or fallback to school primary email
  const toEmail = process.env.FORM_RECEIVER_EMAIL?.trim() || 'info@siddharthaschools.edu.in';

  // Determine sender: if custom domain is provided in RESEND_FROM_EMAIL use it,
  // otherwise fallback to safe Resend testing sender onboarding@resend.dev
  let fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  if (!fromEmail) {
    fromEmail = 'Siddhartha International Schools <onboarding@resend.dev>';
  } else if (!fromEmail.includes('<') && !fromEmail.includes('>')) {
    fromEmail = `Siddhartha International Schools <${fromEmail}>`;
  }

  // Generate subject based on form type and details
  let subject = 'New Form Submission — Siddhartha International Group of Schools';
  const branchTag = payload.preferredBranchName ? ` [${payload.preferredBranchName}]` : '';

  if (payload.formType === 'admission') {
    const student = payload.studentName || payload.parentName || 'New Applicant';
    const grade = payload.classGrade ? ` (${payload.classGrade})` : '';
    subject = `New Admission Enquiry: ${student}${grade}${branchTag} — Siddhartha International Group of Schools`;
  } else if (payload.formType === 'branch_enquiry') {
    subject = `New Branch Enquiry: ${payload.preferredBranchName || 'Campus'} — Siddhartha International Group of Schools`;
  } else if (payload.formType === 'contact') {
    const sender = payload.name || payload.parentName || 'Visitor';
    subject = `New Contact Enquiry: ${sender} — Siddhartha International Group of Schools`;
  } else if (payload.formType === 'quick_enquiry') {
    const student = payload.studentName || 'Student';
    subject = `Quick Admission Enquiry: ${student}${branchTag} — Siddhartha International Group of Schools`;
  }

  try {
    const sendOptions: Parameters<typeof resend.emails.send>[0] = {
      from: fromEmail,
      to: [toEmail],
      subject,
      html: buildHtmlEmail(payload),
      text: buildTextEmail(payload),
    };

    // If visitor provided a valid email address, set it as reply_to so the admin can reply directly!
    if (payload.email && payload.email.includes('@')) {
      sendOptions.replyTo = payload.email.trim();
    }

    const { data, error } = await resend.emails.send(sendOptions);

    if (error) {
      console.error('Resend API returned error:', error);
      return {
        success: false,
        error: error.message || 'Resend API error',
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err: any) {
    console.error('Unexpected error while sending Resend notification:', err);
    return {
      success: false,
      error: err?.message || 'Failed to send email notification',
    };
  }
}
