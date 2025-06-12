"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-black text-white px-6 py-3 rounded-lg"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}
