import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-14">
      <SEOHead 
        title="Contact PhotoKB Support - USA & Global Help" 
        description="Get in touch with the PhotoKB support team. Suggest a new tool, report an issue, or ask questions." 
        canonical="/contact-us" 
      />

      <div className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Contact PhotoKB
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            Have a question, feedback, or tool suggestion? Our USA support team is here to help you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
          
          {/* Info Card */}
          <div className="lg:col-span-5 bg-[#0b132b] text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-6 shadow-md">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Get In Touch</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                We'd love to hear from you. Send us an email or fill out the form and we'll reply within 24 hours.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase">Email Us</span>
                  <div className="font-bold text-white mt-0.5">support@photokb.com</div>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-600/30 text-rose-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase">Headquarters</span>
                  <div className="font-bold text-white mt-0.5">New York, NY, United States</div>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase">Working Hours</span>
                  <div className="font-bold text-white mt-0.5">Mon - Fri: 9:00 AM - 6:00 PM (EST)</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl sm:rounded-2xl border border-slate-700/60 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              🗽 Proudly serving millions of users across the United States and worldwide.
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md">
            {submitted ? (
              <div className="py-10 sm:py-14 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-500 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Message Received!</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
                  Thank you for contacting us. A member of our support team will review your message and reply to <span className="font-bold text-slate-800">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Send us a Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Tool suggestion or question..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your thoughts..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm shadow-blue-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
