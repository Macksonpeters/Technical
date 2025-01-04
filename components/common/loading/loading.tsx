import React from "react";
import { ImSpinner8 } from "react-icons/im";

interface LoadingProps {
  pending: boolean;
}

const Loading = ({ pending }: LoadingProps) => {
  return (
    <>
      {pending && (
        <span>
          <ImSpinner8 className="animate-spin text-[14px] text-[#003F41]inline " />
        </span>
      )}
    </>
  );
};

export default Loading;
