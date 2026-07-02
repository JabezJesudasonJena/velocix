import SignupForm from "@/src/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">A Hyper-local Ecommerce Application</h2>
            <p className="text-neutral-400">Join our network to experience fast, reliable delivery in your area.</p>
          </div>
          <SignupForm />
        </div>
      </div>
    </main>
  );
}