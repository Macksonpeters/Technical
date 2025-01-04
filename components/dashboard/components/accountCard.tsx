"use client";
import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface Props {
  accountBalance?: number;
  accountName?: any;
}

const AccountCard = ({ accountBalance, accountName }: Props) => {
  const [hideBalance, setHideBalance] = useState(true);

  const handleToggleBalanceVisibility = () => {
    setHideBalance(!hideBalance);
  };

  return (
    <div
      className={`w-[73vw] cardDesign h-[170px] sm:w-[320px] rounded-[25px] bg-[#003F41] `}
    >
      <div className="absolute h-[inherit]"></div>
      <div className="relative px-[10px] py-[10px] text-white">
        <div className="w-full flex justify-end mt-[6px]">
          <span
            className={`text-[13px] font-[700] px-[10px] py-[5px] rounded-[20px]`}
          >
            NGN
          </span>
        </div>
        <div className="mx-3 mt-[-15px]">
          <p className="text-[14px]">Current Balance</p>

          <p className="font-[800] text-[18px] tracking-wide">
            {!hideBalance ? (
              <span>₦********</span>
            ) : (
              <span>
                ₦{accountBalance && Number(accountBalance)?.toLocaleString()}
              </span>
            )}
          </p>
        </div>
        <div className="mx-3 mt-[20px]">
          <p className="text-[14px] capitalize">Savings Account</p>
          <p className="font-[600] text-[15px]">{accountName}</p>
        </div>
        <div className="w-full flex flex-col items-end mt-[-40px] cursor-pointer">
          <div onClick={handleToggleBalanceVisibility}>
            {hideBalance ? (
              <div className="flex flex-col items-center">
                <BsEyeSlash className="text-[19px]" />
                <span className="text-[13px] ">Hide Balance</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <BsEye className="text-[19px]" />

                <span className="text-[13px] ">View Balance</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
