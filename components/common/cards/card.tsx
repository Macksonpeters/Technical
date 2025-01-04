import React from "react";
import { Heading, SubHeading } from "../customheadings/headers";
import Loading from "../loading/loading";
import { BsDashLg } from "react-icons/bs";

interface CardProps {
  backgroundColor: string;
  text: string;
  value: number | string;
  position?: string;
  pending: boolean;
  error: boolean;
}

const Card = ({
  backgroundColor,
  text,
  value,
  position,
  pending,
  error,
}: CardProps) => {
  return (
    <div
      className={`h-[100px] w-[100%] p-[15px] sm:h-[115px] sm:w-[200px] sm:p-[20px] flex flex-col rounded-lg border-2 border-[#d0f5f5] ${
        backgroundColor ? backgroundColor : "bg-white"
      } ${position ? position : ""}`}
      data-testid="card"
    >
      <SubHeading text={text} customStyle="text-[#667185] font-[500]" />

      {pending ? (
        <Loading pending={pending} />
      ) : error ? (
        <BsDashLg className="text-[15px] text-[#003F41] font-[700] sm:mt-4" />
      ) : (
        <Heading
          text={value?.toString()}
          customStyle="text-[25px] font-[700] sm:mt-4"
        />
      )}
    </div>
  );
};

export default Card;
