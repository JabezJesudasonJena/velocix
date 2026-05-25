import React from 'react';
import CreateStoreForm from '@/components/store/CreateStoreForm';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f6] flex flex-col items-center justify-center font-['Inter']">
      {/* Required for the Google Icons/Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
        }
      `}</style>
      
      <CreateStoreForm />
    </div>
  );
}