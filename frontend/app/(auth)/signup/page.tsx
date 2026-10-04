import SignupForm from "@/src/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="page-shell flex flex-col">
      <div className="page-wrap flex flex-1 items-center justify-center">
        <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">Create Account</p>
            <h2 className="text-4xl font-extrabold leading-tight">Join Velocix and start ordering smarter</h2>
            <p className="max-w-md text-neutral-400">Create your profile to access nearby stores, faster checkout, and order updates.</p>
          </div>
          <SignupForm />
        </div>
      </div>
    </main>
  );
}