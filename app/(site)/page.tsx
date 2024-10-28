import React from "react";
import Image from "next/image";
import AuthForm from "@/app/(site)/components/AuthForm";

export default function Home() {
  return (
    <div
      className="
    flex
    min-h-full
    flex-col
    justify-center
    sm:px-6
    lg:px-8
    bg-gray-100
    py-12"
    >
      <div className="sm:mx-auto  sm:w-full sm:max-w-md">
        <Image
          src="/image/logo.png"
          alt="Logo"
          width="68"
          height="68"
          className="mx-auto w-auto"
        />
        <h2
          className="
        mt-6
        text-center
        text-3xl
        font-bold
        tracking-tight
        text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>
      {/* {AuthForm} */}
      <AuthForm />
    </div>
  );
}
