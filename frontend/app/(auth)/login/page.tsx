import LoginForm from "@/src/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="page-shell flex flex-col">
      <div className="page-wrap flex flex-1 items-center justify-center">
        <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">Welcome Back</p>
            <h2 className="text-4xl font-extrabold leading-tight">Sign in to continue shopping locally</h2>
            <p className="max-w-md text-neutral-400">Access your account, track orders, and manage your cart across devices.</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}  