import React from 'react';
import AuthIllustration from '@/components/auth/AuthIllustration';
import SignInForm from '@/components/auth/SingIn/SignInForm';

export default function LoginPage() {
  return (
    <div className="h-screen w-full antialiased font-['Inter'] flex flex-col overflow-hidden">
      {/* Required for the Google Icons/Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
        }
      `}</style>

      {/* The Split Layout */}
      <div className="flex h-full w-full">
        {/* We reuse the illustration component here! */}
        <AuthIllustration /> 
        
        {/* We render the Login Form here */}
        <SignInForm />
      </div>
    </div>
  );
}