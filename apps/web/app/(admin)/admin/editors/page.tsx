'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { useEditorsStore, EditorProfile } from '@/lib/stores/editors.store';
import { useSubmissionsStore } from '@/lib/stores/submissions.store';
import { 
  UserPlus, Search, GraduationCap, Mail, Shield, 
  FileText, CheckCircle, Plus, X, Layers, Award
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminEditorsPage() {
  const { editors, addEditor } = useEditorsStore();
  const { submissions } = useSubmissionsStore();

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for Onboarding New Editor
  const [form, setForm] = useState({
    name: '',
    role: 'Associate Editor' as EditorProfile['role'],
    institution: '',
    email: '',
    specialization: '',
    bio: '',
  });

  const filteredEditors = editors.filter(ed => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      ed.name.toLowerCase().includes(q) ||
      ed.institution.toLowerCase().includes(q) ||
      ed.email.toLowerCase().includes(q) ||
      ed.specialization.some(s => s.toLowerCase().includes(q))
    );
  });

  const handleCreateEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.institution.trim()) {
      toast.error('Please fill in editor name, email, and institution.');
      return;
    }

    const specs = form.specialization.split(',').map(s => s.trim()).filter(Boolean);

    const created = addEditor({
      name: form.name,
      role: form.role,
      institution: form.institution,
      email: form.email,
      specialization: specs.length > 0 ? specs : ['General Scholarly Review'],
      bio: form.bio || 'Managing Editor for VYOM Academic Press.',
    });

    toast.success(`Editor ${created.name} onboarded! Published to Editorial Board (/about).`);
    setShowAddModal(false);
    setForm({
      name: '',
      role: 'Associate Editor',
      institution: '',
      email: '',
      specialization: '',
      bio: '',
    });
  };

  return (
    <>
      <PageHeader
        title="Editor Roster & Staff Management"
        subtitle="Admin Governance of Editors & Board Appointments"
        role="admin"
      />

      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Header Summary & Onboard Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand/30 pb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-forest-green">Active Editorial Roster</h2>
            <p className="text-xs text-forest-green/50 mt-0.5">Manage managing editors, board appointments, and workload distribution</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm transition-all inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <UserPlus className="h-4 w-4" /> Onboard New Editor
          </button>
        </div>

        {/* Onboard Editor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-xl rounded-3xl border border-sand/40 bg-white p-6 shadow-2xl space-y-5">
              <div className="flex items-start justify-between border-b border-sand/20 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Admin Board Governance</span>
                  <h3 className="font-display text-xl font-bold text-forest-green mt-0.5">
                    Onboard New Managing Editor
                  </h3>
                  <p className="text-xs text-forest-green/60">Newly added editors are published to the Editorial Board and assignment dropdowns.</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-1 text-forest-green/40 hover:text-forest-green">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateEditor} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Full Name *</span>
                    <input
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      placeholder="e.g. Dr. Ananya Sen"
                      className="rounded-xl border border-sand/40 bg-ivory/30 px-3.5 py-2.5 text-forest-green focus:outline-none focus:border-ochre font-medium"
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Board Role *</span>
                    <select
                      value={form.role}
                      onChange={e => setForm(f => ({ ...f, role: e.target.value as any }))}
                      className="rounded-xl border border-sand/40 bg-ivory/30 px-3.5 py-2.5 text-forest-green focus:outline-none focus:border-ochre font-medium"
                    >
                      <option value="Editor-in-Chief">Editor-in-Chief</option>
                      <option value="Associate Editor">Associate Editor</option>
                      <option value="Managing Editor">Managing Editor</option>
                      <option value="Sub-Editor">Sub-Editor</option>
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Official Email *</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                      placeholder="editor@institution.edu"
                      className="rounded-xl border border-sand/40 bg-ivory/30 px-3.5 py-2.5 text-forest-green focus:outline-none focus:border-ochre font-medium"
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Institutional Affiliation *</span>
                    <input
                      value={form.institution}
                      onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                      required
                      placeholder="e.g. IIT Bombay / AIIMS"
                      className="rounded-xl border border-sand/40 bg-ivory/30 px-3.5 py-2.5 text-forest-green focus:outline-none focus:border-ochre font-medium"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1">
                  <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Specialization Domains (comma-separated)</span>
                  <input
                    value={form.specialization}
                    onChange={e => setForm(f => ({ ...f, specialization: e.target.value }))}
                    placeholder="e.g. Artificial Intelligence, Drug Delivery, Biotechnology"
                    className="rounded-xl border border-sand/40 bg-ivory/30 px-3.5 py-2.5 text-forest-green focus:outline-none focus:border-ochre font-medium"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Short Bio / Credentials</span>
                  <textarea
                    value={form.bio}
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                    rows={3}
                    placeholder="Brief background summary for the editorial board page..."
                    className="rounded-xl border border-sand/40 bg-ivory/30 px-3.5 py-2.5 text-forest-green focus:outline-none focus:border-ochre font-medium resize-none"
                  />
                </label>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-sand/20">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-full border border-sand px-5 py-2 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:text-forest-green"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-ochre px-6 py-2 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm"
                  >
                    + Add Editor to System
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/40" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by editor name, institution, email, or domain..."
            className="w-full rounded-2xl border border-sand/40 bg-white pl-11 pr-4 py-3 text-xs text-forest-green focus:outline-none focus:border-ochre shadow-xs font-medium"
          />
        </div>

        {/* Editor Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEditors.map(ed => {
            const edSubmissions = submissions.filter(s => s.assignedEditorName === ed.name);

            return (
              <div
                key={ed.id}
                className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm hover:border-sand hover:shadow-card transition-all flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="rounded-full bg-ochre/10 border border-ochre/20 px-3 py-0.5 text-[9px] font-bold text-ochre uppercase tracking-widest">
                      {ed.role}
                    </span>
                    <span className="text-[10px] text-forest-green/40 font-semibold">Joined {ed.joinedDate}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-forest-green leading-snug">
                    {ed.name}
                  </h3>

                  <p className="text-xs text-forest-green/60 mt-0.5 font-medium flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-ochre shrink-0" /> {ed.institution}
                  </p>

                  <p className="text-xs text-forest-green/45 mt-0.5 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-ochre shrink-0" /> {ed.email}
                  </p>

                  {/* Specialization Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {ed.specialization.map(spec => (
                      <span key={spec} className="rounded-full bg-sand/25 border border-sand/20 px-2.5 py-0.5 text-[9px] font-bold text-forest-green/65 uppercase tracking-wider">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Assigned Manuscripts Workload Summary */}
                <div className="border-t border-sand/20 pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-forest-green/50 uppercase tracking-wider text-[10px]">Assigned Manuscripts Workload</span>
                    <span className="text-ochre">{edSubmissions.length} Papers Active</span>
                  </div>

                  {edSubmissions.length === 0 ? (
                    <p className="text-[11px] text-forest-green/40 italic bg-ivory/40 p-2.5 rounded-xl border border-sand/20">
                      No active manuscripts assigned yet by Admin.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {edSubmissions.map(sub => (
                        <div key={sub.id} className="rounded-xl bg-ivory/50 border border-sand/30 p-2.5 flex items-center justify-between gap-2 text-xs">
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-ochre">{sub.id}</span>
                            <p className="font-bold text-forest-green truncate text-[11px]">{sub.title}</p>
                          </div>
                          <span className="rounded-full bg-sand/30 px-2 py-0.5 text-[8px] font-bold text-forest-green/60 uppercase shrink-0">
                            {sub.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
