'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { CheckCircle2, Settings, Shield, Sliders } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platformName: 'VYOM Publication',
    supportEmail: 'support@vyompublication.com',
    apcAmount: '8500',
    submissionOpen: true,
    emailNotifications: true,
    maintenanceMode: false,
    maxFileSize: '20',
    allowedFormats: 'PDF, DOCX',
    reviewDeadlineDays: '21',
    abstractWordLimit: '1000',
  });

  const set = (k: string, v: string | boolean) => setSettings(s => ({ ...s, [k]: v }));

  const handleSave = () => {
    toast.success('Platform configuration settings updated successfully!');
  };

  return (
    <>
      <PageHeader title="Platform Configuration & Settings" subtitle="Global Governance & Manuscript Policy Controls" role="admin" />

      <main className="flex-1 px-8 py-6 max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* General */}
        <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-sand/20 pb-3">
            <h2 className="font-display text-lg font-bold text-forest-green">General Identity & Support</h2>
            <p className="text-xs text-forest-green/50 mt-0.5">Platform name and contact information</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <label className="flex flex-col gap-1.5">
              <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Platform Name</span>
              <input 
                value={settings.platformName}
                onChange={e => set('platformName', e.target.value)}
                className="rounded-xl border border-sand/40 bg-ivory/30 px-4 py-3 text-forest-green focus:outline-none focus:border-ochre font-medium" 
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Support Email</span>
              <input 
                value={settings.supportEmail}
                onChange={e => set('supportEmail', e.target.value)}
                className="rounded-xl border border-sand/40 bg-ivory/30 px-4 py-3 text-forest-green focus:outline-none focus:border-ochre font-medium" 
              />
            </label>
          </div>
        </div>

        {/* Submission Rules */}
        <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-sand/20 pb-3">
            <h2 className="font-display text-lg font-bold text-forest-green">Submission & APC Policies</h2>
            <p className="text-xs text-forest-green/50 mt-0.5">Author limits, APC fees, and review deadlines</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <label className="flex flex-col gap-1.5">
              <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Article Processing Charge (APC in INR)</span>
              <input 
                value={settings.apcAmount}
                onChange={e => set('apcAmount', e.target.value)}
                className="rounded-xl border border-sand/40 bg-ivory/30 px-4 py-3 text-forest-green focus:outline-none focus:border-ochre font-medium" 
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Max File Upload Size (MB)</span>
              <input 
                value={settings.maxFileSize}
                onChange={e => set('maxFileSize', e.target.value)}
                className="rounded-xl border border-sand/40 bg-ivory/30 px-4 py-3 text-forest-green focus:outline-none focus:border-ochre font-medium" 
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Allowed Manuscript File Formats</span>
              <input 
                value={settings.allowedFormats}
                onChange={e => set('allowedFormats', e.target.value)}
                className="rounded-xl border border-sand/40 bg-ivory/30 px-4 py-3 text-forest-green focus:outline-none focus:border-ochre font-medium" 
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Default Review Deadline (days)</span>
              <input 
                value={settings.reviewDeadlineDays}
                onChange={e => set('reviewDeadlineDays', e.target.value)}
                className="rounded-xl border border-sand/40 bg-ivory/30 px-4 py-3 text-forest-green focus:outline-none focus:border-ochre font-medium" 
              />
            </label>
          </div>
        </div>

        {/* Toggles */}
        <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-sand/20 pb-3">
            <h2 className="font-display text-lg font-bold text-forest-green">Platform Controls</h2>
            <p className="text-xs text-forest-green/50 mt-0.5">Toggle submission windows and email alerts</p>
          </div>

          <div className="space-y-4">
            {[
              { key: 'submissionOpen', label: 'Submissions Window Open', desc: 'Allow authors to submit new abstracts and manuscripts' },
              { key: 'emailNotifications', label: 'Automated Email Dispatch', desc: 'Dispatch workflow emails for assignments and decisions' },
              { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Display maintenance banner to non-admin visitors' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-3 rounded-2xl border border-sand/20 bg-ivory/20">
                <div>
                  <p className="text-xs font-bold text-forest-green">{label}</p>
                  <p className="text-[11px] text-forest-green/50 mt-0.5">{desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => set(key, !(settings[key as keyof typeof settings] as boolean))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${settings[key as keyof typeof settings] ? 'bg-ochre' : 'bg-sand/60'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings[key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="rounded-full bg-ochre px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm transition-all inline-flex items-center gap-2"
          >
            <Settings className="h-4 w-4" /> Save Configuration
          </button>
        </div>
      </main>
    </>
  );
}
