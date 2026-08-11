'use client';

// TODO: Replace demo data with GET /api/v1/communications once backend credentials are available.

import { useState } from 'react';
import { 
  MessageSquare, Search, Send, User, 
  Megaphone, CheckCircle, Mail, Clock 
} from 'lucide-react';

const DEMO_MESSAGES = [
  { id: '1', sender: 'Dr. Priya Raghunathan', role: 'Author', manuscript: 'MS-2025-041', subject: 'Revision extension request', time: '10:42 AM', preview: 'Dear Editor, due to unexpected lab equipment recalibration, we kindly request a 5-day extension for submitting revision v2.0.' },
  { id: '2', sender: 'Prof. D. Krishnaswamy', role: 'Reviewer', manuscript: 'MS-2025-041', subject: 'Review report submitted', time: 'Yesterday', preview: 'I have submitted my detailed review report for MS-2025-041. Overall recommendation is Major Revision.' },
  { id: '3', sender: 'Dr. S. Fernandes', role: 'Reviewer', manuscript: 'MS-2025-038', subject: 'Reviewer invitation accepted', time: '3 days ago', preview: 'I accept the invitation to review manuscript MS-2025-038. I will return the completed evaluation report before the deadline.' },
];

export default function EditorCommunicationsPage() {
  const [selectedId, setSelectedId] = useState('1');
  const [replyText, setReplyText] = useState('');
  const [sentMsg, setSentMsg] = useState(false);

  const activeMessage = DEMO_MESSAGES.find(m => m.id === selectedId) ?? DEMO_MESSAGES[0];

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setSentMsg(true);
    setReplyText('');
    setTimeout(() => setSentMsg(false), 3000);
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Editorial Workspace</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Communications & Messaging</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start h-[600px] rounded-3xl border border-sand/40 bg-white overflow-hidden shadow-sm">
        {/* Left Column: Thread list */}
        <div className="border-r border-sand/30 h-full flex flex-col bg-ivory/20">
          <div className="p-4 border-b border-sand/20">
            <h3 className="font-bold text-forest-green text-xs uppercase tracking-wider mb-2">Message Threads</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-forest-green/40" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full rounded-xl border border-sand/40 bg-white pl-9 pr-3 py-2 text-xs text-forest-green focus:outline-none focus:border-ochre"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-sand/20">
            {DEMO_MESSAGES.map(m => {
              const isSelected = m.id === selectedId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`w-full text-left p-4 transition-all flex flex-col gap-1 ${
                    isSelected ? 'bg-white border-l-4 border-ochre shadow-sm' : 'hover:bg-sand/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest-green text-xs">{m.sender}</span>
                    <span className="text-[9px] font-bold text-forest-green/35 uppercase">{m.time}</span>
                  </div>
                  <span className="text-[10px] font-bold text-ochre">{m.manuscript} · {m.role}</span>
                  <p className="text-xs font-semibold text-forest-green/80 truncate mt-0.5">{m.subject}</p>
                  <p className="text-[11px] text-forest-green/50 line-clamp-1">{m.preview}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Message View & Reply */}
        <div className="lg:col-span-2 h-full flex flex-col justify-between p-6">
          <div className="border-b border-sand/20 pb-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-ochre">{activeMessage.manuscript}</span>
                <h2 className="font-display text-lg font-bold text-forest-green mt-1">{activeMessage.subject}</h2>
              </div>
              <span className="text-xs font-semibold text-forest-green/40">{activeMessage.time}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-forest-green/60 mt-2">
              <User className="h-3.5 w-3.5 text-ochre" />
              <span>From: <strong>{activeMessage.sender}</strong> ({activeMessage.role})</span>
            </div>
          </div>

          {/* Message content */}
          <div className="flex-1 bg-ivory/40 rounded-2xl border border-sand/30 p-5 overflow-y-auto mb-4">
            <p className="text-xs text-forest-green/80 leading-relaxed font-medium">
              {activeMessage.preview}
            </p>
          </div>

          {/* Reply Form */}
          <div className="space-y-3">
            {sentMsg && (
              <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle className="h-4 w-4" /> Message dispatched to author (demo)
              </span>
            )}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Type your official editorial reply..."
                className="flex-1 rounded-2xl border border-sand/40 bg-white px-4 py-3 text-xs text-forest-green focus:outline-none focus:border-ochre transition-all font-medium"
              />
              <button
                type="button"
                onClick={handleSendReply}
                className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <Send className="h-3.5 w-3.5" /> Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
