"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { buttonVariants } from "../ui/button";

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
              <button className={buttonVariants({ variant: "secondary" })}>
                Log Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <div className={buttonVariants({ variant: "secondary" })}>Log In</div>
        </SignInButton>
        <SignUpButton>
          <div className={buttonVariants({ variant: "default" })}>Sign Up</div>
        </SignUpButton>
      </SignedOut>
    </>
  );
};

export default LogInOut;
