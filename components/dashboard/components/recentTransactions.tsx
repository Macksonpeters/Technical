import CustomDivContainer from "@/components/common/customdiv/customDivContainer";
import { Heading } from "@/components/common/customheadings/headers";
import ErrorContainer from "@/components/common/errors/errorContainer";
import Loading from "@/components/common/loading/loading";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TbTransferIn } from "react-icons/tb";

interface RecentTransactionProps {
  recentTransactions: [];
  pending: boolean;
  error: boolean;
}

export const RecentTransactions = ({
  recentTransactions,
  pending,
  error,
}: RecentTransactionProps) => {
  return (
    <div className="flex flex-col gap-2 my-10">
      <Heading
        text={
          <>
            Recent Transactions{" "}
            <IoIosArrowDown className="inline animate-bounce mt-2" />
          </>
        }
        customStyle="text-[20px] font-[700] text-[#003F41] pb-2"
      />
      <CustomDivContainer maxContent={false}>
        {pending ? (
          <Loading pending={pending} />
        ) : error ? (
          <ErrorContainer />
        ) : (
          <>
            {recentTransactions
              ?.slice(0, 6)
              ?.map((item: any, index: number) => {
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 justify-between items-center py-3 border-b border-[#E1E4EA]"
                  >
                    <p>
                      <TbTransferIn
                        className={`text-[20px] ${
                          item?.transactionType?.includes("female")
                            ? "text-red-500"
                            : "text-green-600"
                        } `}
                      />
                    </p>
                    <p className="text-[14px]">
                      {" "}
                      {item?.transactionType?.includes("female")
                        ? "Debit"
                        : "Credit"}{" "}
                      from {item?.receiver}
                    </p>
                    <p
                      className={`text-[17px] font-[600] ${
                        item?.transactionType?.includes("female")
                          ? "text-red-500"
                          : "text-green-600"
                      } `}
                    >
                      {item?.amount}
                    </p>
                  </div>
                );
              })}
          </>
        )}
      </CustomDivContainer>
    </div>
  );
};
