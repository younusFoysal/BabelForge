import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up | BabelForge",
  description: "Sign up for an account.",
}

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-full py-10">
      <SignUp afterSignOutUrl="/" />
    </div>
  );
}
