import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Phone, Sparkles } from 'lucide-react';
import { useSite } from '../../contexts/SiteContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBranchId?: string;
  defaultBoard?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultBranchId,
  defaultBoard = 'CBSE & HBSE',
}) => {
  const { branches, submitEnquiry } = useSite();

  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [classGrade, setClassGrade] = useState('Nursery');
  const [preferredBranchId, setPreferredBranchId] = useState(defaultBranchId || (branches[0]?.id || ''));
  const [board, setBoard] = useState(defaultBoard);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    if (defaultBranchId) {
      setPreferredBranchId(defaultBranchId);
    }
  }, [defaultBranchId]);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!studentName.trim() || !parentName.trim() || !mobile.trim()) {
      setErrorMessage('Please fill in student name, parent name, and mobile number.');
      return;
    }

    const cleanPhone = mobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number.');
      return;
    }

    try {
      setSubmitting(true);
      const selectedBranch = branches.find(b => b.id === preferredBranchId);

      await submitEnquiry({
        studentName: studentName.trim(),
        parentName: parentName.trim(),
        mobile: cleanPhone,
        email: email.trim(),
        classGrade,
        preferredBranchId,
        preferredBranchName: selectedBranch ? selectedBranch.name : 'Sector 14 Branch',
        board,
        message: message.trim(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setErrorMessage('Unable to submit enquiry right now. Please call us directly at 8368268149 or 9355135904.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStudentName('');
    setParentName('');
    setMobile('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        id="admission-enquiry-modal"
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close enquiry modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Enquiry Received!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for expressing interest in Siddhartha International Group of Schools. Our admission counselor from your preferred branch will reach out to you within 24 hours.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-900">For urgent queries, call our leadership directly:</p>
              <p>Director (Sandeep Kumar): <a href="tel:8368268149" className="font-bold text-amber-700">8368268149</a></p>
              <p>Manager (Kalpna Kumari): <a href="tel:9355135904" className="font-bold text-amber-700">9355135904</a></p>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-2">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Admissions 2027-28 Open</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Admission Enquiry Form</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Siddhartha International Group of Schools • 12 Gurugram Branches
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Child's full name"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Father / Mother name"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Class Applying For *
                  </label>
                  <select
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Curriculum Board *
                  </label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="CBSE & HBSE">CBSE & HBSE (School Decides)</option>
                    <option value="CBSE">CBSE (Central Board)</option>
                    <option value="HBSE">HBSE (Haryana Board)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Gurugram Branch *
                </label>
                <select
                  value={preferredBranchId}
                  onChange={(e) => setPreferredBranchId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.sector})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Transport route, sibling concession, or specific questions..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <a
                  href="tel:8368268149"
                  className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-amber-700"
                >
                  <Phone className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  <span>Call 8368268149</span>
                </a>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>{submitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
