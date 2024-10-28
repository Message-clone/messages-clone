"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWith?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  type,
  fullWith,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex
        justify-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
            `,
        disabled && "opacity-50 cursor-default",
        fullWith && "w-full",
        secondary ? " text-gray-900" : "text-white",
        danger && "bg-rose-500 hover:bg-rose-600 focus-within:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-sky-500 hover:border-s-sky-600 focus-visible:outline-sky-600"
      )}
    >
      {children}
    </button>
  );
};
export default Button;
