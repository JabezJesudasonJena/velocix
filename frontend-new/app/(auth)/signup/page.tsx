import React from 'react';
import SignUpForm from '@/components/Pages/SignUp/SignUpForm';

export default function SignUpPage(){
    return (
        <div className='min-h-screen flex flex-col'>
            <main>
                <SignUpForm />
            </main>
        </div>
    )
}