"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const LogInOut = () => {
  return (
    <>
      <SignedIn>
        <div className="flex items-center gap-8">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
          <div className="block w-full sm:hidden">
            <SignOutButton>
              <button className="w-full bg-neutral-300 px-3 py-1 font-chakra">
                Log Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className="bg-neutral-300 px-3 py-1 font-chakra">
            Log In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-black px-3 py-1 font-chakra font-medium text-white">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
    </>
  );
};

export default LogInOut;
