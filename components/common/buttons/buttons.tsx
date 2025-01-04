import Link from "next/link";
import React from "react";
import Loading from "../loading/loading";

interface Props {
  text?: string;
  pending: boolean;
  width?: string;
  isValid?: boolean;
  href?: string;
}

export const SubmitButton = ({ text, pending, isValid, width }: Props) => {
  return (
    <button
      className={`h-[43px] rounded-[8px] inline-flex gap-2 items-center justify-center ${width} ${
        isValid
          ? pending
            ? "bg-[#003F41]/50 text-white pointer-events-none"
            : "bg-[#003F41] text-white"
          : "bg-gray-300 text-white font-[600] pointer-events-none cursor-not-allowed"
      }`}
    >
      <span>{text}</span>
      <Loading pending={pending} />
    </button>
  );
};

export const LinkButton = ({ text, href, width }: Props) => {
  return (
    <Link
      href={"/"}
      className={`h-[43px] rounded-[8px] inline-flex items-center justify-center ${width} bg-[#003F41] text-white`}
    >
      {text}
    </Link>
  );
};
