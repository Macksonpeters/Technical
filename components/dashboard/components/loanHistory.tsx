"use client";

import CustomDivContainer from "@/components/common/customdiv/customDivContainer";
import { Heading } from "@/components/common/customheadings/headers";
import ErrorContainer from "@/components/common/errors/errorContainer";
import Loading from "@/components/common/loading/loading";
import LoanFormModal from "@/components/modal/loanForm";
import ViewLoanModal from "@/components/modal/viewLoanModal";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TbRadioactiveFilled } from "react-icons/tb";

interface LoanHistoryProps {
  loanHistory: any[];
  pending: boolean;
  error: boolean;
}

export const LoanHistory = ({
  loanHistory,
  pending,
  error,
}: LoanHistoryProps) => {
  const [openLoanForm, setOpenLoanForm] = useState<boolean>(false);
  const [openLoanDetails, setOpenLoanDetails] = useState<boolean>(false);
  const [loanDetails, setLoanDetails] = useState<object>({});

  const handleAccessLoanForm = () => {
    setOpenLoanForm(!openLoanForm);
  };

  const handleAccessLoanDetails = (item: any) => {
    if (item?.transactionType?.includes("female")) {
      setLoanDetails(item);
      setOpenLoanDetails(!openLoanDetails);
    }
  };

  return (
    <div className="flex flex-col gap-2 my-10">
      <div className="flex justify-between items-center">
        <Heading
          text={
            <>
              Loan History{" "}
              <IoIosArrowDown className="inline animate-bounce mt-2" />
            </>
          }
          customStyle="text-[20px] font-[700] text-[#82664e] pb-2"
        />
        <button
          onClick={handleAccessLoanForm}
          className="bg-[#82664e] rounded-lg text-white text-[14px] px-5 py-2"
        >
          New Loan
        </button>
      </div>
      <CustomDivContainer maxContent={false}>
        {pending ? (
          <Loading pending={pending} />
        ) : error ? (
          <ErrorContainer />
        ) : (
          <>
            {" "}
            {loanHistory?.slice(0, 6)?.map((item: any, index: number) => {
              return (
                <div
                  onClick={() => handleAccessLoanDetails(item)}
                  key={item.id}
                  className={`flex gap-3 justify-between items-center py-3 border-b border-[#82664e] ${
                    !item?.transactionType?.includes("female")
                      ? ""
                      : "cursor-pointer"
                  }`}
                >
                  <p className="flex items-center">
                    <TbRadioactiveFilled
                      className={`text-[20px] ${
                        !item?.transactionType?.includes("female")
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    />{" "}
                  </p>
                  <p className="text-[14px] text-center">
                    {item.loanPurpose} Loan{" "}
                  </p>
                  <p
                    className={` text-[17px] font-[600] ${
                      !item?.transactionType?.includes("female")
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {item.loanAmount}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </CustomDivContainer>

      <LoanFormModal
        isOpen={openLoanForm}
        setIsOpen={handleAccessLoanForm}
        loanHistoryCount={loanHistory?.length}
      />
      <ViewLoanModal
        isOpen={openLoanDetails}
        setIsOpen={() => setOpenLoanDetails(!openLoanDetails)}
        item={loanDetails}
      />
    </div>
  );
};
