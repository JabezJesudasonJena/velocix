import LoginForm from "@/src/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Sign in with your existing account</h2>
            <p className="text-neutral-400">Welcome back! Please enter your credentials to access your dashboard.</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}  