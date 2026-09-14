import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { useSite } from '../../contexts/SiteContext';
import { updateDocumentSeo } from '../../lib/seo';
import { formatPhone } from '../../lib/utils';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { branches, submitEnquiry } = useSite();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [branchId, setBranchId] = useState(branches[0]?.id || '');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    updateDocumentSeo({
      title: 'Contact Us | Siddhartha International Group of Schools Gurugram',
      description: 'Contact Siddhartha International Group of Schools Gurugram. Director Sandeep Kumar (8368268149), Manager Kalpna Kumari (9355135904). 12 Gurugram branches directory.',
      canonicalUrl: `${window.location.origin}/contact`,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) return;

    try {
      setSubmitting(true);
      const selBranch = branches.find(b => b.id === branchId);
      await submitEnquiry({
        studentName: name.trim(),
        parentName: name.trim(),
        mobile: mobile.replace(/\D/g, ''),
        email: email.trim(),
        classGrade: 'General Inquiry',
        preferredBranchId: branchId || (branches[0]?.id || ''),
        preferredBranchName: selBranch ? selBranch.name : 'Central Campus',
        board: 'CBSE & HBSE',
        message: message.trim(),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <PageHeader
        title="Contact Our Gurugram Offices"
        subtitle="Connect with our central administration, schedule a campus visit, or speak directly with our Director and Manager."
        badge="Direct Assistance"
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Leadership Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Director's Office</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Direct line to Director Sandeep Kumar for administrative guidance and admissions.
            </p>
            <div className="pt-2">
              <a
                href="tel:8368268149"
                className="text-base font-bold text-amber-700 hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>{formatPhone('8368268149')}</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Manager's Office</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Direct line to Manager Kalpna Kumari for campus logistics, transport, and staff operations.
            </p>
            <div className="pt-2">
              <a
                href="tel:9355135904"
                className="text-base font-bold text-sky-700 hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>{formatPhone('9355135904')}</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Head Office</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Central Campus, Sector 14, Gurugram, Haryana, India. Coordinating 12 branches.
            </p>
            <div className="pt-2 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Mon – Sat: 8:00 AM – 4:00 PM</span>
            </div>
          </div>
        </div>

        {/* Message Form & 12 Branches Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Message Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Message Delivered</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Send Us a Direct Message</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@domain.com"
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Campus</label>
                  <select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.sector})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* All 12 Gurugram Branches Addresses List */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">All 12 Gurugram Campuses</h3>
              <span className="text-xs font-bold text-amber-700">{branches.length} Locations</span>
            </div>

            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2">
              {branches.map((b) => (
                <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{b.name}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                      {b.sector}
                    </span>
                  </div>
                  <p className="text-slate-600">{b.address}</p>
                  <div className="flex items-center gap-3 pt-1 text-[11px]">
                    <a href={`tel:${b.phone}`} className="text-amber-700 font-bold hover:underline">
                      Call: {formatPhone(b.phone)}
                    </a>
                    <span>•</span>
                    <span className="text-slate-400">{b.board}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
