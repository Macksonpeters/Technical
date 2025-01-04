import React from "react";

interface Props {
  maxContent: boolean;
  children?: any;
  height?: string;
}

const CustomDivContainer = ({ maxContent, children, height }: Props) => {
  return (
    <div
      className={`bg-white p-6 rounded-[12px] border-2 border-[#eaecf0] items-center w-full  ${
        height ? height : "h-[auto]"
      }`}
    >
      {children}
    </div>
  );
};

export default CustomDivContainer;
