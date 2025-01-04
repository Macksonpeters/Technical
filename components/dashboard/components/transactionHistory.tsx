import CustomDivContainer from "@/components/common/customdiv/customDivContainer";
import { Heading } from "@/components/common/customheadings/headers";
import ErrorContainer from "@/components/common/errors/errorContainer";
import Loading from "@/components/common/loading/loading";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import TransactionTable from "./transactionTable";

interface TransactionHistoryProps {
  transactions: [];
  pending: boolean;
  error: boolean;
}

const TransactionHistory = ({
  transactions,
  pending,
  error,
}: TransactionHistoryProps) => {
  return (
    <div className="flex flex-col gap-2 my-10">
      <Heading
        text={
          <>
            Transaction History{" "}
            <IoIosArrowDown className="inline animate-bounce mt-2" />
          </>
        }
        customStyle="text-[20px] text-center font-[700] text-[#003F41] pb-2"
      />
      <CustomDivContainer maxContent={false}>
        {pending ? (
          <div className="flex justify-center items-center">
            <Loading pending={pending} />
          </div>
        ) : error ? (
          <div className="text-center">
            <ErrorContainer />
          </div>
        ) : (
          <>
            <TransactionTable transactions={transactions} />
          </>
        )}
      </CustomDivContainer>
    </div>
  );
};

export default TransactionHistory;
