'use client';

import { Check } from 'lucide-react';

interface EditorialPipelineProps {
  status: string;
}

const STAGES = [
  { id: 'new',        label: 'New Submission' },
  { id: 'screening',  label: 'Screening' },
  { id: 'assignment', label: 'Assign Reviewer' },
  { id: 'review',      label: 'Peer Review' },
  { id: 'decision',   label: 'Decision' },
  { id: 'accepted',   label: 'Accepted' },
  { id: 'scheduled',  label: 'Scheduled' },
  { id: 'published',  label: 'Published' },
];

export function EditorialPipeline({ status }: EditorialPipelineProps) {
  let activeIndex = 0;
  const normStatus = status.toUpperCase();

  if (normStatus === 'PUBLISHED') {
    activeIndex = 7;
  } else if (normStatus === 'SCHEDULED') {
    activeIndex = 6;
  } else if (normStatus === 'ACCEPTED') {
    activeIndex = 5;
  } else if (normStatus === 'DECISION RECORDED' || normStatus === 'REVISION') {
    activeIndex = 4;
  } else if (normStatus === 'UNDER REVIEW' || normStatus === 'IN PROGRESS') {
    activeIndex = 3;
  } else if (normStatus === 'ASSIGNMENT PENDING') {
    activeIndex = 2;
  } else if (normStatus === 'SCREENING') {
    activeIndex = 1;
  } else {
    activeIndex = 0; // NEW
  }

  return (
    <div className="w-full py-4 overflow-x-auto select-none scrollbar-none">
      <div className="min-w-[760px] flex items-center justify-between relative px-2">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sand/30 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-ochre -translate-y-1/2 z-0 transition-all duration-500" 
          style={{ width: `${(activeIndex / (STAGES.length - 1)) * 100}%` }}
        />

        {/* Stage Nodes */}
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < activeIndex;
          const isActive = idx === activeIndex;
          
          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center flex-1">
              <div 
                className={`h-7 w-7 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-ochre border-ochre text-white shadow-sm' 
                    : isActive 
                      ? 'bg-white border-forest-green text-forest-green shadow-[0_0_0_4px_rgba(20,53,43,0.1)] scale-110' 
                      : 'bg-white border-sand text-forest-green/35'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-3.5 w-3.5 stroke-[3px]" />
                ) : (
                  idx + 1
                )}
              </div>
              <span 
                className={`text-[9px] font-bold mt-2 uppercase tracking-wider text-center ${
                  isActive 
                    ? 'text-forest-green font-extrabold' 
                    : isCompleted 
                      ? 'text-ochre' 
                      : 'text-forest-green/30'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
