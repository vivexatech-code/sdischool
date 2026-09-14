import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { useSite } from '../../contexts/SiteContext';
import { updateDocumentSeo } from '../../lib/seo';
import { 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Send, 
  AlertCircle, 
  FileText, 
  Calendar, 
  MapPin, 
  Users,
  Building2,
  FileCheck,
  HelpCircle
} from 'lucide-react';
import { formatPhone } from '../../lib/utils';

export const AdmissionsPage: React.FC = () => {
  const { branches, submitEnquiry } = useSite();
  const [searchParams] = useSearchParams();
  const queryBranchId = searchParams.get('branch');

  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [classGrade, setClassGrade] = useState('Nursery');
  const [preferredBranchId, setPreferredBranchId] = useState(queryBranchId || (branches[0]?.id || ''));
  const [board, setBoard] = useState('CBSE & HBSE');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (queryBranchId) {
      setPreferredBranchId(queryBranchId);
    } else if (!preferredBranchId && branches[0]?.id) {
      setPreferredBranchId(branches[0].id);
    }
  }, [queryBranchId, branches]);

  useEffect(() => {
    updateDocumentSeo({
      title: 'Admissions Open 2027-28 | Siddhartha International Group of Schools Gurugram',
      description: 'Apply for admission at Siddhartha International Group of Schools across 12 branches in Gurugram. Play School to Class 12, CBSE & HBSE. Simple online enquiry form.',
      canonicalUrl: `${window.location.origin}/admissions`,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!studentName.trim() || !parentName.trim() || !mobile.trim()) {
      setErrorMessage('Please provide student name, parent name, and 10-digit mobile number.');
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number.');
      return;
    }

    try {
      setSubmitting(true);
      const selectedBranch = branches.find(b => b.id === preferredBranchId);

      await submitEnquiry({
        studentName: studentName.trim(),
        parentName: parentName.trim(),
        mobile: cleanMobile,
        email: email.trim(),
        classGrade,
        preferredBranchId: preferredBranchId || (branches[0]?.id || ''),
        preferredBranchName: selectedBranch ? selectedBranch.name : 'Sector 14 Campus',
        board,
        message: message.trim(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to submit enquiry. Please call us directly at 8368268149.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <PageHeader
        title="Admissions 2027-28"
        subtitle="Open for Play School through Class 12 across our 12 Gurugram campuses. Experience modern infrastructure, dedicated faculty, and holistic learning."
        badge="Enrolling Now"
        breadcrumbs={[{ label: 'Admissions' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Main Grid: Form + Process */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form Container */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Enquiry Successfully Submitted!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-800">{parentName}</span>. Our admission office for your selected branch will contact you within 24 hours to schedule a campus tour.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 max-w-md mx-auto">
                  <p className="font-semibold text-slate-900">Urgent admission assistance:</p>
                  <p>Director (Sandeep Kumar): <a href="tel:8368268149" className="font-bold text-amber-700">8368268149</a></p>
                  <p>Manager (Kalpna Kumari): <a href="tel:9355135904" className="font-bold text-amber-700">9355135904</a></p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStudentName('');
                    setParentName('');
                    setMobile('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Academic Session 2027-28</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Online Admission Enquiry</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out this form and our admission counselor will connect with you promptly.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Child's full name"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="Father / Mother name"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Class Seeking Admission *
                      </label>
                      <select
                        value={classGrade}
                        onChange={(e) => setClassGrade(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                      >
                        <option value="Play School">Play School / Day Care</option>
                        <option value="Pre-Nursery">Pre-Nursery</option>
                        <option value="Nursery">Nursery</option>
                        <option value="KG / UKG">KG / UKG</option>
                        {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Curriculum Preference *
                      </label>
                      <select
                        value={board}
                        onChange={(e) => setBoard(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                      >
                        <option value="CBSE & HBSE">CBSE & HBSE (School Suggests)</option>
                        <option value="CBSE">CBSE (Central Board)</option>
                        <option value="HBSE">HBSE (Haryana Board)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Gurugram Branch *
                    </label>
                    <select
                      value={preferredBranchId}
                      onChange={(e) => setPreferredBranchId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    >
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.sector})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Message / Special Queries
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="School bus route inquiry, previous school transfer, sibling concessions..."
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <a
                      href="tel:8368268149"
                      className="text-xs font-bold text-slate-600 hover:text-amber-700 flex items-center gap-1.5"
                    >
                      <Phone className="w-4 h-4 text-amber-600" />
                      <span>Direct: 8368268149</span>
                    </a>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Admission Process & Direct Helpline */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Admission Process (4 Steps)</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Enquiry Submission</h4>
                    <p className="text-slate-600 mt-0.5">
                      Submit the form online or visit any of our 12 Gurugram campuses in person.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Campus Interaction</h4>
                    <p className="text-slate-600 mt-0.5">
                      Meet the branch principal, tour classrooms and labs, and review board syllabi.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Document Verification</h4>
                    <p className="text-slate-600 mt-0.5">
                      Birth certificate, transfer certificate (Class 1 onwards), report card, and Aadhaar card.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Seat Confirmation</h4>
                    <p className="text-slate-600 mt-0.5">
                      Fee deposit, issuance of student ID, uniform and textbook allotment, and bus allotment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Leadership Helpline */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Direct Leadership Access
              </span>
              <h4 className="text-lg font-bold">Speak with our Director & Manager</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Parents are welcome to speak directly with our senior administrators for any curriculum or fee structure questions:
              </p>
              <div className="pt-2 space-y-2 text-xs">
                <p>
                  Director Sandeep Kumar:{' '}
                  <a href="tel:8368268149" className="font-bold text-amber-300 hover:underline">
                    {formatPhone('8368268149')}
                  </a>
                </p>
                <p>
                  Manager Kalpna Kumari:{' '}
                  <a href="tel:9355135904" className="font-bold text-amber-300 hover:underline">
                    {formatPhone('9355135904')}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Age Criteria & Eligibility */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-bold text-slate-900">Age Eligibility Criteria (as of 31st March)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-amber-600 block uppercase">Play School / Day Care</span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">2+ to 3 Years</p>
              <p className="text-xs text-slate-500 mt-1">Sensory readiness & motor development</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-amber-600 block uppercase">Nursery</span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">3+ Years</p>
              <p className="text-xs text-slate-500 mt-1">Language foundation & social play</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-amber-600 block uppercase">Kindergarten (KG)</span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">4+ to 5 Years</p>
              <p className="text-xs text-slate-500 mt-1">Phonics, numbers & basic reading</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-amber-600 block uppercase">Class 1 & Above</span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">6+ Years for Class 1</p>
              <p className="text-xs text-slate-500 mt-1">Transfer certificate & report card required</p>
            </div>
          </div>
        </div>

        {/* Section: Documents Checklist */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-bold text-slate-900">Documents Required for Admission Confirmation</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Birth Certificate</span>
                <span className="text-slate-600">Official Municipal Corporation or Registrar birth certificate copy.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Aadhaar Card Copies</span>
                <span className="text-slate-600">Photocopy of student's and both parents' / guardian's Aadhaar cards.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Transfer Certificate (TC)</span>
                <span className="text-slate-600">Original counter-signed TC from previous recognized school (Class 1 onwards).</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Passport Size Photographs</span>
                <span className="text-slate-600">4 recent passport-size photographs of student, 2 each of parents.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
