import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sendFormNotification, FormNotificationPayload } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      formType = 'admission',
      studentName,
      parentName,
      name,
      mobile,
      email,
      classGrade = 'General Enquiry',
      preferredBranchId,
      preferredBranchName,
      board = 'Either',
      subject,
      message,
    } = body;

    // 1. Validation
    const effectiveName = (studentName || name || parentName || '').trim();
    if (!effectiveName) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid name.' },
        { status: 400 }
      );
    }

    const cleanMobile = (mobile || '').toString().replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a valid 10-digit Indian mobile number.',
        },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toISOString();

    // 2. Persist to Firestore 'enquiries' collection
    let firestoreId = '';
    try {
      const colRef = collection(db, 'enquiries');
      const docRef = await addDoc(colRef, {
        studentName: (studentName || name || effectiveName).trim(),
        parentName: (parentName || name || effectiveName).trim(),
        mobile: cleanMobile,
        email: email ? email.trim() : '',
        classGrade: classGrade || 'General Enquiry',
        preferredBranchId: preferredBranchId || '',
        preferredBranchName: preferredBranchName || 'Central Directorate',
        board: board || 'CBSE & HBSE',
        subject: subject ? subject.trim() : '',
        message: message ? message.trim() : '',
        formType,
        status: 'new',
        createdAt: submissionTime,
        updatedAt: submissionTime,
      });
      firestoreId = docRef.id;
    } catch (dbError: any) {
      console.error('Firestore persistence failure:', dbError);
      return NextResponse.json(
        {
          success: false,
          message: 'Database error: Could not record submission. Please call our helpline directly.',
          error: dbError?.message,
        },
        { status: 500 }
      );
    }

    // 3. Trigger Resend Email Notification via server-side service
    const emailPayload: FormNotificationPayload = {
      formType: (['admission', 'quick_enquiry', 'branch_enquiry', 'contact'].includes(formType)
        ? formType
        : 'admission') as any,
      studentName: studentName?.trim(),
      parentName: parentName?.trim(),
      name: name?.trim() || effectiveName,
      mobile: cleanMobile,
      email: email?.trim(),
      classGrade,
      preferredBranchId,
      preferredBranchName,
      board,
      subject: subject?.trim(),
      message: message?.trim(),
      submittedAt: submissionTime,
      firestoreId,
    };

    const emailResult = await sendFormNotification(emailPayload);

    // 4. Update Firestore doc with email delivery status if available
    if (firestoreId) {
      try {
        const docRef = doc(db, 'enquiries', firestoreId);
        await updateDoc(docRef, {
          emailNotificationStatus: emailResult.success
            ? 'sent'
            : emailResult.skipped
            ? 'not_configured'
            : 'failed',
          emailNotificationId: emailResult.id || null,
          emailNotificationError: emailResult.error || null,
          emailSentAt: emailResult.success ? new Date().toISOString() : null,
        });
      } catch (updateErr) {
        // Non-blocking error if status tracking update fails
        console.warn('Could not update enquiry with email delivery status:', updateErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully. Our admissions coordinator will contact you shortly.',
        firestoreId,
        emailSent: emailResult.success,
        emailSkipped: emailResult.skipped || false,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Server error processing form submission:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Internal server error while processing form.',
      },
      { status: 500 }
    );
  }
}
