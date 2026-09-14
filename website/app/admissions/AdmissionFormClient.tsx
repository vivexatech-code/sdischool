'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitAdmissionEnquiry } from '@/lib/firestore';
import { INITIAL_BRANCHES } from '@/lib/seedData';
import { formatPhone } from '@/lib/utils';

export const AdmissionFormClient: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [classGrade, setClassGrade] = useState('Play School');
  const [preferredBranchId, setPreferredBranchId] = useState(INITIAL_BRANCHES[0]?.id || '');
  const [board, setBoard] = useState<'CBSE' | 'HBSE' | 'Either'>('Either');
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

    try {
      setSubmitting(true);
      const selectedBranch = INITIAL_BRANCHES.find(b => b.id === preferredBranchId);
      const branchName = selectedBranch ? selectedBranch.name : 'Central Campus';

      await submitAdmissionEnquiry({
        studentName: studentName.trim(),
        parentName: parentName.trim(),
        mobile: cleanMobile,
        email: email.trim() || undefined,
        classGrade,
        preferredBranchId,
        preferredBranchName: branchName,
        board,
        message: message.trim() || undefined,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Admission enquiry error:', err);
      setError(err?.message || 'Failed to submit application. Please contact our leadership helpline.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-4 bg-emerald-50/50 rounded-2xl p-6 border border-emerald-200">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Application Submitted Successfully</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for applying to Siddhartha International Group of Schools. Our admissions coordinator will contact you at <span className="font-bold text-slate-900">{formatPhone(mobile)}</span> within 24 business hours to arrange the campus tour and prospectus collection.
        </p>
        <div className="pt-2 text-xs font-semibold text-slate-700">
          Director Helpline: <a href="tel:8368268149" className="text-amber-700 font-bold font-mono">{formatPhone('8368268149')}</a>
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
          <label className="block font-bold text-slate-700 mb-1">Student's Full Name *</label>
          <input
            type="text"
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g. Ananya Verma"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
          <input
            type="text"
            required
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="e.g. Dr. Sunil Verma"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              className="w-full pl-11 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sunil.verma@example.com"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Class Applying For *</label>
          <select
            value={classGrade}
            onChange={(e) => setClassGrade(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="Play School">Play School / Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11 - Science">Class 11 - Science</option>
            <option value="Class 11 - Commerce">Class 11 - Commerce</option>
            <option value="Class 11 - Arts">Class 11 - Arts</option>
            <option value="Class 12 - Science">Class 12 - Science</option>
            <option value="Class 12 - Commerce">Class 12 - Commerce</option>
            <option value="Class 12 - Arts">Class 12 - Arts</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Preferred Gurugram Branch *</label>
          <select
            value={preferredBranchId}
            onChange={(e) => setPreferredBranchId(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none truncate"
          >
            {INITIAL_BRANCHES.map(b => (
              <option key={b.id} value={b.id}>
                {b.sector} Campus ({b.board})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-bold text-slate-700 mb-1">Curriculum Preference</label>
        <div className="grid grid-cols-3 gap-2">
          {(['CBSE', 'HBSE', 'Either'] as const).map(b => (
            <button
              key={b}
              type="button"
              onClick={() => setBoard(b)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                board === b
                  ? 'border-amber-500 bg-amber-50 text-amber-900'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-bold text-slate-700 mb-1">Special Requirements or Inquiries</label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mention bus stop requirement, sibling discounts, or specific subject inquiries..."
          className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{submitting ? 'Submitting Application...' : 'Submit Admission Application'}</span>
      </button>
    </form>
  );
};
