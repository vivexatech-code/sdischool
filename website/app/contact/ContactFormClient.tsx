'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, MessageSquare } from 'lucide-react';
import { submitAdmissionEnquiry } from '@/lib/firestore';
import { INITIAL_BRANCHES } from '@/lib/seedData';
import { formatPhone } from '@/lib/utils';

export const ContactFormClient: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [preferredBranchId, setPreferredBranchId] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setError('Please provide a valid 10-digit Indian mobile number.');
      return;
    }

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }

    try {
      setSubmitting(true);
      const selectedBranch = INITIAL_BRANCHES.find(b => b.id === preferredBranchId);
      const branchName = selectedBranch ? selectedBranch.name : 'Central Directorate';

      await submitAdmissionEnquiry({
        formType: 'contact',
        name: name.trim(),
        studentName: name.trim(),
        parentName: name.trim(),
        mobile: cleanMobile,
        email: email.trim() || undefined,
        classGrade: 'Contact Enquiry',
        preferredBranchId: preferredBranchId || 'central',
        preferredBranchName: branchName,
        board: 'CBSE & HBSE',
        subject: subject.trim(),
        message: message.trim() || undefined,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setError(err?.message || 'Failed to submit enquiry. Please call our central helpline directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-4 bg-emerald-50/60 rounded-3xl p-8 border border-emerald-200">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Message Received Successfully!</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Siddhartha International Group of Schools. Our administrative office has received your enquiry and an email notification has been dispatched. Our team will contact you at <strong className="text-slate-900">{formatPhone(mobile)}</strong> shortly.
        </p>
        <div className="pt-3 border-t border-emerald-200/60 text-xs font-semibold text-slate-700 flex flex-wrap items-center justify-center gap-4">
          <span>Director Sandeep Kumar: <a href="tel:8368268149" className="text-amber-800 font-bold font-mono">{formatPhone('8368268149')}</a></span>
          <span>Manager Kalpna Kumari: <a href="tel:9355135904" className="text-sky-800 font-bold font-mono">{formatPhone('9355135904')}</a></span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rajesh Kumar"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Mobile Number (10 Digits) *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">+91</span>
            <input
              type="tel"
              required
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              placeholder="9876543210"
              className="w-full pl-11 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono bg-white"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rajesh.kumar@example.com"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Subject / Enquiry Category *</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="General Enquiry">General School Enquiry</option>
            <option value="Admissions Consultation">Admissions Consultation</option>
            <option value="Campus Tour Booking">Campus Tour Booking</option>
            <option value="Transport & Bus Route Query">Transport & Bus Route Query</option>
            <option value="Fee Structure Query">Fee Structure Query</option>
            <option value="Parent Feedback / Grievance">Parent Feedback / Grievance</option>
            <option value="Career / Job Application">Career / Job Application</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-bold text-slate-700 mb-1">Preferred Campus / Branch (Optional)</label>
        <select
          value={preferredBranchId}
          onChange={(e) => setPreferredBranchId(e.target.value)}
          className="w-full px-3 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none truncate"
        >
          <option value="">Central Administration / Any Campus</option>
          {INITIAL_BRANCHES.map(b => (
            <option key={b.id} value={b.id}>
              {b.name} ({b.sector} - {b.board})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-bold text-slate-700 mb-1">Your Message or Detailed Query *</label>
        <textarea
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please write your questions regarding admissions, facilities, curriculum, or appointment..."
          className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{submitting ? 'Submitting Message...' : 'Send Message to School Directorate'}</span>
      </button>
    </form>
  );
};
