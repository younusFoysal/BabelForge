import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In | BabelForge",
  description: "Sign in to your account.",
}

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <SignIn afterSignOutUrl="/" />
    </div>
  );
}
