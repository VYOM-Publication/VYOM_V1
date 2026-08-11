'use client';

// TODO: Replace demo data with GET /api/v1/admin/settings and PATCH /api/v1/admin/settings once backend credentials are available.

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { CheckCircle, Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
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
    abstractWordLimit: '300',
  });

  const set = (k: string, v: string | boolean) => setSettings(s => ({ ...s, [k]: v }));

  return (
    <>
      <PageHeader title="Settings" subtitle="Platform Configuration" role="admin" />

      <main className="flex-1 px-8 py-6 max-w-2xl mx-auto w-full flex flex-col gap-6">
        {/* General */}
        <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-forest-green">General</h2>
          {[
            { key: 'platformName', label: 'Platform Name' },
            { key: 'supportEmail', label: 'Support Email' },
          ].map(({ key, label }) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">{label}</span>
              <input value={settings[key as keyof typeof settings] as string}
                onChange={e => set(key, e.target.value)}
                className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
            </label>
          ))}
        </div>

        {/* Submission settings */}
        <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-forest-green">Submission Settings</h2>
          {[
            { key: 'apcAmount', label: 'APC Amount (INR)' },
            { key: 'maxFileSize', label: 'Max File Size (MB)' },
            { key: 'allowedFormats', label: 'Allowed File Formats' },
            { key: 'reviewDeadlineDays', label: 'Default Review Deadline (days)' },
            { key: 'abstractWordLimit', label: 'Abstract Word Limit' },
          ].map(({ key, label }) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">{label}</span>
              <input value={settings[key as keyof typeof settings] as string}
                onChange={e => set(key, e.target.value)}
                className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
            </label>
          ))}
        </div>

        {/* Toggles */}
        <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-forest-green">Platform Controls</h2>
          {[
            { key: 'submissionOpen', label: 'Submissions Open', desc: 'Allow new manuscript submissions' },
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send automated emails for workflow events' },
            { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Show maintenance page to all visitors' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-forest-green">{label}</p>
                <p className="text-xs text-forest-green/40 mt-0.5">{desc}</p>
              </div>
              <button onClick={() => set(key, !(settings[key as keyof typeof settings] as boolean))}
                className={`relative w-12 h-6 rounded-full transition-colors ${settings[key as keyof typeof settings] ? 'bg-ochre' : 'bg-sand/50'}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings[key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {saved && (
            <span className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" /> Settings saved (demo only)
            </span>
          )}
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
            className="ml-auto flex items-center gap-2 rounded-full bg-ochre px-7 py-3 text-sm font-bold text-ivory hover:bg-ochre/90">
            <Settings className="h-4 w-4" /> Save Settings
          </button>
        </div>
      </main>
    </>
  );
}
