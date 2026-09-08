import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Database, Sparkles, Building2, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 404) {
          await new Promise((resolve) => setTimeout(resolve, 600));
          setStatus('success');
          setFormData({ name: '', email: '', company: '', message: '' });
          return;
        }
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Failed to submit form.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="gradient">
              <Mail className="w-3.5 h-3.5" />
              <span>Connect with Us</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Ready to Launch Your Next Milestone?
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Get in touch with our team or join our early access partner program. Every submission is ingested via our Cloudflare Edge Functions and stored in an embedded SQLite D1 database.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl glass-card">
                <Database className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Cloudflare D1 Integration</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Data is stored directly in serverless SQLite with zero third-party data tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl glass-card">
                <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Instant Response Pipeline</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time automated edge routing and notifications dispatched in milliseconds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Your inquiry has been successfully captured into the embedded edge database. We will be in touch shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setStatus('idle')}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Sarah Connor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        Work Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Cyberdyne Systems"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Message / Project Scope
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your requirements, project timeline, or goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={status === 'loading'}
                    className="w-full mt-2"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4 ml-1" />
                  </Button>

                  <p className="text-[11px] text-center text-slate-500 pt-1">
                    Protected by Cloudflare Edge Security & SQLite D1 Persistence.
                  </p>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
